// place files you want to import through the `$lib` alias in this folder.
import { app, event } from "@tauri-apps/api";
import { invoke } from "@tauri-apps/api/core";
import { confirm, open } from "@tauri-apps/plugin-dialog";
import CodeEditor from "$lib/components/CodeEditor.svelte";
import { setTheme } from "@tauri-apps/api/app";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

import {
  lightThemes,
  darkThemes,
  editorTheme,
  appTheme,
  Update,
  editorViewStyle,
} from "$lib/utils.svelte";
import { cpp } from "@codemirror/lang-cpp";
import type { HtmlTagDescriptor } from "vite";

import { getCurrentWindow } from "@tauri-apps/api/window";
import { ask, message } from "@tauri-apps/plugin-dialog";

import angularIcon from "$lib/assets/angularIcon.png";
import asmIcon from "$lib/assets/asmIcon.png";
import cIcon from "$lib/assets/cIcon.png";
import cppIcon from "$lib/assets/cppIcon.png";
import csIcon from "$lib/assets/csIcon.png";
import cssIcon from "$lib/assets/cssIcon.png";
import dartIcon from "$lib/assets/dartIcon.png";
import dockerIcon from "$lib/assets/dockerIcon.png";
import goIcon from "$lib/assets/goIcon.png";
import htmlIcon from "$lib/assets/htmlIcon.png";
import javaIcon from "$lib/assets/javaIcon.png";
import jsIcon from "$lib/assets/jsIcon.png";
import jsonIcon from "$lib/assets/jsonIcon.png";
import jsxIcon from "$lib/assets/jsxIcon.png";
import ktIcon from "$lib/assets/ktIcon.png";
import luaIcon from "$lib/assets/luaIcon.png";
import phpIcon from "$lib/assets/phpIcon.png";
import ps1Icon from "$lib/assets/ps1Icon.png";
import pyIcon from "$lib/assets/pyIcon.png";
import rbIcon from "$lib/assets/rbIcon.png";
import rsIcon from "$lib/assets/rsIcon.png";
import svelteIcon from "$lib/assets/svelteIcon.png";
import swiftIcon from "$lib/assets/swiftIcon.png";
import tsIcon from "$lib/assets/tsIcon.png";
import vueIcon from "$lib/assets/vueIcon.png";
import txtIcon from "$lib/assets/txtIcon.png";
import pdfIcon from "$lib/assets/pdfIcon.png";
import mp3Icon from "$lib/assets/mp3Icon.png";
import exeIcon from "$lib/assets/exeIcon.png";
import imageIcon from "$lib/assets/imageIcon.png";

const log = console.log;

export const APP_TITLE = "Awesome Code Editor";

interface FromFile {
  name: string | undefined;
  path: string | undefined;
}

async function init() {
  await invoke("init");
}

init();

// --- REFACTORED STATE TO OBJECTS WITH .state PROPERTY ---

export const structuredFiles = $state({
  state: [] as any[],
});

export const files = $state<{
  state: Record<string, string>;
}>({
  state: {},
});

export const lastActiveFiles = $state({
  state: [] as string[],
});

export const fileContents = $state({
  state: {} as Record<string, string>,
});

export const unsavedFiles = $state({
  state: {} as Record<string, boolean>,
});

export const parametres = $state({
  state: { settingsMenu: false },
});

export const expandExplorer = $state({
  state: localStorage.getItem("expandExplorer")
    ? localStorage.getItem("expandExplorer") == "true"
    : true,
});

export const lastFilesActive = $state({
  state: false,
});

export const lastFiles_activeElem = $state({
  state: 0,
});

export const activeId = $state({
  state: localStorage.getItem("activeId") ?? "",
});

export const activeThemeBtn = $state({
  state: localStorage.getItem("appTheme") ?? appTheme.current,
});

export const lang = $state({
  state: null as any,
});

export const moveFilesOrder = $state({
  state: {
    move: false,
    target: null as any,
  },
});

export const activeFile = $state({
  state: [] as string[],
});

// --- CONSTANTS ---

const appWindow = getCurrentWindow();

export const ICONS: Record<string, string> = {
  html: htmlIcon,
  htm: htmlIcon,
  xhtml: htmlIcon,
  css: cssIcon,
  scss: cssIcon,
  less: cssIcon,
  js: jsIcon,
  mjs: jsIcon,
  cjs: jsIcon,
  ts: tsIcon,
  jsx: jsxIcon,
  tsx: tsIcon,
  svelte: svelteIcon,
  vue: vueIcon,
  angular: angularIcon,
  php: phpIcon,
  c: cIcon,
  h: cIcon,
  cpp: cppIcon,
  hpp: cppIcon,
  cc: cppIcon,
  cxx: cppIcon,
  cs: csIcon,
  csx: csIcon,
  java: javaIcon,
  jar: javaIcon,
  py: pyIcon,
  pyw: pyIcon,
  rs: rsIcon,
  go: goIcon,
  swift: swiftIcon,
  kt: ktIcon,
  kts: ktIcon,
  rb: rbIcon,
  lua: luaIcon,
  dart: dartIcon,
  json: jsonIcon,
  jsonc: jsonIcon,
  ps1: ps1Icon,
  asm: asmIcon,
  s: asmIcon,
  dockerfile: dockerIcon,
  docker: dockerIcon,
  txt: txtIcon,
  log: txtIcon,
  pdf: pdfIcon,
  mp3: mp3Icon,
  wav: mp3Icon,
  ogg: mp3Icon,
  exe: exeIcon,
  msi: exeIcon,
  bin: exeIcon,
  bat: exeIcon,
  cmd: exeIcon,
  png: imageIcon,
  jpg: imageIcon,
  jpeg: imageIcon,
  gif: imageIcon,
  svg: imageIcon,
  webp: imageIcon,
  bmp: imageIcon,
  ico: imageIcon,
  avif: imageIcon,
  tiff: imageIcon,
};

document.body.oncontextmenu = (e) => {
  e.preventDefault();
};

export const shortcutsMap = {
  saveFile: "s",
  runCode: "n",
  createFile: "&",
  expandFileExplorer: "b",
  openFile: "é",
  openDir: `à`,
  navTabs: "tab",
};

let isTabDown = false;
let isModifierDown = false;

document.addEventListener("mouseup", () => (moveFilesOrder.state.move = false));

let k = 0;

class Program {
  async CreateFile() {
    try {
      const file: { path: string | null; name: string | undefined } = {
        path: await open({ multiple: false, directory: true }),
        name: undefined,
      };

      if (!file.path) return;
      file.name = prompt("Enter file name")?.trim();
      if (!file.name) return;

      await invoke("add_file", { file: file, createNew: true });
      await this.GetFiles();
    } catch (e) {
      console.error("Error opening file:", e);
      await message("File already exists", {
        title: "Error opening file",
        kind: "error",
      });
    }
  }

  async OpenFile() {
    try {
      let filesPaths = await open({ multiple: true, directory: false });
      if (!filesPaths) return;

      for (let i = 0; i < filesPaths.length; i++) {
        let filePath = filesPaths[i];
        const fileName = filePath.split(/[/\\]/).pop() || "";
        filePath = filePath.substring(0, filePath.lastIndexOf("\\"));

        await invoke("open_file", { filePath, fileName });
        await this.GetFiles();
        activeId.state = Object.entries(files.state)[
          Object.entries(files.state).length - 1
        ][0];
      }
    } catch (error) {
      alert(error);
    }
  }

  async CloseFile(e: any, file_name?: string) {
    const target = e.currentTarget as HTMLElement;
    if (target.parentElement) target.parentElement.style.display = "none";

    const fileName = file_name ?? target.dataset.name;
    await invoke("close_file", { fileName });
    await this.GetFiles();
    if (Object.entries(files.state).length > 0)
      activeId.state = Object.entries(files.state)[0][0];
  }

  async GetFiles() {
    const strFiles = await invoke<string>("get_files");
    files.state = JSON.parse(strFiles);

    lastActiveFiles.state = [];

    const entries = Object.entries(files.state);
    for (let i = 0; i < entries.length; i++) {
      const [fileName] = entries[i];
      if (fileContents.state[fileName] === undefined) {
        await this.ReadFromFile(i);
        await this.SaveFile(i);
      }
      lastActiveFiles.state.push(fileName);
    }
  }

  async HandleFileMouseDown(e: MouseEvent, fileName: string) {
    const target = e.currentTarget as HTMLElement;
    if (e.button == 1) {
      const ok = await ask(`Are you sure you want to delete ${fileName} ?`, {
        title: "Irreversible action",
        kind: "warning",
        okLabel: "Confirm",
        cancelLabel: "Cancel",
      });
      if (ok) {
        target.style.display = "none";
        await invoke("delete_file", { fileName, erase: true });
        delete fileContents.state[fileName];
        delete unsavedFiles.state[fileName];
        await this.GetFiles();
        activeId.state = Object.entries(files.state)[0][0];
        this.DuplicatePath();
      }
    } else if (e.button == 2) {
      const filePath = files.state[fileName];
      await invoke("open_in_explorer", { filePath });
    }
  }

  MoveFiles(target: HTMLElement, de: any) {
    if (!target || !target.parentElement) return;
    if (moveFilesOrder.state.move) {
      target.classList.add("moving");
      target.style.position = "absolute";
      target.style.top = de.clientY + "px";
    }
  }

  async ReadFromFile(ind?: number) {
    const entries = Object.entries(files.state);
    const file = ind != null ? entries[ind] : activeFile.state;
    if (!file || file.length === 0) return;

    try {
      const [fileName] = file;
      const content: string = await invoke("read_file_content", { file });
      fileContents.state[fileName] = content;
    } catch (e) {
      log("Error reading file");
    }
  }

  HandleFileClick(e: any, fileName: string) {
    activeId.state = fileName;
    if (!e.currentTarget.classList.contains("loaded")) {
      e.currentTarget.classList.add("loaded");
      this.ReadFromFile();
    }

    lang.state = document.querySelector(
      `.codemirror-wrapper[data-id='${e.currentTarget.dataset.id}'] .cm-content`,
    );
    if (lang.state) {
      lang.state = lang.state.dataset.language;
    }
  }

  async SaveFile(ind?: number) {
    const entries = Object.entries(files.state);
    const file = ind != null ? entries[ind] : activeFile.state;
    if (!file || file.length === 0) return;

    const [fileName] = file;
    const content = fileContents.state[fileName] ?? "";

    await invoke("save_file", { file, content });
    unsavedFiles.state[fileName] = false;
  }

  async RunCode() {
    await this.SaveFile();
    const file = activeFile.state;
    if (file && file.length > 0) {
      await invoke("run_code", { file });
    }
  }

  HandleEditorOnChange(fileName: string, value: string) {
    fileContents.state[fileName] = value;
    unsavedFiles.state[fileName] = true;
  }

  async Ready() {
    await this.GetFiles();
    await this.ReadFromFile();
    const tab: HTMLButtonElement | null = document.querySelector(
      ".active button.navItem",
    );
    tab?.click();
  }

  async OpenDir() {
    try {
      const path = await open({ directory: true });
      if (!path) return;
      await invoke("open_dir", { path });
      await this.GetFiles();
    } catch (e) {
      console.error(e);
    }
  }

  SetTheme(theme: string) {
    appTheme.setTheme(theme);
  }

  ExpandExplorer() {
    expandExplorer.state = !expandExplorer.state;
  }

  async OpenInNewWindow() {
    let existingWindow = await WebviewWindow.getByLabel("newWindow");
    if (existingWindow) {
      existingWindow.setFocus();
      return;
    }

    const file = activeFile.state;
    const path = encodeURIComponent(file[1] + "\\" + file[0]);

    const newWindow = new WebviewWindow("newWindow", {
      url: `/new?path=${path}`,
      title: `${file[1]}\\${file[0]} - ELTE`,
      width: 1200,
      height: 600,
      resizable: true,
      center: true,
    });
  }

  async OpenLink(link: string) {
    await invoke("open_link", { link });
  }

  SwitchTabs(mode: "increment" | "decrement") {
    if (mode == "increment") {
      lastFiles_activeElem.state += 1;
      if (lastFiles_activeElem.state > lastActiveFiles.state.length - 1) {
        lastFiles_activeElem.state = 0;
      }
    } else if (mode == "decrement") {
      lastFiles_activeElem.state -= 1;
      if (lastFiles_activeElem.state < 0) {
        lastFiles_activeElem.state = lastActiveFiles.state.length - 1;
      }
    }
  }

  KeyShortcuts(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    if (e.ctrlKey || e.metaKey) {
      if (key === shortcutsMap.saveFile) {
        e.preventDefault();
        this.SaveFile();
      }
      if (e.altKey && key === shortcutsMap.runCode) {
        e.preventDefault();
        this.RunCode();
      }
      if (key === shortcutsMap.createFile) this.CreateFile();
      if (key === shortcutsMap.expandFileExplorer) {
        e.preventDefault();
        this.ExpandExplorer();
      }
      if (key === shortcutsMap.openFile) this.OpenFile();
      if (key === shortcutsMap.openDir) this.OpenDir();
      if (key === "r" || key === "f5") e.preventDefault();
    }

    if (e.key === "Control" || e.key === "Meta") isModifierDown = true;
    if (key === shortcutsMap.navTabs.toLowerCase()) isTabDown = true;

    if ((e.ctrlKey || e.metaKey) && key === shortcutsMap.navTabs) {
      e.preventDefault();
      lastFilesActive.state = true;
      this.SwitchTabs(e.shiftKey ? "decrement" : "increment");
    }
  }

  KeyShortcutsUp(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    if (e.key === "Control" || e.key === "Meta") isModifierDown = false;
    if (key === shortcutsMap.navTabs.toLowerCase()) isTabDown = false;

    if (!isModifierDown && !isTabDown && lastFilesActive.state) {
      lastFilesActive.state = false;
      activeId.state = lastActiveFiles.state[lastFiles_activeElem.state];

      const fileItem = document.querySelector(
        `.filesTreeItemContainer button[data-id="${activeId.state}"]`,
      )?.parentElement;

      if (fileItem?.parentElement?.classList.contains("wrap"))
        fileItem?.parentElement?.classList.remove("wrap");

      fileItem?.scrollIntoView({ behavior: "smooth" });
    }
  }

  async setupCloseListener() {
    await appWindow.onCloseRequested(async (e) => {
      const hasUnsavedChanges = Object.values(unsavedFiles.state).some(
        (v) => v,
      );
      if (hasUnsavedChanges) {
        e.preventDefault();
        const confirmClose = await ask("Unsaved changes. Quit anyway?", {
          title: "Unsaved work",
          kind: "warning",
          okLabel: "Quit",
          cancelLabel: "Cancel",
        });
        if (confirmClose) await appWindow.destroy();
      }
    });
  }

  async AskReload(e: Event) {
    const unsaved = Object.values(unsavedFiles.state).some((v) => v);
    if (unsaved) {
      e.preventDefault();
      const confirm = await ask("Unsaved changes. Refresh?", {
        title: "Unsaved work",
        kind: "warning",
        okLabel: "Refresh",
        cancelLabel: "Cancel",
      });
      if (confirm) location.reload();
    } else location.reload();
  }

  FooterHeight() {
    const overl = document.querySelector(
      ".footeroverlay",
    ) as HTMLElement | null;
    const footer = document.querySelector("#pageFooter") as HTMLElement | null;
    if (overl && footer) {
      const val = footer.offsetHeight;
      document.body.style.setProperty("--height", val + "px");
    }
  }

  pathExists(strFiles: any[], path: string): [boolean, number] {
    for (let i = 0; i < strFiles.length; i++) {
      if (strFiles[i].path == path) return [true, i];
    }
    return [false, 0];
  }

  DuplicatePath() {
    const f = Object.entries(files.state);
    for (let i = 0; i < f.length; i++) {
      const exists = this.pathExists(structuredFiles.state, f[i][1]);
      if (exists[0]) {
        const targetFolder = structuredFiles.state[exists[1]];
        if (!targetFolder.files.includes(f[i][0]))
          targetFolder.files.push(f[i][0]);
      } else {
        structuredFiles.state.push({ path: f[i][1], files: [f[i][0]] });
      }
    }
  }

  WrapFolder(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    const parent = target.parentElement;
    if (!parent) return;
    parent.style.setProperty("--ht", target.offsetHeight + "px");
    parent.classList.toggle("wrap");
    localStorage.setItem(
      `folder${target.dataset.id}`,
      String(parent.classList.contains("wrap")),
    );
  }
}

export const program = new Program();

export function MainUpdate() {
  $effect(() => {
    activeThemeBtn.state = appTheme.current;

    const filesTree = document.querySelector("#filesTree");
    const mouseMoveHandler = (de: any) =>
      program.MoveFiles(moveFilesOrder.state.target, de);

    if (moveFilesOrder.state.move) {
      filesTree?.addEventListener("mousemove", mouseMoveHandler);
    } else {
      const target = moveFilesOrder.state.target;
      if (target && target.parentElement) {
        target.style.position = "relative";
        target.style.top = "0";
        target.classList.remove("moving");
      }
      filesTree?.removeEventListener("mousemove", mouseMoveHandler);
    }

    localStorage.setItem("activeId", activeId.state);
    localStorage.setItem("expandExplorer", String(expandExplorer.state));

    activeFile.state = [activeId.state, files.state[activeId.state]];
    program.DuplicatePath();
  });
}
