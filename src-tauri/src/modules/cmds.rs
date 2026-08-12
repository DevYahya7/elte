use std::{
    collections::HashMap,
    ffi::OsString,
    fs::{self, create_dir_all, read_dir, read_to_string, remove_file, File, OpenOptions},
    io::{BufRead, BufReader, BufWriter, Write},
    path::{Path, PathBuf},
    process::Command,
};

static cmd_start: [&str; 8] = [
    "/c",
    "start",
    "powershell",
    "-NoExit",
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-Command",
];

#[tauri::command]
pub fn run_code(file: [&str; 2]) -> Result<(), String> {
    let file_dir = file[1]; // Directory (e.g., "C:/Users/HP/Documents/Dw")
    let file_name = file[0]; // Full filename (e.g., "app2.py")

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
    // The "powershell" argument tells cmd to open PowerShell inside that new window.
    // "-NoExit" is added so the window stays open after execution, letting you see the result/errors!

    match ext.as_str() {
        // ─────────────────────────────────────────────
        // Scripting / interpreted languages
        // ─────────────────────────────────────────────
        ".py" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!("python -u '{}'", file_name))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        ".js" | ".ts" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!("node '{}'", file_name))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        ".php" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!("php '{}'", file_name))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        ".rb" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!("ruby '{}'", file_name))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        ".lua" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!("lua '{}'", file_name))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        ".go" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!("go run '{}'", file_name))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        ".dart" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!("dart run '{}'", file_name))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        // ─────────────────────────────────────────────
        // Java
        // ─────────────────────────────────────────────
        ".java" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!(
                    "javac '{}' ; java '{}'",
                    file_name, file_name_without_ext
                ))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        // ─────────────────────────────────────────────
        // C
        // ─────────────────────────────────────────────
        ".c" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!(
                    "gcc '{}' -o '{}.exe' ; ./{}.exe",
                    file_name, file_name_without_ext, file_name_without_ext
                ))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        // ─────────────────────────────────────────────
        // C++
        // ─────────────────────────────────────────────
        ".cpp" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!(
                    "g++ '{}' -o '{}.exe' ; ./{}.exe",
                    file_name, file_name_without_ext, file_name_without_ext
                ))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        // ─────────────────────────────────────────────
        // C#
        // ─────────────────────────────────────────────
        ".cs" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg("dotnet run")
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        // ─────────────────────────────────────────────
        // Rust
        // ─────────────────────────────────────────────
        ".rs" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!(
                    "rustc '{}' -o '{}.exe' ; ./{}.exe",
                    file_name, file_name_without_ext, file_name_without_ext
                ))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        // ─────────────────────────────────────────────
        // Kotlin
        // ─────────────────────────────────────────────
        ".kt" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!(
                    "kotlinc '{}' -include-runtime -d '{}.jar' ; java -jar '{}.jar'",
                    file_name, file_name_without_ext, file_name_without_ext
                ))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        // ─────────────────────────────────────────────
        // Swift
        // ─────────────────────────────────────────────
        ".swift" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!(
                    "swiftc '{}' -o '{}.exe' ; '{}.exe'",
                    file_name, file_name_without_ext, file_name_without_ext
                ))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        // ─────────────────────────────────────────────
        // Zig
        // ─────────────────────────────────────────────
        ".zig" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!("zig run '{}'", file_name))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        // ─────────────────────────────────────────────
        // Bash / Shell
        // ─────────────────────────────────────────────
        ".sh" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!("bash '{}'", file_name))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        // ─────────────────────────────────────────────
        // PowerShell
        // ─────────────────────────────────────────────
        ".ps1" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!(
                    "powershell -ExecutionPolicy Bypass -File '{}'",
                    file_name
                ))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        // ─────────────────────────────────────────────
        // HTML
        // ─────────────────────────────────────────────
        ".html" | ".htm" => {
            Command::new("cmd")
                .current_dir(file_dir)
                .args(cmd_start)
                .arg(format!("start '{}'", file_name))
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        // ─────────────────────────────────────────────
        // SQL
        // ─────────────────────────────────────────────
        ".sql" => {
            return Err("Les fichiers SQL nécessitent un moteur de base de données \
             (SQLite, MySQL, PostgreSQL, etc.)."
                .to_string());
        }

        // ─────────────────────────────────────────────
        // Non-executable / data / markup languages
        // ─────────────────────────────────────────────
        ".css" => {
            return Err("Les fichiers CSS ne sont pas exécutables seuls.".to_string());
        }

        ".json" => {
            return Err(
                "Les fichiers JSON sont des fichiers de données, pas des programmes exécutables."
                    .to_string(),
            );
        }

        ".yaml" | ".yml" => {
            return Err(
            "Les fichiers YAML sont des fichiers de configuration/données, pas des programmes exécutables."
                .to_string()
        );
        }

        ".toml" => {
            return Err(
            "Les fichiers TOML sont des fichiers de configuration, pas des programmes exécutables."
                .to_string()
        );
        }

        ".graphql" | ".gql" => {
            return Err(
                "Les fichiers GraphQL nécessitent un serveur/client GraphQL pour être exécutés."
                    .to_string(),
            );
        }

        // ─────────────────────────────────────────────
        // Algorithmique
        // ─────────────────────────────────────────────
        ".algo" => {
            return Err(
                "Les algorithmes pseudo-code ne sont pas directement exécutables.".to_string(),
            );
        }

        _ => {
            return Err(format!("Extension '{}' non supportée.", ext));
        }
    }
    Ok(())
}

#[tauri::command]
pub fn open_link(link: String) {
    let cmd = Command::new("cmd")
        .args(cmd_start)
        .arg(format!("start {}", link))
        .spawn()
        .map_err(|e| e.to_string());
}
