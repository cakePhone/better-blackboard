import { BaseDirectory, create, exists, FileHandle, mkdir, readTextFile, open } from "@tauri-apps/plugin-fs";
import { info, error } from "@tauri-apps/plugin-log";
import type { FileTree } from "./file-system";

const app_cache_dir: { baseDir: BaseDirectory } = { baseDir: BaseDirectory.AppCache }

/**
 * Reads a cache file with file_name, must be JSON
 * @param file_name string - the file_name to store config, must be JSON
  */
export async function read_cache(file_name: string): Promise<object | undefined> {
  try {
    const cache_exists = await exists(file_name, app_cache_dir);

    if (cache_exists) {
      const cache_file = await readTextFile(file_name, app_cache_dir);
      const parsed_cache = JSON.parse(cache_file);

      return parsed_cache as FileTree;
    } else {
      create_cache_file(file_name, {})
      return undefined;
    }
  } catch (err) {
    error(`Error reading app cache: ${err}`);
    return undefined
  }
}

/**
 * Writes an object to the specified cache file as json
 */
export async function write_cache_file(file_name: string, content: object): Promise<void> {
  try {
    const cache_file: FileHandle = await create(file_name, app_cache_dir)

    await cache_file.write(new TextEncoder().encode(JSON.stringify(content)))
    await cache_file.close();
  } catch (err) {
    error(`Failed to write cache file: ${err}`)
    throw err
  }
}

export async function create_cache_file(file_name: string, content: {}): Promise<void> {
  try {
    const dir_exists = await exists("", app_cache_dir);
    if (!dir_exists) {
      await mkdir("", app_cache_dir)
    }
    const cache_file: FileHandle = await create(file_name, app_cache_dir)
    await write_cache_file(file_name, content)

    info(`Created ${file_name}`)
  } catch (err) {
    error(`Failed to make cache: ${err}`)
  }
}

