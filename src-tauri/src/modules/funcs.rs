use std::{
    collections::HashMap,
    ffi::OsString,
    fs::{self, create_dir_all, read_dir, read_to_string, remove_file, File, OpenOptions},
    io::{BufRead, BufReader, BufWriter, Write},
    process::Command,
};

use indexmap::IndexMap;
use serde::{Deserialize, Serialize};
use serde_json::{self, json, to_string_pretty, to_writer_pretty};
use std::path::{Path, PathBuf};
use tauri::utils::config::parse;
use tauri::{AppHandle, Manager};

#[derive(Serialize, Deserialize, Debug)]
pub struct FromFile {
    name: String,
    path: String,
}

type FileMap = IndexMap<String, String>;

fn get_config_path(app: &AppHandle, config_file: &str) -> Result<PathBuf, String> {
    let mut path = app.path().app_data_dir().map_err(|e| e.to_string())?;
    // Ensure directory exists on disk (e.g. AppData/Roaming/your-app/)
    if !path.exists() {
        fs::create_dir_all(&path).map_err(|e| e.to_string())?;
    }

    path.push(config_file);
    Ok(path)
}

#[tauri::command]
pub fn init(app: AppHandle) -> Result<(), String> {
    let p = get_config_path(&app, "files.json")?;
    println!("{}", p.to_string_lossy().into_owned());
    Ok(())
}

#[tauri::command]
pub fn open_dir(app: AppHandle, path: String) -> Result<(), String> {
    let target_path = Path::new(&path);

    let entries = read_dir(target_path).map_err(|e| e.to_string())?;
    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;
        let file_name = entry.file_name();
        let file_path = Path::new(&path);
        let file = FromFile {
            name: file_name.to_string_lossy().into_owned(),
            path: file_path.to_string_lossy().into_owned(),
        };

        // println!("FILE: {} | PATH: {}", file.name, file.path);
        add_file(app.clone(), file, false);
    }

    Ok(())
}

#[tauri::command]
pub fn get_files(app: AppHandle) -> Result<String, String> {
    let files_path = get_config_path(&app, "files.json").map_err(|e| e.to_string())?;

    let file = read_to_string(files_path).map_err(|e| e.to_string())?;
    // println!("{}", file);
    Ok(file)
}

#[tauri::command]
pub fn add_file(app: AppHandle, file: FromFile, create_new: bool) -> Result<(), String> {
    let target_path = Path::new(&file.path).join(&file.name);

    // println!("target {:?}", target_path);

    if let Some(parent) = target_path.parent() {
        if !parent.exists() {
            create_dir_all(parent).map_err(|e| e.to_string())?;
        }
    }

    if create_new {
        let _new_file = File::create(&target_path).map_err(|e| e.to_string())?;
    } else {
        let _open_file = File::open(&target_path).map_err(|e| e.to_string())?;
    }

    let files = get_config_path(&app, "files.json")?;
    let content = read_to_string(&files).unwrap_or_default();
    let mut saved_files: FileMap = serde_json::from_str(&content).unwrap_or_default();

    if let Some(file_path) = saved_files.get(&file.name) {
        return Err(format!("File '{}\\{}' already exists in directory", file_path, &file.name));
    }

    saved_files.insert(file.name, file.path);

    write_to_files(&app, &mut saved_files);

    Ok(())
}

#[tauri::command]
pub fn open_file(app: AppHandle, file_path: String, file_name: String) -> Result<(), String> {
    let new_file: FromFile = FromFile {
        name: file_name,
        path: file_path,
    };

    let new_file_arr: [&str; 2] = [&new_file.name, &new_file.path];
    add_file(app, new_file, false)
}

#[tauri::command]
pub fn close_file(app: AppHandle, file_name: String) -> Result<(), String> {
    delete_file(app, &file_name, false);

    Ok(())
}

#[tauri::command]
pub fn delete_file(app: AppHandle, file_name: &str, erase: bool) -> Result<(), String> {
    // let content = read_to_string(saved_files_path).unwrap_or_default();
    let files_file = get_config_path(&app, "files.json")?;
    let content = read_to_string(&files_file).unwrap_or_default();
    let mut saved_files: FileMap = serde_json::from_str(&content).unwrap_or_default();

    if erase {
        // let file_path = saved_files.get(file_name).unwrap();
        if let Some(file_path) = saved_files.get(file_name) {
            let full_path = Path::new(file_path).join(file_name);
            let _ = remove_file(full_path);
        }
    }
    // println!("{}", file_path);
    // remove_file(format!("{}\\{}", file_path, file_name));
    saved_files.remove(file_name);

    write_to_files(&app, &mut saved_files);

    Ok(())
}

fn write_to_files(app: &AppHandle, saved_files: &mut FileMap) -> Result<(), String> {
    let files = get_config_path(&app, "files.json")?;
    let json_str = to_string_pretty(&saved_files).map_err(|e| e.to_string())?;

    // to_writer_pretty(&mut writer, &json_str).map_err(|e| e.to_string())?;
    fs::write(files, json_str).map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn read_file_content(file: [&str; 2]) -> String {
    let file_path = Path::new(file[1]).join(file[0]);
    let content = read_to_string(file_path);

    match content {
        Ok(val) => val,
        Err(e) => {
            println!("{}", e.to_string());
            String::new()
        }
    }
}

#[tauri::command]
pub fn open_in_explorer(file_path: &str) -> Result<(), String> {
    let cmd = Command::new("powershell")
        .args(["explorer", file_path])
        .output()
        .map_err(|e| e.to_string())?;

    // println!("{}", file_path);
    // println!("{}", cmd.status);
    Ok(())
}

#[tauri::command]
pub fn save_file(file: [&str; 2], content: &str) -> Result<(), String> {
    let file_path = Path::new(&file[1]).join(&file[0]);
    // println!("{:?}", file_path);
    fs::write(file_path, content).map_err(|e| e.to_string())?;
    // println!("SAVED");
    Ok(())
}