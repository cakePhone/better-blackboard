import { BaseDirectory, create, exists, FileHandle, mkdir, readTextFile, open } from "@tauri-apps/plugin-fs";
import { info, error } from "@tauri-apps/plugin-log";
import type { FileTree } from "./file-system";

const app_cache_dir: { baseDir: BaseDirectory } = { baseDir: BaseDirectory.AppCache }

export async function read_class_cache(): Promise<FileTree | undefined> {
  try {
    const cache_exists = await exists("class_cache.json", app_cache_dir);

    if (cache_exists) {
      const cache_file = await readTextFile("class_cache.json", app_cache_dir);
      const parsed_cache = JSON.parse(cache_file);

      return parsed_cache as FileTree;
    } else {
      create_cache()
      return undefined;
    }
  } catch (err) {
    error(`Error reading app cache: ${err}`);
    return undefined
  }
}

export async function write_class_cache(cache: FileTree): Promise<void> {
  try {
    const cache_file: FileHandle = await create("class_cache.json", app_cache_dir)

    await cache_file.write(new TextEncoder().encode(JSON.stringify(cache)))
    await cache_file.close();
  } catch (err) {
    error(`Failed to write cache file: ${err}`)
    throw err
  }
}

export async function create_cache(): Promise<void> {
  try {
    const dir_exists = await exists("", app_cache_dir);
    if (!dir_exists) {
      await mkdir("", app_cache_dir)
    }
    await create("class_cache.json", app_cache_dir)

    info("Created class_cache.json")
  } catch (err) {
    error(`Failed to make cache: ${err}`)
  }
}

