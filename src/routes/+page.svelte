<script lang="ts">
  import { event } from "@tauri-apps/api";
  import { invoke } from "@tauri-apps/api/core";
  import { open } from "@tauri-apps/plugin-dialog";
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

  const log = console.log;

  let name = $state("No one");
  let msg = $state("");

  interface FromFile {
    name: string | undefined;
    path: string | undefined;
  }

  async function init() {
    await invoke("init");
  }

  init();

  // Reactive state
  let files = $state<Record<string, string>>({});
  let fileContents = $state<Record<string, string>>({});
  let unsavedFiles = $state<Record<string, boolean>>({});

  let parametres = $state({
    settingsMenu: false,
  });

  let expandExplorer = $state(
    Boolean(localStorage.getItem("expandExplorer")) ?? true,
  );

  let activeId = $state(
    localStorage.getItem("activeId")
      ? Number(localStorage.getItem("activeId"))
      : 0,
  );

  let activeThemeBtn = $state(
    localStorage.getItem("appTheme") ?? appTheme.current,
  );

  async function GreetMe(name: string) {
    msg = await invoke<string>("greet", { name: name });
  }

  async function CreateFile() {
    try {
      const file = {
        path: await open({
          multiple: false,
          directory: true,
        }),
        name: prompt("Enter file name")?.trim(),
      };

      if (!file.name || !file.path) return;

      await invoke("add_file", { file: file, createNew: true });
      await GetFiles();
    } catch (e) {
      console.error("Error opening file:", e);
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

        activeId = Object.entries(files).length - 1;
      }
    } catch (error) {
      alert(error);
    }
  }

  async function CloseFile(e: any, file_name?: string) {
    const fileName = file_name ?? e.currentTarget.dataset.name;
    await invoke("close_file", { fileName: fileName });
    await GetFiles();
  }

  async function GetFiles() {
    const strFiles = await invoke<string>("get_files");
    files = JSON.parse(strFiles);

    // Read content for any new files
    const entries = Object.entries(files);
    for (let i = 0; i < entries.length; i++) {
      const [fileName] = entries[i];
      if (fileContents[fileName] === undefined) {
        await ReadFromFile(i);
        await SaveFile(i);
      }
    }
  }

  async function HandleFileMouseDown(e: MouseEvent, fileName: string) {
    if (e.button == 1) {
      // Middle click: Delete file
      await invoke("delete_file", { fileName: fileName, erase: true });

      // Clean local state
      delete fileContents[fileName];
      delete unsavedFiles[fileName];

      await GetFiles();

      if (activeId >= Object.keys(files).length) {
        activeId = Math.max(0, Object.keys(files).length - 1);
      }
    } else if (e.button == 2) {
      // Right click: Open in explorer
      const filePath = files[fileName];
      await invoke("open_in_explorer", { filePath: filePath });
    }
  }

  async function ReadFromFile(ind?: number) {
    const targetIdx = ind ?? activeId;
    const file = Object.entries(files)[targetIdx];
    if (!file) return;

    const [fileName] = file;
    const content: string = await invoke("read_file_content", { file: file });

    fileContents = {
      ...fileContents,
      [fileName]: content,
    };
  }

  function HandleFileClick(e: any, id: number) {
    activeId = id;
    if (!e.currentTarget.classList.contains("loaded")) {
      e.currentTarget.classList.add("loaded");
      ReadFromFile();
    }
  }

  async function SaveFile(ind?: number) {
    const entries = Object.entries(files);
    let id = ind ?? activeId;
    const file = entries[id];
    if (!file) return;

    const [fileName] = file;
    const content = fileContents[fileName] ?? "";

    await invoke("save_file", { file: file, content: content });
    unsavedFiles[fileName] = false;
  }

  async function RunCode() {
    await SaveFile();
    const file = Object.entries(files)[activeId];
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

    const file = Object.entries(files)[activeId];
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

  function SwitchTabs(mode: "increment" | "decrement") {
    if (mode == "increment") {
      activeId < Object.entries(files).length - 1
        ? (activeId += 1)
        : (activeId = 0);
    } else {
      activeId > 0
        ? (activeId -= 1)
        : (activeId = Object.entries(files).length - 1);
    }

    log(mode);
  }

  Update();
  Ready();

  // let appTitle = $derived(Object.keys(files)[activeId] ?? "ELTE");

  document.body.oncontextmenu = (e) => {
    e.preventDefault();
  };

  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key.toLowerCase() === "s") {
        e.preventDefault();
        SaveFile();
      }
    }

    if (e.ctrlKey || e.metaKey) {
      if (e.altKey) {
        if (e.key.toLowerCase() === "n") {
          e.preventDefault();
          RunCode();
        }
      }
    }

    if (e.ctrlKey || e.metaKey) {
      if (e.key.toLowerCase() === "b") {
        e.preventDefault();
        ExpandExplorer();
      }
    }

    if (e.ctrlKey || e.metaKey) {
      if (e.key.toLowerCase() === "r") {
        // e.preventDefault();
      }
    }

    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      e.key.toLowerCase() === "tab"
    ) {
      e.preventDefault();
      SwitchTabs("decrement");
      log("hello");
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "tab") {
      e.preventDefault();
      SwitchTabs("increment");
      log("hello");
    }
  });

  window.addEventListener("beforeunload", (e) => {
    if (Object.values(unsavedFiles).some((isUnsaved) => isUnsaved)) {
      e.preventDefault();
    }
  });

  $effect(() => {
    localStorage.setItem("activeId", String(activeId));
    localStorage.setItem("expandExplorer", String(expandExplorer));

    activeThemeBtn = appTheme.current;
  });
</script>

<svelte:head>
  <!-- <title>{appTitle}</title> -->
</svelte:head>

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

        <div class="editorArea">
          <div
            id="fileTreeContainer"
            class="editCnt"
            class:visibleCnt={!expandExplorer}
          >
            <ul id="filesTree">
              {#each Object.entries(files) as [name, path], id}
                <li class:active={id == activeId}>
                  <button
                    data-id={name}
                    class="navItem"
                    class:unsaved={unsavedFiles[name]}
                    onclick={(e) => HandleFileClick(e, id)}
                    onmousedown={(e) => HandleFileMouseDown(e, name)}
                    title={`${path}\\${name}`}
                  >
                    <div class="fileIcon">
                      <svg
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g><g id="SVGRepo_iconCarrier">
                          <path
                            d="M19 9V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.0799 3 8.2 3H13M19 9L13 3M19 9H14C13.4477 9 13 8.55228 13 8V3"
                            stroke="#000000"
                            stroke-width="1.416"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </g></svg
                      >
                    </div>
                    <span> {name} </span>
                  </button>
                  <button
                    class="close"
                    aria-label="close"
                    onclick={(e) => {
                      CloseFile(e);
                    }}
                    data-name={name}
                  >
                    <svg
                      width="14px"
                      height="14px"
                      viewBox="-0.5 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
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
                  {#each lightThemes as theme}
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
                  {#each darkThemes as theme}
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
                      onchange={(e) =>
                        editorViewStyle.setFontFamily(e.currentTarget.value)}
                    />
                  </li>
                  <li>
                    <span>Font Size</span>
                    <input
                      type="number"
                      spellcheck="false"
                      value={parseInt(editorViewStyle.fontSize)}
                      onchange={(e) =>
                        editorViewStyle.setFontSize(
                          Number(e.currentTarget.value),
                        )}
                    />
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div class="editors">
            {#each Object.entries(files) as [name, path], id}
              <CodeEditor
                filename={name}
                content={fileContents[name] ?? ""}
                isActive={id == activeId}
                themeName={editorTheme.current}
                onChange={(value) => {
                  HandleEditorOnChange(name, value);
                }}
                onFocus={() => (activeId = id)}
              />
            {/each}
          </div>
        </div>
      </main>
    </section>
  </div>
</div>

<style>
  @import "../lib/styles/light.css";
  @import "../lib/styles/dark.css";
  @import "../lib/styles/style.css";
</style>
