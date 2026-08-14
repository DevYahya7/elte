import { app } from "@tauri-apps/api";

export const lightThemes: string[] = [
  "vscodeLight",
  "githubLight",
  "tokyoNightDayLight",
  "xcodeLight",
  "solarizedLight",
  "duotoneLight",
  "quietlightLight",
  "bbeditLight",
  "eclipseLight",
  "noctisLilacLight",
  "basicLight",
  "whiteLight",
  "consoleLight",
];

export const darkThemes: string[] = [
  "vscodeDark",
  "gruvboxDark",
  "atomoneDark",
  "draculaDark",
  "githubDark",
  "tokyoNightDark",
  "tokyoNightStormDark",
  "nordDark",
  "monokaiDark",
  "monokaiDimmedDark",
  "sublimeDark",
  "xcodeDark",
  "solarizedDark",
  "androidstudioDark",
  "darculaDark",
  "duotoneDark",
  "auraDark",
  "copilotDark",
  "basicDark",
  "whiteDark",
  "abcdefDark",
  "abyssDark",
  "andromedaDark",
  "bespinDark",
  "consoleDark",
  "kimbieDark",
  "redDark",
];

class EditorTheme {
  current = $state(lightThemes[0]);

  setTheme(theme: string) {
    this.current = theme;
  }
}

class AppTheme {
  current = $state(localStorage.getItem("appTheme") ?? "vscodeLight");

  setTheme(theme: string) {
    this.current = theme;
  }
}

class EditorViewStyle {
  fontSize = $state(localStorage.getItem("fontSize") ?? "15px");
  fontFamily = $state(
    localStorage.getItem("fontFamily") ??
      "JetBrainsMono Nerd Font Mono, Consolas, monospace",
  );

  setFontSize(size: number) {
    this.fontSize = `${size}px`;
  }

  setFontFamily(font: string) {
    this.fontFamily = `${font}`;
  }
}

export const editorTheme = new EditorTheme();
export let appTheme = new AppTheme();
export let editorViewStyle = new EditorViewStyle();

export function Update() {
  $effect(() => {
    const theme = appTheme.current;
    // console.log(theme);
    let div = document.querySelector(".ͼ1");
    if (div)
      document.body.style.setProperty("--bg", localStorage.getItem("bg") ?? "");
    else
      document.body.style.setProperty("--bg", "");

    if (div) {
      let getBg = getComputedStyle(div).backgroundColor;
      document.body.style.setProperty("--bg", getBg);
      localStorage.setItem("bg", getBg);
    }

    let getBodyTheme =
      appTheme.current.indexOf("Light") != -1
        ? appTheme.current.substring(appTheme.current.indexOf("Light"))
        : appTheme.current.substring(appTheme.current.indexOf("Dark"));

    editorTheme.setTheme(theme);
    document.body.setAttribute("data-theme", `${getBodyTheme.toLowerCase()}`);

    localStorage.setItem("appTheme", appTheme.current);
    localStorage.setItem("fontSize", String(editorViewStyle.fontSize));
    localStorage.setItem("fontFamily", String(editorViewStyle.fontFamily));
  });
}
