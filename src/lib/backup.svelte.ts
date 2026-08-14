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
import { onMount } from "svelte";

import { getCurrentWindow } from "@tauri-apps/api/window";
import { ask, message } from "@tauri-apps/plugin-dialog";
import { form } from "$app/server";

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

const APP_TITLE = "Awesome Code Editor";

interface FromFile {
  name: string | undefined;
  path: string | undefined;
}

async function init() {
  await invoke("init");
}

init();

// Reactive state
const structuredFiles: any = $state([]);
let files = $state<Record<string, string>>({});
let lastActiveFiles = $state<string[]>([]);
let fileContents = $state<Record<string, string>>({});
let unsavedFiles = $state<Record<string, boolean>>({});

const appWindow = getCurrentWindow();

let parametres = $state({
  settingsMenu: false,
});

let expandExplorer = $state<boolean>(
  localStorage.getItem("expandExplorer")
    ? localStorage.getItem("expandExplorer") == "true"
    : true,
);

let lastFilesActive = $state<boolean>(false);
let lastFiles_activeElem = $state<number>(0);

// let activeId = $state(
//   localStorage.getItem("activeId")
//     ? Number(localStorage.getItem("activeId"))
//     : 0,
// );

let activeId = $state(localStorage.getItem("activeId") ?? "");

let activeThemeBtn = $state(
  localStorage.getItem("appTheme") ?? appTheme.current,
);

let lang: any = $state();

let moveFilesOrder = $state({
  move: false,
  target: null as any,
});

const ICONS: Record<string, string> = {
  // Web & Frameworks
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

  // Systems & Programming
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

  // Data & Shell
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

  // Multimédia
  mp3: mp3Icon,
  wav: mp3Icon,
  ogg: mp3Icon,

  // Exécutables et Binaires
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

async function CreateFile() {
  try {
    const file: {
      path: string | null;
      name: string | undefined;
    } = {
      path: await open({
        multiple: false,
        directory: true,
      }),
      name: undefined,
    };

    if (!file.path) return;
    file.name = prompt("Enter file name")?.trim();
    if (!file.name) return;

    await invoke("add_file", { file: file, createNew: true });
    await GetFiles();
  } catch (e) {
    console.error("Error opening file:", e);
    await message("File already exists", {
      title: "Error opening file",
      kind: "error",
      buttons: {
        ok: "Confirm",
      },
    });
  }
}

async function OpenFile() {
  try {
    let filesPaths = await open({
      multiple: true,
      directory: false,
    });

    if (!filesPaths) {
      console.log("User canceled file selection");
      return;
    }

    for (let i = 0; i < filesPaths.length; i++) {
      let filePath = filesPaths[i];
      const fileName = filePath.split(/[/\\]/).pop() || "";

      filePath = filePath.substring(0, filePath.lastIndexOf("\\"));
      log(filePath);

      await invoke("open_file", {
        filePath: filePath,
        fileName: fileName,
      });

      await GetFiles();

      activeId = Object.entries(files)[Object.entries(files).length - 1][0];
    }
  } catch (error) {
    alert(error);
  }
}

async function CloseFile(e: any, file_name?: string) {
  e.currentTarget.parentElement.style.display = "none";
  const fileName = file_name ?? e.currentTarget.dataset.name;
  await invoke("close_file", { fileName: fileName });
  await GetFiles();
  if (Object.entries(files).length > 0) activeId = Object.entries(files)[0][0];
}

async function GetFiles() {
  const strFiles = await invoke<string>("get_files");
  files = JSON.parse(strFiles);

  lastActiveFiles = [];

  const entries = Object.entries(files);
  for (let i = 0; i < entries.length; i++) {
    const [fileName] = entries[i];
    if (fileContents[fileName] === undefined) {
      await ReadFromFile(i);
      await SaveFile(i);
    }

    lastActiveFiles.push(fileName);
  }
}

async function HandleFileMouseDown(e: MouseEvent, fileName: string) {
  const target = e.currentTarget as HTMLElement;
  if (e.button == 1) {
    // Middle click: Delete file
    const ok = await ask(`Are you sure you want to delete ${fileName} ?`, {
      title: "Irreversible action",
      kind: "warning",
      okLabel: "Confirm",
      cancelLabel: "Cancel",
    });

    if (ok) {
      target.style.display = "none";
      await invoke("delete_file", { fileName: fileName, erase: true });
      // Clean local state
      delete fileContents[fileName];
      delete unsavedFiles[fileName];
      await GetFiles();
      // if (activeId >= Object.keys(files).length) {
      //   activeId = Math.max(0, Object.keys(files).length - 1);
      // }
      activeId = Object.entries(files)[0][0];
      DuplicatePath();

      // log(fileName);
    }
  } else if (e.button == 2) {
    // Right click: Open in explorer
    const filePath = files[fileName];
    await invoke("open_in_explorer", { filePath: filePath });
  } else if (e.button == 0) {
    if (target && target.parentElement) {
      // moveFilesOrder.move = true;
      // moveFilesOrder.target = target.parentElement;
    }
  }
}

function MoveFiles(target: HTMLElement, de: any) {
  if (!target || !target.parentElement) return;
  if (moveFilesOrder.move) {
    target.classList.add("moving");
    target.style.position = "absolute";
    target.style.top = de.clientY + "px";
  }
}

async function ReadFromFile(ind?: number) {
  const file =
    ind != null ? Object.entries(files)[ind] : Array.from(activeFile);
  if (!file) return;

  try {
    const [fileName] = file;
    const content: string = await invoke("read_file_content", {
      file: file,
    });

    fileContents = {
      ...fileContents,
      [fileName]: content,
    };
  } catch (e) {
    console.log("Error");
  }
}

function HandleFileClick(e: any, fileName: string) {
  activeId = fileName;
  if (!e.currentTarget.classList.contains("loaded")) {
    e.currentTarget.classList.add("loaded");
    ReadFromFile();
  }

  log(Object.entries(structuredFiles));

  lang = document.querySelector(
    `.codemirror-wrapper[data-id='${e.currentTarget.dataset.id}'] .cm-content`,
  );
  if (lang) {
    lang = lang.dataset.language;
  }

  // log(e.currentTarget.dataset.id);
}

async function SaveFile(ind?: number) {
  const entries = Object.entries(files);
  const file = ind != null ? entries[ind] : Array.from(activeFile);
  if (!file) return;

  const [fileName] = file;
  const content = fileContents[fileName] ?? "";

  // log(file);

  await invoke("save_file", { file: file, content: content });
  unsavedFiles[fileName] = false;
}

async function RunCode() {
  await SaveFile();
  const file = activeFile;

  if (file) {
    await invoke("run_code", { file: file });
  }
}

function HandleEditorOnChange(fileName: string, value: string) {
  fileContents[fileName] = value;
  unsavedFiles[fileName] = true;
}

async function Ready() {
  await GetFiles();
  await ReadFromFile();

  const tab: HTMLButtonElement | null = document.querySelector(
    ".active button.navItem",
  );
  tab?.click();
}

async function OpenDir() {
  try {
    const path = await open({
      directory: true,
    });

    if (!path) {
      console.log("User canceled file selection");
      return;
    }

    await invoke("open_dir", { path: path });
    await GetFiles();
  } catch (e) {
    console.error(e);
  }
}

function SetTheme(theme: string) {
  appTheme.setTheme(theme);
}

function SetSetting(e: any) {
  if (e.currentTarget.dataset.sett == "theme") {
    SetTheme(e.currentTarget.dataset.theme);
  }
}

function ExpandExplorer() {
  expandExplorer = !expandExplorer;
}

async function OpenInNewWindow() {
  let existingWindow = await WebviewWindow.getByLabel("newWindow");
  if (existingWindow) {
    existingWindow.setFocus();
    return;
  }

  const file = activeFile;
  const path = encodeURIComponent(file[1] + "\\" + file[0]);

  const newWindow = new WebviewWindow("newWindow", {
    url: `/new?path=${path}`,
    title: `${file[1]}\\${file[0]} - ELTE`,
    width: 1200,
    height: 600,
    resizable: true,
    fullscreen: false,
    center: true,
    minWidth: 300,
    minHeight: 400,
  });

  newWindow.once("tauri://created", () => {
    // console.log("Settings window created!");
  });

  newWindow.once("tauri://error", (err) => {
    console.error("Error creating window:", err);
  });
}

async function OpenLink(link: string) {
  await invoke("open_link", { link: link });
}

function SwitchTabs(mode: "increment" | "decrement") {
  if (mode == "increment") {
    lastFiles_activeElem += 1;
    if (lastFiles_activeElem > lastActiveFiles.length - 1) {
      lastFiles_activeElem = 0;
    }
  } else if (mode == "decrement") {
    lastFiles_activeElem -= 1;
    if (lastFiles_activeElem < 0) {
      lastFiles_activeElem = lastActiveFiles.length - 1;
    }
  }
}

// let appTitle = $derived(Object.keys(files)[activeId] ?? "ELTE");

document.body.oncontextmenu = (e) => {
  e.preventDefault();
};

const shortcutsMap = {
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

function KeyShortcuts(e: KeyboardEvent) {
  // control key shortcuts
  const key = e.key.toLowerCase();

  if (e.ctrlKey || e.metaKey) {
    if (key === shortcutsMap.saveFile) {
      e.preventDefault();
      SaveFile();
    }
  }

  if (e.ctrlKey || e.metaKey) {
    if (e.altKey) {
      if (key === shortcutsMap.runCode) {
        e.preventDefault();
        RunCode();
      }
    } else if (key === shortcutsMap.createFile) {
      CreateFile();
    }
  }

  if (e.ctrlKey || e.metaKey) {
    if (key === shortcutsMap.expandFileExplorer) {
      e.preventDefault();
      ExpandExplorer();
    }
  }

  if (e.ctrlKey || e.metaKey) {
    if (key === shortcutsMap.openFile) {
      OpenFile();
    }
  }

  if (e.ctrlKey || e.metaKey) {
    if (key === shortcutsMap.openDir) {
      OpenDir();
    }
  }

  // window

  if (e.ctrlKey || e.metaKey) {
    if (key === "r" || key === "f5") {
      e.preventDefault();
    }
  }

  if (e.key === "Control" || e.key === "Meta") isModifierDown = true;
  if (key === shortcutsMap.navTabs.toLowerCase()) isTabDown = true;

  if ((e.ctrlKey || e.metaKey) && e.shiftKey && key === shortcutsMap.navTabs) {
    e.preventDefault();
    lastFilesActive = true;
    SwitchTabs("decrement");
  } else if ((e.ctrlKey || e.metaKey) && key === shortcutsMap.navTabs) {
    e.preventDefault();
    lastFilesActive = true;
    SwitchTabs("increment");
  }
}

function KeyShortcutsUp(e: KeyboardEvent) {
  const key = e.key.toLowerCase();

  if (e.key === "Control" || e.key === "Meta") isModifierDown = false;
  if (key === shortcutsMap.navTabs.toLowerCase()) isTabDown = false;

  if (!isModifierDown && !isTabDown && lastFilesActive) {
    lastFilesActive = false;
    activeId = lastActiveFiles[lastFiles_activeElem];

    const fileItem = document.querySelector(
      `.filesTreeItemContainer button[data-id="${activeId}"]`,
    )?.parentElement;

    if (fileItem?.parentElement?.classList.contains("wrap"))
      fileItem?.parentElement?.classList.remove("wrap");

    fileItem?.scrollIntoView({
      behavior: "smooth",
    });
  }
}

async function setupCloseListener() {
  await appWindow.onCloseRequested(async (e) => {
    const hasUnsavedChanges = Object.values(unsavedFiles).some((v) => v);

    if (hasUnsavedChanges) {
      e.preventDefault();
      const confirmClose = await ask(
        "You have unsaved changes. Do you really want to quit ?",
        {
          title: "Unsaved work",
          kind: "warning",

          okLabel: "Quit",
          cancelLabel: "Cancel",
        },
      );

      if (confirmClose) {
        await appWindow.destroy();
      }
    }
  });
}

async function AskReload(e: Event) {
  const unsaved = Object.values(unsavedFiles).some((isUnsaved) => isUnsaved);
  if (unsaved) {
    e.preventDefault();
    const confirm = await ask(
      "You have unsaved changes. Do you really want to refresh the app ?",
      {
        title: "Unsaved work",
        kind: "warning",
        okLabel: "Refresh",
        cancelLabel: "Cancel",
      },
    );

    if (confirm) {
      location.reload();
    }
  } else {
    location.reload();
  }
}

document.addEventListener("mouseup", () => (moveFilesOrder.move = false));

let activeFile = $state<string[]>([]);

function FooterHeight() {
  const overl = document.querySelector(".footeroverlay") as HTMLElement | null;
  const footer = document.querySelector("#pageFooter") as HTMLElement | null;
  if (overl && footer) {
    const val = footer.offsetHeight;
    document.body.style.setProperty("--height", val + "px");
  }
}

let k = 0;

function pathExists(structuredFiles: any, path: string): [boolean, number] {
  for (let i = 0; i < structuredFiles.length; i++) {
    if (structuredFiles[i].path == path) return [true, i];
  }

  return [false, 0];
}

function AddFilesStructured(
  structuredFiles: any,
  ind: number,
  i: number,
  f: any,
) {
  if (!structuredFiles[ind].files.includes(f[i][0]))
    structuredFiles[ind].files.push(f[i][0]);
}

function DuplicatePath() {
  const f = Object.entries(files);

  for (let i = 0; i < f.length; i++) {
    const exists = pathExists(structuredFiles, f[i][1]);
    if (exists[0]) {
      AddFilesStructured(structuredFiles, exists[1], i, f);
    } else {
      structuredFiles.push({
        path: f[i][1],
        files: [],
      });
      AddFilesStructured(structuredFiles, k, i, f);
      k += 1;
    }
  }

  // log(Object.entries(structuredFiles));
}

function WrapFolder(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement;
  target.parentElement?.style.setProperty("--ht", target.offsetHeight + "px");
  target.parentElement?.classList.toggle("wrap");

  localStorage.setItem(
    `folder${target.dataset.id}` || "",
    String(target.parentElement?.classList.contains("wrap")),
  );
}

Update();
Ready();

onMount(() => {
  FooterHeight();
  setupCloseListener();
});

$effect(() => {
  activeThemeBtn = appTheme.current;

  document.querySelector("#filesTree")?.addEventListener("mousemove", (de) => {
    MoveFiles(moveFilesOrder.target, de);
  });

  if (!moveFilesOrder.move) {
    if (moveFilesOrder.target && moveFilesOrder.target.parentElement) {
      moveFilesOrder.target.style.position = "relative";
      moveFilesOrder.target.style.top = 0;
      moveFilesOrder.target.classList.remove("moving");
    }

    document
      .querySelector("#filesTree")
      ?.removeEventListener("mousemove", (de) => {
        MoveFiles(moveFilesOrder.target, de);
      });
  }

  localStorage.setItem("activeId", activeId);
  localStorage.setItem("expandExplorer", String(expandExplorer));

  activeFile = [activeId, files[activeId]];

  DuplicatePath();
});
