use tauri::WebviewWindowBuilder;
use tauri::Emitter;
use tauri::WebviewUrl;

#[tauri::command]
fn open_login_window(app_handle: tauri::AppHandle) {
    let webview = WebviewWindowBuilder::new(
        &app_handle.clone(),
        "login",
        WebviewUrl::External("https://elearning.uminho.pt".parse().unwrap()),
    )
    .on_navigation(move |url| {
        println!("Navigated to: {}", url);
        app_handle.emit("url-change", url.clone()).unwrap();
        true // Allow navigation
    })
    .build()
    .expect("Failed to create webview window");
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![open_login_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
