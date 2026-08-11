<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { EditorView, basicSetup } from "codemirror";
  import { EditorState, type Extension, Compartment } from "@codemirror/state";
  import { keymap } from "@codemirror/view";
  import { indentWithTab } from "@codemirror/commands";
  import { indentUnit } from "@codemirror/language";
  import { LanguageDescription } from "@codemirror/language";
  import { languages } from "@codemirror/language-data";

  // 1. Import autocompletion tools
  import { autocompletion, completeAnyWord } from "@codemirror/autocomplete";

  import { lightThemes, darkThemes, Update } from "$lib/utils.svelte";

  import {
    githubDark,
    githubLight,
    vscodeDark,
    vscodeLight,
    atomone,
    dracula,
    gruvboxDark,
    tokyoNight,
    tokyoNightStorm,
    tokyoNightDay,
    nord,
    monokai,
    monokaiDimmed,
    sublime,
    xcodeDark,
    xcodeLight,
    solarizedDark,
    solarizedLight,
    androidstudio,
    darcula,
    duotoneDark,
    duotoneLight,
    aura,
    copilot,
    quietlight,
    bbedit,
    eclipse,
    noctisLilac,
    basicDark,
    basicLight,
    whiteDark,
    whiteLight,
    abcdef,
    abyss,
    andromeda,
    bespin,
    consoleDark,
    consoleLight,
    kimbie,
    red,
  } from "@uiw/codemirror-themes-all";

  import { editorTheme, editorViewStyle } from "$lib/utils.svelte";

  import { javascript } from "@codemirror/lang-javascript";
  import { python } from "@codemirror/lang-python";
  import { rust } from "@codemirror/lang-rust";
  import { cpp } from "@codemirror/lang-cpp";
  import { java } from "@codemirror/lang-java";
  import { php } from "@codemirror/lang-php";
  import { html } from "@codemirror/lang-html";
  import { csharp } from "@replit/codemirror-lang-csharp";

  const themes = {
    light: {
      vscodeLight: vscodeLight,
      githubLight: githubLight,
      tokyoNightDayLight: tokyoNightDay,
      xcodeLight: xcodeLight,
      solarizedLight: solarizedLight,
      duotoneLight: duotoneLight,
      quietlightLight: quietlight,
      bbeditLight: bbedit,
      eclipseLight: eclipse,
      noctisLilacLight: noctisLilac,
      basicLight: basicLight,
      whiteLight: whiteLight,
      consoleLight: consoleLight,
    },
    dark: {
      vscodeDark: vscodeDark,
      gruvboxDark: gruvboxDark,
      atomoneDark: atomone,
      draculaDark: dracula,
      githubDark: githubDark,
      tokyoNightDark: tokyoNight,
      tokyoNightStormDark: tokyoNightStorm,
      nordDark: nord,
      monokaiDark: monokai,
      monokaiDimmedDark: monokaiDimmed,
      sublimeDark: sublime,
      xcodeDark: xcodeDark,
      solarizedDark: solarizedDark,
      androidstudioDark: androidstudio,
      darculaDark: darcula,
      duotoneDark: duotoneDark,
      auraDark: aura,
      copilotDark: copilot,
      basicDark: basicDark,
      whiteDark: whiteDark,
      abcdefDark: abcdef,
      abyssDark: abyss,
      andromedaDark: andromeda,
      bespinDark: bespin,
      consoleDark: consoleDark,
      kimbieDark: kimbie,
      redDark: red,
    },
  };

  interface Props {
    filename?: string;
    content?: string;
    isActive?: boolean;
    themeName?: string;
    onChange?: (value: string) => void;
    onFocus?: () => void;
  }

  let {
    filename = "",
    content = "",
    isActive = false,
    themeName = "vscodeDark",
    onChange,
    onFocus,
  }: Props = $props();

  let container: HTMLDivElement;
  let view: EditorView | undefined;

  const themeCompartment = new Compartment();
  const languageCompartment = new Compartment();

  const baseTheme = EditorView.theme({
    "&": {
      fontFamily: editorViewStyle.fontFamily + ", monospace !important",
      fontSize: editorViewStyle.fontSize,
    },
    "&.cm-focused": {
      outline: "none !important",
    },
    ".cm-scroller": {
      // fontFamily: "JetBrainsMono Nerd Font Mono, Consolas, monospace !important",
      fontFamily: editorViewStyle.fontFamily + ", monospace !important",
    },
  });

  Update();

  function getThemeExtension(name: string): Extension {
    let theme = Object.entries(
      lightThemes.includes(name) ? themes.light : themes.dark,
    ).find((t) => t[0] == themeName);

    if (theme?.[1]) return theme?.[1];
    throw new Error("ThemeError : Could not find theme.");
  }

  // ... in your getLanguageSupport function
  const langMap: Record<string, () => any> = {
    js: javascript,
    ts: javascript,
    py: python,
    rs: rust,
    cpp: cpp,
    c: cpp,
    h: cpp,
    cs: csharp,
    java: java,
    php: html,
    svelte: html,
  };

  async function getLanguageSupport(fileName: string) {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";

    // 1. Check your manual map first (for speed/specific versions)
    if (langMap[ext]) {
      return langMap[ext]();
    }

    // 2. Fallback: Search the massive 'languages' database
    // This supports Go, Swift, Ruby, Kotlin, Scala, and 100+ others!
    const langDesc = LanguageDescription.matchFilename(languages, fileName);
    if (langDesc) {
      return await langDesc.load(); // This dynamically loads the code only when needed
    }

    return []; // Plain text fallback
  }

  function GetKeywords() {
    return {
      js: "async await break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield let static set get constructor prototype console log warn error info table group JSON parse stringify Promise resolve reject all race then catch finally map filter reduce includes find findIndex slice splice push pop shift unshift join reverse sort Object keys values entries assign create Math floor ceil round abs max min random document window window.location fetch setTimeout setInterval addEventListener removeEventListener querySelector getElementById dispatchEvent Array from isArray Number parseInt parseFloat String".split(
        " ",
      ),

      ts: "abstract any as boolean break case catch class const constructor continue debugger declare default delete do enum export extends false finally for function if implements import in instanceof interface int is keyof let module namespace never new null number object private protected public readonly return set string super switch this throw true try type typeof undefined unique var void while with yield Record Partial Required Readonly Pick Omit Exclude Extract NonNullable ReturnType InstanceType Parameters ConstructorParameters".split(
        " ",
      ),

      rs: "as async await break const continue crate dyn else enum extern false fn for if impl in let loop match mod move mut pub ref return self Self static struct super trait true type unsafe use where while i8 i16 i32 i64 i128 u8 u16 u32 u64 u128 f32 f64 isize usize str String Vec Option Result Some None Ok Err Box Rc Arc Mutex RefCell Cell println! print! panic! format! vec! assert! assert_eq! assert_ne! todo! unreachable! write! writeln! env! cfg! matches! dbg! macros! standard collections hash_map iter next collect map unwrap expect as_ref clone copy default".split(
        " ",
      ),

      java: "abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while String System out println print err scanner ArrayList HashMap HashSet LinkedList List Map Set Integer Double Float Boolean Character Long Short Byte Collections Arrays StringBuilder StringBuffer Exception RuntimeException NullPointerException Thread Runnable Stream collectors stream forEach filter map collect".split(
        " ",
      ),

      cpp: "alignas alignof and and_eq asm auto bitand bitor bool break case catch char char16_t char32_t class compl concept const constexpr const_cast continue decltype default delete do double dynamic_cast else enum explicit export extern false float for friend goto if inline int long mutable namespace new noexcept not not_eq nullptr operator or or_eq private protected public register reinterpret_cast return short signed sizeof static static_assert static_cast struct switch template this thread_local throw true try typedef typeid typename union unsigned using virtual void volatile wchar_t while xor xor_eq std string vector map set list unordered_map unordered_set pair make_pair tuple cout cin endl cerr push_back emplace_back size length begin end find sort unique_ptr shared_ptr make_unique make_shared algorithm numeric iterator".split(
        " ",
      ),

      c: "auto break case char const continue default do double else enum extern float for goto if int long register return short signed sizeof static struct switch typedef union unsigned void volatile while printf scanf puts gets fgets fopen fclose fprintf fscanf size_t NULL true false bool main include define ifndef endif error pragma malloc free calloc realloc memcpy memset strlen strcmp strcpy strncpy strcat strchr strstr".split(
        " ",
      ),

      cs: "abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long namespace new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual void volatile while Console WriteLine ReadLine List Task var async await Task.Run IEnumerable ICollection IList Dictionary Guid DateTime TimeSpan StringBuilder Exception ArgumentException Threading Interop Linq Select Where OrderBy ToList FirstOrDefault Any Count".split(
        " ",
      ),

      php: "abstract and array as break case catch class clone const continue declare default die do echo else elseif empty enddeclare endfor endforeach endif endswitch endwhile eval exit extends final finally for foreach function global goto if implements include include_once instanceof insteadof interface isset list namespace new or print private protected public require require_once return static switch throw trait try unset use var while xor yield __LINE__ __FILE__ __DIR__ __FUNCTION__ __CLASS__ __METHOD__ __NAMESPACE__ $_GET $_POST $_SESSION $_COOKIE $_SERVER $_FILES $_REQUEST empty isset count header array_merge explode implode strlen strpos substr str_replace date time".split(
        " ",
      ),

      css: "margin padding display position color background font-size font-family font-weight width height border flex grid block inline relative absolute fixed sticky top right bottom left justify-content align-items align-self flex-direction flex-wrap overflow z-index opacity transition animation cursor pointer none !important calc var rgba rgb hsl box-sizing border-radius box-shadow text-align text-decoration transform rotate scale translate filter line-height visibility white-space media screen hover active focus after before first-child last-child nth-child root".split(
        " ",
      ),

      sql: "SELECT FROM WHERE INSERT UPDATE DELETE CREATE DROP ALTER TABLE INTO VALUES SET JOIN LEFT RIGHT INNER OUTER ON GROUP BY ORDER HAVING LIMIT OFFSET NULL NOT AND OR IN EXISTS LIKE AS DISTINCT COUNT SUM AVG MIN MAX PRIMARY KEY FOREIGN INDEX DESC ASC TABLE DATABASE VIEW PROCEDURE TRIGGER FUNCTION BETWEEN UNION ALL CASE WHEN THEN ELSE END IN IS ANY SOME".split(
        " ",
      ),

      go: "package import func var const type struct interface map chan if else switch case default for range break continue return go select defer fallthrough goto true false nil iota int int8 int16 int32 int64 uint uint8 uint16 uint32 uint64 float32 float64 complex64 complex128 string bool byte rune uintptr make new append copy len cap panic recover print println fmt Println Sprintf Errorf context Background Context sync Mutex WaitGroup net http Get Post".split(
        " ",
      ),
    };
  }

  onMount(() => {
    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged && onChange) {
        onChange(update.state.doc.toString());
      }
      if (update.focusChanged && update.view.hasFocus && onFocus) {
        onFocus();
      }
    });

    // 1. MASSIVE KEYWORD DATABASE
    const K: Record<string, string[]> = GetKeywords();

    K.ts = [...new Set([...(K.js || []), ...(K.ts || [])])]; // Merge JS into TS and remove duplicates
    K.h = K.c; // Map C headers to C keywords
    K.hpp = K.cpp; // Map C++ headers to C++ keywords

    const state = EditorState.create({
      doc: content,
      extensions: [
        basicSetup,
        baseTheme,
        EditorView.lineWrapping,
        indentUnit.of("  "),
        keymap.of([indentWithTab]),

        // 2. MASTER AUTOCOMPLETE ENGINE
        autocompletion({
          icons: false, // Requirement: No icons
          defaultKeymap: true,
          override: [
            async (context) => {
              const ext = filename.split(".").pop()?.toLowerCase() || "";
              const match = context.matchBefore(/\w*/);
              if (!match || (match.from === match.to && !context.explicit))
                return null;

              let options: any[] = [];

              // ROUTE A: HTML, Python, and PHP (Hybrid Logic)
              if (ext === "html" || ext === "py" || ext === "php") {
                // Fetch default providers (HTML tags, Python methods, etc.)
                const providers = context.state.languageDataAt<any>(
                  "autocomplete",
                  context.pos,
                );
                for (let provider of providers) {
                  const result = await provider(context);
                  if (result && result.options)
                    options = [...options, ...result.options];
                }

                // If PHP, also inject the manual keywords from GetKeywords()
                if (ext === "php" && K.php) {
                  const phpK = K.php.map((k) => ({
                    label: k,
                    type: "keyword",
                    boost: 99,
                  }));
                  options = [...options, ...phpK];
                }
              }
              // ROUTE B: All Other Languages (Java, Rust, C++, C#, etc.)
              else {
                const keywords = K[ext] || [];
                options = keywords.map((k) => ({
                  label: k,
                  type: "keyword",
                  boost: 99,
                }));
              }

              // ROUTE C: Context Words (Variables/Words found in the current file)
              const contextWords = await completeAnyWord(context);
              if (contextWords && contextWords.options) {
                options = [...options, ...contextWords.options];
              }

              return {
                from: match.from,
                options: options,
                filter: true,
              };
            },
          ],
        }),

        themeCompartment.of(getThemeExtension(themeName)),
        languageCompartment.of([]),
        updateListener,
      ],
    });

    view = new EditorView({
      state,
      parent: container,
    });

    if (filename) {
      getLanguageSupport(filename).then((langSupport) => {
        view?.dispatch({
          effects: languageCompartment.reconfigure(langSupport),
        });
      });
    }
  });

  $effect(() => {
    if (view) {
      const currentDoc = view.state.doc.toString();
      if (content !== currentDoc) {
        view.dispatch({
          changes: { from: 0, to: currentDoc.length, insert: content },
        });
      }
    }
  });

  $effect(() => {
    if (view && filename) {
      getLanguageSupport(filename).then((langSupport) => {
        view?.dispatch({
          effects: languageCompartment.reconfigure(langSupport),
        });
      });
    }
  });

  $effect(() => {
    if (view) {
      view.dispatch({
        effects: themeCompartment.reconfigure(getThemeExtension(themeName)),
      });
    }
  });

  $effect(() => {
    if (view && isActive) {
      view.requestMeasure();
    }
  });

  onDestroy(() => {
    if (view) {
      view.destroy();
    }
  });
</script>

<div
  bind:this={container}
  class="codemirror-wrapper"
  class:activeTextArea={isActive}
></div>

<style>
  .codemirror-wrapper {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: 100% !important;
  }

  :global(.cm-editor) {
    height: 100%;
  }

  :global(.cm-editor.cm-focused) {
    outline: none !important;
  }

  /* --- COMPLETE AUTOCOMPLETE DROPDOWN FIX --- */
  :global(.cm-tooltip.cm-tooltip-autocomplete) {
    border-radius: 6px !important;
    overflow: hidden !important;
    z-index: 9999 !important;
  }

  :global(.cm-tooltip-autocomplete > ul) {
    display: block !important;
    max-height: 270px !important;
    min-width: 300px !important;
    overflow-y: auto !important;
    margin: 0 !important;
    padding: 0 !important;
    list-style: none !important;
    text-align: left !important;
    border-radius: 0 !important;
  }

  :global(.cm-tooltip-autocomplete > ul > li) {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    padding: 4px 10px !important;
    font-family: Consolas, monospace !important;
    font-size: 14px !important;
    color: #abb2bf !important;
    cursor: pointer !important;
    text-align: left !important;
    transition: none !important;
  }

  /* :global(.cm-tooltip-autocomplete > ul > li[aria-selected]) {
    background-color: #2c313a !important;
    color: #ffffff !important;
  } */

  :global(.cm-completionIcon) {
    opacity: 0.85 !important;
    margin-right: 8px !important;
    padding: 0 !important;
    text-align: left !important;
    display: none !important;
  }

  :global(.cm-completionMatchedText) {
    color: #61afef !important;
    font-weight: bold !important;
    text-decoration: none !important;
  }

  :global(.cm-completionDetail) {
    margin-left: auto !important;
    opacity: 0.5 !important;
    font-style: italic !important;
    font-size: 12px !important;
  }

  :global(.cm-gutters) {
    background: transparent !important;
  }

  :global(.cm-gutterElement) {
    opacity: 0.7;
  }

  :global(.cm-gutters.cm-gutters-before) {
    border: none !important;
  }
  :global(.cm-gutter) {
    overflow: visible !important;
  }
</style>
