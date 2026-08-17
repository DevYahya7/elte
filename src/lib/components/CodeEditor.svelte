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
  import { indentationMarkers } from "@replit/codemirror-indentation-markers";

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
  import { css } from "@codemirror/lang-css";
  import { sql } from "@codemirror/lang-sql";
  import { json } from "@codemirror/lang-json";
  import { yaml } from "@codemirror/lang-yaml";
  import { go } from "@codemirror/lang-go";
  import { csharp } from "@replit/codemirror-lang-csharp";

  import { GetKeywords } from "$lib/keywordsDB.svelte";

  import { linter, lintGutter, type Diagnostic } from "@codemirror/lint";
  import { syntaxTree } from "@codemirror/language";
  import { showMinimap } from "@replit/codemirror-minimap";

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
    dataId?: string;
    filename?: string;
    content?: string;
    isActive?: boolean;
    themeName?: string;
    onChange?: (value: string) => void;
    onFocus?: () => void;
  }

  let {
    dataId = "",
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
    "&.cm-focused": { outline: "none !important" },
    ".cm-scroller": {
      fontFamily: editorViewStyle.fontFamily + ", monospace !important",
    },

    // --- CHANGE AUTOCOMPLETE FONT ---
    ".cm-tooltip.cm-tooltip-autocomplete": {
      fontFamily: editorViewStyle.fontFamily + ", monospace !important",
    },
    ".cm-tooltip-autocomplete ul li": {
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

  const langMap: Record<string, () => any> = {
    // Web Core
    js: javascript,
    mjs: javascript,
    cjs: javascript,
    ts: () => javascript({ typescript: true }),

    // FIX: jsx and tsx should use the javascript/typescript engine, not HTML
    jsx: () => javascript({ jsx: true }),
    tsx: () => javascript({ jsx: true, typescript: true }),

    // Python
    py: python,
    pyw: python,

    // Rust
    rs: rust,

    // C / C++ (All use the cpp package)
    c: cpp,
    h: cpp,
    cpp: cpp,
    cc: cpp,
    cxx: cpp,
    hpp: cpp,
    hh: cpp,
    hxx: cpp,

    // Java
    java: java,

    // C#
    cs: csharp,
    csx: csharp,

    // PHP
    php: php,
    phtml: php,

    // HTML & Templates
    html: () => html({ autoCloseTags: true }),
    htm: () => html({ autoCloseTags: true }),
    xhtml: () => html({ autoCloseTags: true }),
    svelte: () => html({ autoCloseTags: true }),
    vue: () => html({ autoCloseTags: true }),
    angular: () => html({ autoCloseTags: true }),

    // CSS & Styling
    css: css,
    scss: css,
    less: css,

    // Data & Config
    json: json,
    yaml: yaml,
    yml: yaml,

    // Database & Systems
    sql: sql,
    go: go,

    // Others from your icon list (Falling back to similar syntax)
    rb: python, // Ruby looks similar to Python to a basic highlighter
    swift: rust, // Swift looks similar to Rust
    kt: java, // Kotlin looks similar to Java
    lua: python, // Lua looks similar to Python
    dart: javascript,

    // Your French Algorithm
    algo: python, // You chose Python earlier; it works well for indentation
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

  const RELIABLE_FOR_SYNTAX_LINT = new Set([
    "js",
    "mjs",
    "cjs",
    "ts",
    "jsx",
    "tsx",
    "py",
    "pyw",
    "rs",
    "json",
    "css",
    "scss",
    "less",
    "html",
    "htm",
    "xhtml",
    "java",
    "php",
    "phtml",
    "go",
    "sql",
    "yaml",
    "yml",
  ]);

  const syntaxLinter = linter((view) => {
    const ext = filename.split(".").pop()?.toLowerCase() || "";
    if (!RELIABLE_FOR_SYNTAX_LINT.has(ext)) return [];

    const diagnostics: Diagnostic[] = [];
    syntaxTree(view.state).iterate({
      enter: (node) => {
        if (node.type.isError) {
          diagnostics.push({
            from: node.from,
            to: node.to > node.from ? node.to : node.from + 1,
            severity: "error",
            message: "Syntax error",
          });
        }
      },
    });
    return diagnostics;
  });

  const minimap = showMinimap.compute(["doc"], (state) => {
    const gutterMarks: Record<number, string> = {};
    syntaxTree(state).iterate({
      enter: (node) => {
        if (node.type.isError) {
          const line = state.doc.lineAt(node.from).number;
          gutterMarks[line] = "#e5484d";
        }
      },
    });

    return {
      create: () => ({ dom: document.createElement("div") }),
      displayText: "blocks",
      showOverlay: "mouse-over",
      gutters: [gutterMarks],
    };
  });

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
        indentationMarkers({
          highlightActiveBlock: true, // dims/highlights the guide for the block your cursor is in
          hideFirstIndent: false, // if true, skips markers at the outermost indent level
          markerType: "codeOnly", // "fullScope" runs lines to the end of the block; "codeOnly" stops at the last non-empty line
          thickness: 1, // px width of normal markers
          activeThickness: undefined, // px width of the active-block marker (falls back to `thickness`)
          colors: {
            light: "rgb(0,0,0, 0.07)",
            dark: "rgb(255,255,255, .07)",
            activeLight: "rgb(0,0,0, 0.2)",
            activeDark: "rgb(255,255,255, .2)",
          },
        }),
        EditorView.lineWrapping,
        EditorState.tabSize.of(2),
        indentUnit.of("  "),
        keymap.of([indentWithTab]),
        // syntaxLinter,
        // lintGutter(),
        minimap,

        // 2. MASTER AUTOCOMPLETE ENGINE
        autocompletion({
          icons: true, // Requirement: No icons
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
  data-id={filename}
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

  :global(.cm-scroller) {
    &::-webkit-scrollbar {
      display: none !important;
    }
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
    /* color: #61afef !important; */
    color: #ff007b !important;
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
    user-select: none;
    -moz-user-select: none;
  }

  :global(.cm-gutters.cm-gutters-before) {
    border: none !important;
  }
  :global(.cm-gutter) {
    overflow: visible !important;
  }
</style>
