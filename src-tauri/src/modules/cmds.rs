use std::{
    collections::HashMap,
    ffi::OsString,
    fs::{self, create_dir_all, read_dir, read_to_string, remove_file, File, OpenOptions},
    io::{BufRead, BufReader, BufWriter, Write},
    os::windows::process::CommandExt,
    path::{Path, PathBuf},
    process::Command,
};

static cmd_start: [&str; 7] = [
    "/c",
    "start",
    "pwsh",
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-Command",
];

fn ps_quote(value: &str) -> String {
    format!("'{}'", value.replace('\'', "''"))
}

fn ps_invoke(path: &str) -> String {
    format!("& {}", ps_quote(path))
}

fn validate_path_part(value: &str, label: &str) -> Result<(), String> {
    if value.contains('\0') || value.contains('\n') || value.contains('\r') {
        return Err(format!("Invalid {}: contains control characters.", label));
    }
    Ok(())
}

const CLOSE_ON_KEYPRESS: &str = "Write-Host \"`nPress any key to close...\" -ForegroundColor DarkGray ; $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')";

fn spawn_in_terminal(file_dir: &str, script: &str) -> Result<(), String> {
    let full_script = format!("{} ; {}", script, CLOSE_ON_KEYPRESS);
    Command::new("cmd")
        .current_dir(file_dir)
        .args(cmd_start)
        .arg(full_script)
        .spawn()
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn run_code(file: [&str; 2]) -> Result<(), String> {
    let file_dir = file[1]; // Directory (e.g., "C:/Users/HP/Documents/Dw")
    let file_name = file[0]; // Full filename (e.g., "app2.py")

    validate_path_part(file_dir, "directory")?;
    validate_path_part(file_name, "file name")?;

    // Safely extract the filename without its extension
    let path_obj = Path::new(file_name);
    let file_name_without_ext = path_obj
        .file_stem()
        .and_then(|s| s.to_str())
        .unwrap_or(file_name);

    // Extract the extension (e.g., ".py")
    let ext = path_obj
        .extension()
        .and_then(|s| s.to_str())
        .map(|s| format!(".{}", s))
        .unwrap_or_else(|| "".to_string());

    // We use cmd /c start to pop up a brand new, visible window.
    // The "pwsh" argument tells cmd to open PowerShell inside that new window.
    // "-NoExit" is added so the window stays open after execution, letting you see the result/errors!

    // Every filename/stem below is escaped with ps_quote (or invoked
    // with ps_invoke) before it touches the command string — no raw
    // interpolation left anywhere in this match.
    let q_name = ps_quote(file_name);
    let q_stem = ps_quote(file_name_without_ext);
    let exe_name = format!("{}.exe", file_name_without_ext);
    let jar_name = format!("{}.jar", file_name_without_ext);

    match ext.as_str() {
        // ─────────────────────────────────────────────
        // Scripting / interpreted languages
        // ─────────────────────────────────────────────
        ".py" => spawn_in_terminal(file_dir, &format!("python -u {}", q_name))?,
        ".js" | ".ts" => spawn_in_terminal(file_dir, &format!("node {}", q_name))?,
        ".php" => spawn_in_terminal(file_dir, &format!("php {}", q_name))?,
        ".rb" => spawn_in_terminal(file_dir, &format!("ruby {}", q_name))?,
        ".lua" => spawn_in_terminal(file_dir, &format!("lua {}", q_name))?,
        ".go" => spawn_in_terminal(file_dir, &format!("go run {}", q_name))?,
        ".dart" => spawn_in_terminal(file_dir, &format!("dart run {}", q_name))?,

        // ─────────────────────────────────────────────
        // Java
        // ─────────────────────────────────────────────
        ".java" => spawn_in_terminal(file_dir, &format!("javac {} ; java {}", q_name, q_stem))?,

        // ─────────────────────────────────────────────
        // C
        // ─────────────────────────────────────────────
        ".c" => spawn_in_terminal(
            file_dir,
            &format!(
                "gcc {} -o {} ; {}",
                q_name,
                ps_quote(&exe_name),
                ps_invoke(&format!("./{}", exe_name))
            ),
        )?,

        // ─────────────────────────────────────────────
        // C++
        // ─────────────────────────────────────────────
        ".cpp" => spawn_in_terminal(
            file_dir,
            &format!(
                "g++ {} -o {} ; {}",
                q_name,
                ps_quote(&exe_name),
                ps_invoke(&format!("./{}", exe_name))
            ),
        )?,

        // ─────────────────────────────────────────────
        // C#
        // ─────────────────────────────────────────────
        // Note: this ignores `file_name` entirely, same as the original —
        // `dotnet run` runs whatever project is in `file_dir`. Not a
        // security issue (the string is a fixed literal), just a
        // pre-existing behavior gap worth knowing about.
        ".cs" => spawn_in_terminal(file_dir, "dotnet run")?,

        // ─────────────────────────────────────────────
        // Rust
        // ─────────────────────────────────────────────
        ".rs" => spawn_in_terminal(
            file_dir,
            &format!(
                "rustc {} -o {} ; {}",
                q_name,
                ps_quote(&exe_name),
                ps_invoke(&format!("./{}", exe_name))
            ),
        )?,

        // ─────────────────────────────────────────────
        // Kotlin
        // ─────────────────────────────────────────────
        ".kt" => spawn_in_terminal(
            file_dir,
            &format!(
                "kotlinc {} -include-runtime -d {} ; java -jar {}",
                q_name,
                ps_quote(&jar_name),
                ps_quote(&jar_name)
            ),
        )?,

        // ─────────────────────────────────────────────
        // Swift
        // ─────────────────────────────────────────────
        ".swift" => spawn_in_terminal(
            file_dir,
            &format!(
                "swiftc {} -o {} ; {}",
                q_name,
                ps_quote(&exe_name),
                ps_invoke(&format!("./{}", exe_name))
            ),
        )?,

        // ─────────────────────────────────────────────
        // Zig
        // ─────────────────────────────────────────────
        ".zig" => spawn_in_terminal(file_dir, &format!("zig run {}", q_name))?,

        // ─────────────────────────────────────────────
        // Bash / Shell
        // ─────────────────────────────────────────────
        ".sh" => spawn_in_terminal(file_dir, &format!("bash {}", q_name))?,

        // ─────────────────────────────────────────────
        // PowerShell
        // ─────────────────────────────────────────────
        ".ps1" => spawn_in_terminal(
            file_dir,
            &format!("powershell -ExecutionPolicy Bypass -File {}", q_name),
        )?,

        ".asm" => {
            let obj_name = format!("{}.obj", file_name_without_ext);
            spawn_in_terminal(
                file_dir,
                &format!(
                    "nasm -f win64 {} -o {} ; gcc {} -o {} ; {}",
                    q_name,
                    ps_quote(&obj_name),
                    ps_quote(&obj_name),
                    ps_quote(&exe_name),
                    ps_invoke(&format!("./{}", exe_name))
                ),
            )?
        }

        // ─────────────────────────────────────────────
        // HTML
        // ─────────────────────────────────────────────
        ".html" | ".htm" => spawn_in_terminal(file_dir, &format!("start {}", q_name))?,

        // ─────────────────────────────────────────────
        // SQL
        // ─────────────────────────────────────────────
        ".sql" => {
            return Err(
                "SQL files require a database engine (SQLite, MySQL, PostgreSQL, etc.) and can't be run directly."
                    .to_string(),
            );
        }

        // ─────────────────────────────────────────────
        // Non-executable / data / markup languages
        // ─────────────────────────────────────────────
        ".css" => {
            return Err("CSS files aren't executable on their own.".to_string());
        }

        ".json" => {
            return Err("JSON files are data files, not executable programs.".to_string());
        }

        ".yaml" | ".yml" => {
            return Err(
                "YAML files are configuration/data files, not executable programs.".to_string(),
            );
        }

        ".toml" => {
            return Err("TOML files are configuration files, not executable programs.".to_string());
        }

        ".graphql" | ".gql" => {
            return Err("GraphQL files require a GraphQL server/client to run.".to_string());
        }

        // ─────────────────────────────────────────────
        // Pseudo-code
        // ─────────────────────────────────────────────
        ".algo" => {
            return Err("Pseudo-code algorithm files aren't directly executable.".to_string());
        }

        _ => {
            return Err(format!("Extension '{}' is not supported.", ext));
        }
    }
    Ok(())
}

#[tauri::command]
pub fn open_link(link: String) -> Result<(), String> {
    // Allow-list http(s) only — this command is meant for "open this URL
    // in a browser," not "run an arbitrary command," so anything else is
    // rejected outright rather than trusted to ps_quote alone.
    if !(link.starts_with("http://") || link.starts_with("https://")) {
        return Err("Only http:// or https:// links can be opened.".to_string());
    }
    validate_path_part(&link, "link")?;

    spawn_in_terminal(".", &format!("start {}", ps_quote(&link)))
}
