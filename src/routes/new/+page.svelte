<script lang="ts">
  import CodeEditor from "$lib/components/CodeEditor.svelte";
  import {
    lightThemes,
    darkThemes,
    editorTheme,
    appTheme,
    Update,
  } from "$lib/utils.svelte";
  import { invoke } from "@tauri-apps/api/core";
  import { page } from "$app/state";

  const log = console.log;

  let filePath_static = $derived(page.url.searchParams.get("path"));
  let filePath = $state("");
  let fileName = $state("");
  let content = $state("");
  let unsaved = $state(true);

  async function SaveFile() {
    await invoke("save_file", { file: [fileName, filePath], content: content });
    unsaved = false;
  }

  async function RunCode() {
    await SaveFile();
    await invoke("run_code", { file: [fileName, filePath] });
  }

  async function ReadFromFile() {
    content = await invoke("read_file_content", {
      file: [fileName, filePath],
    });
  }

  function HandleOnChange(val: string) {
    content = val;
    unsaved = true;
  }

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
  });

  window.addEventListener("beforeunload", (e) => {
    if (Object.values(unsaved).some((isUnsaved) => isUnsaved)) {
      e.preventDefault();
    }
  });

  Update();

  $effect(() => {
    if (filePath_static) {
      fileName = filePath_static.substring(
        filePath_static.lastIndexOf("\\") + 1,
      );
      filePath = filePath_static.substring(
        0,
        filePath_static.lastIndexOf("\\"),
      );
      ReadFromFile();
    }
  });
</script>

<div id="container">
  <div class="content">
    <section class="editor">
      <main>
        <div class="editorArea">
          <div class="editors">
            <div class="editorArea">
              <div class="editors">
                <CodeEditor
                  filename={fileName}
                  // content={file.content ?? ""}
                  {content}
                  isActive={true}
                  themeName={editorTheme.current}
                  onChange={(val) => {
                    HandleOnChange(val);
                  }}
                />
                <!-- <iframe
                  src="../"
                  title="Editor View"
                  frameborder="0"
                  style="width: 100%; height: 100%; border: none;"
                ></iframe> -->
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  </div>
</div>

<style>
  @import "../../lib/styles/light.css";
  @import "../../lib/styles/dark.css";
  @import "../../lib/styles/style.css";
</style>
