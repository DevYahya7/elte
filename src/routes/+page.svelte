<script lang="ts">
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
      activeId = Object.entries(files)[Object.entries(files).length - 1][0];
      ScrollIntoFile()
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

        await invoke("open_file", {
          filePath: filePath,
          fileName: fileName,
        });

        await GetFiles();

        activeId = Object.entries(files)[Object.entries(files).length - 1][0];
        ScrollIntoFile()
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
    if (Object.entries(files).length > 0)
      activeId = Object.entries(files)[0][0];
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
      title: `${file[1]}\\${file[0]} - ACE`,
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

    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      key === shortcutsMap.navTabs
    ) {
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
      ScrollIntoFile();
    }
  }

  function ScrollIntoFile() {
    const fileItem = document.querySelector(
      `.filesTreeItemContainer button[data-id="${activeId}"]`,
    )?.parentElement;

    if (fileItem?.parentElement?.classList.contains("wrap"))
      fileItem?.parentElement?.classList.remove("wrap");

    fileItem?.scrollIntoView({
      behavior: "smooth",
    });
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
    const overl = document.querySelector(
      ".footeroverlay",
    ) as HTMLElement | null;
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

    document
      .querySelector("#filesTree")
      ?.addEventListener("mousemove", (de) => {
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
</script>

<svelte:head>
  <!-- <title>{appTitle}</title> -->
</svelte:head>
<svelte:window
  onresize={FooterHeight}
  onkeydown={KeyShortcuts}
  onkeyup={KeyShortcutsUp}
/>

<div id="container">
  <div class="content">
    <section class="editor">
      <main>
        <nav class="nav">
          <div class="menu">
            <div class="settings">
              <div class="menuIcon">
                <button
                  aria-label="menuBtn"
                  class="baseBtn"
                  id="menuBtn"
                  onclick={ExpandExplorer}
                >
                  <svg
                    width="21px"
                    height="21px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M4 6H20M4 12H14M4 18H9"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
              <div class="settingsIcon">
                <button
                  aria-label="settingsBtn"
                  class="baseBtn"
                  id="settingsBtn"
                  title="Open settings"
                  onclick={() =>
                    (parametres.settingsMenu = !parametres.settingsMenu)}
                >
                  <svg
                    width="21px"
                    height="21px"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill="#000000"
                        d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
              <div class="openInExternal">
                <button
                  aria-label="openInExternalBtn"
                  class="baseBtn"
                  id="openInExternalBtn"
                  title="Open file in external window"
                  onclick={OpenInNewWindow}
                >
                  <svg
                    width="21px"
                    height="21px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g><g id="SVGRepo_iconCarrier">
                      <g id="Interface / External_Link">
                        <path
                          id="Vector"
                          d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
                          stroke="#000000"
                          stroke-width="1.656"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </g>
                    </g></svg
                  >
                </button>
              </div>
              <div class="refreshPage">
                <button
                  aria-label="refreshPageBtn"
                  class="baseBtn"
                  title="Refresh"
                  id="refreshPageBtn"
                  onclick={(e) => AskReload(e)}
                >
                  <svg
                    width="21px"
                    height="21px"
                    viewBox="0 0 24 24"
                    fill="none"
                    style="fill: none !important;"
                    xmlns="http://www.w3.org/2000/svg"
                    ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style="fill: none !important;"
                    ></g><g id="SVGRepo_iconCarrier">
                      <path
                        d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"
                        stroke="#000000"
                        stroke-width="1.584"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        style="fill: none !important;"
                      ></path>
                    </g></svg
                  >
                </button>
              </div>
            </div>
            <hr />
            <div class="quickEdit">
              <button onclick={CreateFile} class="baseBtn"
                >Create new file</button
              >
              <button onclick={OpenFile} class="baseBtn">Open file</button>
              <button onclick={OpenDir} class="baseBtn">Open Folder</button>
            </div>
          </div>
          <div class="fileInfo">
            <small>{activeFile ? activeFile[0] : ""}</small>
          </div>
          <div class="controls">
            <button id="runCode" class="baseBtn" onclick={RunCode}
              >Run Code</button
            >
            <button
              id="saveFile"
              class="baseBtn"
              onclick={() => {
                SaveFile();
              }}>Save File</button
            >
          </div>
        </nav>
        <div class="editorAreaContainer">
          <div class="editorArea">
            <div
              id="fileTreeContainer"
              class="editCnt"
              class:visibleCnt={!expandExplorer}
            >
              <ul id="filesTree">
                <div class="header">
                  <small>Project</small>
                </div>
                {#if Object.entries(files).length == 0}
                  <div class="emptyMenu">
                    <ul>
                      <li>
                        <small>You have not yet opened a folder</small>
                        <button onclick={OpenDir}>Open Folder</button>
                      </li>
                    </ul>
                  </div>
                {:else}
                  {#each Object.entries(structuredFiles) as file, id}
                    {#each [file[1]] as file_obj, id2}
                      <ul
                        class="filesTree_PATH"
                        class:wrap={localStorage.getItem(`folder${id}`) ==
                          "true"}
                      >
                        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <li
                          class="folderName"
                          onclick={WrapFolder}
                          data-id={id}
                        >
                          <button
                            class="fileIcon icon-btn"
                            aria-label="file-button"
                          >
                            <svg
                              width="21px"
                              height="21px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g><g id="SVGRepo_iconCarrier">
                                <path
                                  d="M3 17V7C3 5.89543 3.89543 5 5 5H9.58579C9.851 5 10.1054 5.10536 10.2929 5.29289L12 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z"
                                  stroke="#000000"
                                  stroke-width="1.44"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </g></svg
                            >
                          </button>
                          <button class="folderNameText">
                            {file_obj.path.substring(
                              file_obj.path.lastIndexOf("\\") + 1,
                            )}
                          </button>
                          <svg
                            width="16px"
                            height="16px"
                            viewBox="0 0 24 24"
                            style="fill: none !important;"
                            xmlns="http://www.w3.org/2000/svg"
                            class="svelte-1uha8ag drop"
                            ><g
                              id="SVGRepo_bgCarrier"
                              stroke-width="0"
                              class="svelte-1uha8ag"
                            ></g><g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="svelte-1uha8ag"
                            ></g><g
                              id="SVGRepo_iconCarrier"
                              class="svelte-1uha8ag"
                              ><path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"
                                fill="#000000"
                                class="svelte-1uha8ag"
                              ></path></g
                            ></svg
                          >
                        </li>
                        {#each Object.entries(file_obj.files) as file_name, id3}
                          <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                          <li
                            class:active={Array.from(file_name)[1] == activeId}
                            class="filesTreeItemContainer"
                            onmousedown={(e) =>
                              HandleFileMouseDown(e, Array.from(file_name)[1])}
                          >
                            <div class="fileIcon baseBtn">
                              {#if ICONS[`${Array.from(file_name)[1].substring(Array.from(file_name)[1].lastIndexOf(".") + 1)}`]}
                                <img
                                  src={ICONS[
                                    `${Array.from(file_name)[1].substring(Array.from(file_name)[1].lastIndexOf(".") + 1)}`
                                  ]}
                                  alt=""
                                />
                              {:else}
                                <svg
                                  width="18px"
                                  height="18px"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  style="fill: none !important;"
                                  xmlns="http://www.w3.org/2000/svg"
                                  ><g id="SVGRepo_bgCarrier" stroke-width="0"
                                  ></g><g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    style="fill: none !important;"
                                  ></g><g id="SVGRepo_iconCarrier">
                                    <path
                                      d="M19 9V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.0799 3 8.2 3H13M19 9L13 3M19 9H14C13.4477 9 13 8.55228 13 8V3"
                                      stroke="#000000"
                                      stroke-width="1.416"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      style="fill: none !important;"
                                    ></path>
                                  </g></svg
                                >
                              {/if}
                            </div>
                            <button
                              data-id={Array.from(file_name)[1]}
                              class="navItem"
                              class:unsaved={unsavedFiles[
                                Array.from(file_name)[1]
                              ]}
                              // onclick={(e) => HandleFileClick(e, id)}
                              onclick={(e) =>
                                HandleFileClick(e, Array.from(file_name)[1])}
                              title={`${file_obj.path}\\${Array.from(file_name)[1]}`}
                            >
                              <span>
                                {Array.from(file_name)[1]}
                              </span>
                            </button>
                            <button
                              class="close"
                              aria-label="close"
                              data-name={Array.from(file_name)[1]}
                              onclick={(e) => {
                                CloseFile(e);
                              }}
                            >
                              <svg
                                width="14px"
                                height="14px"
                                viewBox="-0.5 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                ><g id="SVGRepo_bgCarrier" stroke-width="0"
                                ></g><g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g><g id="SVGRepo_iconCarrier">
                                  <path
                                    d="M3 21.32L21 3.32001"
                                    stroke="#000000"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M3 3.32001L21 21.32"
                                    stroke="#000000"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </g></svg
                              >
                            </button>
                          </li>
                        {/each}
                      </ul>
                    {/each}
                  {/each}
                {/if}
              </ul>
            </div>
            <div
              id="settingsMenu"
              class="editCnt"
              class:visible={parametres.settingsMenu}
            >
              <nav id="themeSelection" class="defaultSettNav">
                <button
                  class="baseBtn headerSetNav"
                  onclick={(e) => {
                    e.currentTarget.parentElement?.classList.toggle("hide");
                  }}
                >
                  <h3>Themes</h3>
                  <svg
                    width="14px"
                    height="14px"
                    viewBox="0 0 24 24"
                    style="fill: none !important;"
                    xmlns="http://www.w3.org/2000/svg"
                    ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g><g id="SVGRepo_iconCarrier">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"
                        fill="#000000"
                      ></path>
                    </g></svg
                  >
                </button>
                <div class="selfList">
                  <ul id="lightThemes">
                    <h3>Light Themes</h3>
                    {#each lightThemes.sort((a: string, b: string) => a.charCodeAt(0) - b.charCodeAt(0)) as theme}
                      <li>
                        <div title={theme}>{theme}</div>
                        <button
                          onclick={SetSetting}
                          class="baseBtn"
                          data-sett="theme"
                          class:activeTheme={activeThemeBtn == theme}
                          data-theme={theme}>Set Theme</button
                        >
                      </li>
                    {/each}
                  </ul>
                  <ul id="darkThemes">
                    <h3>Dark Themes</h3>
                    {#each darkThemes.sort((a: string, b: string) => a.charCodeAt(0) - b.charCodeAt(0)) as theme}
                      <li>
                        <div title={theme}>{theme}</div>
                        <button
                          onclick={SetSetting}
                          class="baseBtn"
                          data-sett="theme"
                          class:activeTheme={activeThemeBtn == theme}
                          data-theme={theme}>Set Theme</button
                        >
                      </li>
                    {/each}
                  </ul>
                </div>
              </nav>
              <nav id="editorSelection" class="defaultSettNav">
                <button
                  class="baseBtn headerSetNav"
                  onclick={(e) => {
                    e.currentTarget.parentElement?.classList.toggle("hide");
                  }}
                >
                  <h3>Editor</h3>
                  <svg
                    width="14px"
                    height="14px"
                    viewBox="0 0 24 24"
                    style="fill: none !important;"
                    xmlns="http://www.w3.org/2000/svg"
                    ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g><g id="SVGRepo_iconCarrier">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"
                        fill="#000000"
                      ></path>
                    </g></svg
                  >
                </button>
                <div class="selfList">
                  <ul>
                    <li>
                      <span>Font Family</span>
                      <input
                        type="text"
                        spellcheck="false"
                        value={editorViewStyle.fontFamily}
                        oninput={(e) =>
                          editorViewStyle.setFontFamily(e.currentTarget.value)}
                      />
                    </li>
                    <li>
                      <span>Font Size</span>
                      <input
                        type="number"
                        spellcheck="false"
                        value={parseInt(editorViewStyle.fontSize)}
                        oninput={(e) =>
                          editorViewStyle.setFontSize(
                            Number(e.currentTarget.value),
                          )}
                      />
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div class="editorsContainer">
              <div class="editors">
                {#if Object.entries(files).length == 0}
                  <div class="emptySection">
                    <div class="emptyHeader">
                      <h1>{APP_TITLE}</h1>
                      <small>Reality Studios</small>
                    </div>

                    <ul id="start">
                      <div class="emptyListHeader">
                        <h3>Start</h3>
                      </div>
                      <li>
                        <button onclick={CreateFile}>
                          <div class="icon"></div>
                          <span>New File</span>
                        </button>
                      </li>
                      <li>
                        <button onclick={OpenFile}>
                          <div class="icon"></div>
                          <span>Open File</span>
                        </button>
                      </li>
                      <li>
                        <button onclick={OpenDir}>
                          <div class="icon"></div>
                          <span>Open Folder</span>
                        </button>
                      </li>
                    </ul>
                    <ul id="shortcuts">
                      <div class="emptyListHeader">
                        <h3>Shortcuts</h3>
                      </div>
                      <li>
                        <small class="shortcutName">Open File</small>
                        <div class="shortcutKeys">
                          <code>Ctrl</code> +
                          <code>{shortcutsMap.openFile}</code>
                        </div>
                      </li>
                      <li>
                        <small class="shortcutName">Open Folder</small>
                        <div class="shortcutKeys">
                          <code>Ctrl</code> +
                          <code>{shortcutsMap.openDir}</code>
                        </div>
                      </li>
                      <li>
                        <small class="shortcutName">Create New File</small>
                        <div class="shortcutKeys">
                          <code>Ctrl</code> +
                          <code>{shortcutsMap.createFile}</code>
                        </div>
                      </li>
                      <li>
                        <small class="shortcutName">Navigate files</small>
                        <div class="shortcutKeys">
                          <code>Ctrl</code> +
                          <code>{shortcutsMap.navTabs}</code>
                        </div>
                      </li>
                      <li>
                        <small class="shortcutName">Run Code</small>
                        <div class="shortcutKeys">
                          <code>Ctrl</code> + <code>Alt</code> +
                          <code>{shortcutsMap.runCode}</code>
                        </div>
                      </li>
                      <li>
                        <small class="shortcutName">Save File</small>
                        <div class="shortcutKeys">
                          <code>Ctrl</code> + <code>S</code>
                        </div>
                      </li>
                    </ul>
                  </div>
                {:else}
                  {#each Object.entries(files) as [name, path], id}
                    <CodeEditor
                      filename={name}
                      dataId={name}
                      content={fileContents[name] ?? ""}
                      isActive={name == activeId}
                      themeName={editorTheme.current}
                      onChange={(value) => {
                        HandleEditorOnChange(name, value);
                      }}
                      onFocus={() => (activeId = name)}
                    />
                  {/each}
                {/if}
              </div>
              <div class="footeroverlay"></div>
            </div>
          </div>

          <div class="lastActiveDialog" class:activeDialog={lastFilesActive}>
            <div class="lastActive">
              <ul>
                {#each lastActiveFiles as lastActiveFile, id}
                  <li>
                    <button
                      class="ite"
                      class:activeElem={lastFiles_activeElem == id}
                      onmouseover={() => (lastFiles_activeElem = id)}
                      onfocus={() => {}}
                      title={lastActiveFile}
                    >
                      <div class="fileIcon baseBtn">
                        {#if ICONS[`${lastActiveFile.substring(lastActiveFile.lastIndexOf(".") + 1)}`]}
                          <img
                            src={ICONS[
                              `${lastActiveFile.substring(lastActiveFile.lastIndexOf(".") + 1)}`
                            ]}
                            alt=""
                          />
                        {:else}
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            fill="none"
                            style="fill: none !important;"
                            xmlns="http://www.w3.org/2000/svg"
                            ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              style="fill: none !important;"
                            ></g><g id="SVGRepo_iconCarrier">
                              <path
                                d="M19 9V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.0799 3 8.2 3H13M19 9L13 3M19 9H14C13.4477 9 13 8.55228 13 8V3"
                                stroke="#000000"
                                stroke-width="1.416"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                style="fill: none !important;"
                              ></path>
                            </g></svg
                          >
                        {/if}
                      </div>
                      <span>
                        {lastActiveFile}
                      </span>
                    </button>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </section>
  </div>
  <footer id="pageFooter">
    <div class="details">
      <div class="elem">
        <small
          >{activeFile != undefined
            ? activeFile[1] + "\\" + activeFile[0]
            : ""}</small
        >
      </div>
      <div class="elem right">
        <div class="planguage">
          <small>{lang}</small>
        </div>
        <button
          class="link"
          onclick={() => OpenLink("https://github.com/codeyahya/ace")}
        >
          <small> GitHub </small>
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="var(--sec)"
            ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g><g id="SVGRepo_iconCarrier">
              <title>github</title>
              <rect width="24" height="24" fill="none"></rect>
              <path
                d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"
              ></path>
            </g></svg
          >
        </button>
      </div>
    </div>
  </footer>
</div>

<style>
  @import "../lib/styles/light.css";
  @import "../lib/styles/dark.css";
  @import "../lib/styles/style.css";
</style>
