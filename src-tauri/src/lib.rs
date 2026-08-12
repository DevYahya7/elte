#![allow(warnings)]

mod modules {
    pub mod cmds;
    pub mod funcs;
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            modules::funcs::init,
            modules::funcs::get_files,
            modules::funcs::add_file,
            modules::funcs::delete_file,
            modules::funcs::open_in_explorer,
            modules::funcs::save_file,
            modules::funcs::read_file_content,
            modules::funcs::open_file,
            modules::funcs::close_file,
            modules::funcs::open_dir,
            modules::cmds::run_code,
            modules::cmds::open_link,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
