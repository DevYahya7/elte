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
      // fontFamily: "Consolas, monospace !important",
      fontFamily: editorViewStyle.fontFamily,
      fontSize: editorViewStyle.fontSize,
      // fontSize: "15px",
    },
    "&.cm-focused": {
      outline: "none !important",
    },
    ".cm-scroller": {
      // fontFamily: "JetBrainsMono Nerd Font Mono, Consolas, monospace !important",
      fontFamily: editorViewStyle.fontFamily,
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

  async function getLanguageSupport(fileName: string) {
    const langDesc = LanguageDescription.matchFilename(languages, fileName);
    if (langDesc) {
      return await langDesc.load();
    }
    return [];
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

    const state = EditorState.create({
      doc: content,
      extensions: [
        basicSetup,
        baseTheme,
        EditorView.lineWrapping,
        indentUnit.of("  "),
        keymap.of([indentWithTab]),
        // 2. Add autocompletion extension configured to suggest words from current file
        autocompletion({
          override: [completeAnyWord],
          defaultKeymap: true,
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
    background-color: rgb(30, 30, 30) !important;
    border-radius: 6px !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5) !important;
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
    scrollbar-width: none;
    border-radius: 0 !important;
  }

  :global(.cm-tooltip-autocomplete > ul > li) {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    padding: 3px 10px !important;
    font-family: Consolas, monospace !important;
    font-size: 14px !important;
    color: #abb2bf !important;
    cursor: pointer !important;
    text-align: left !important;
  }

  :global(.cm-tooltip-autocomplete > ul > li[aria-selected]) {
    background-color: #2c313a !important;
    color: #ffffff !important;
  }

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

  :global(.ͼ3 .cm-gutters) {
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
