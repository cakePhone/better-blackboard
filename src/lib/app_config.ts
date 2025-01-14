
import { BaseDirectory, create, exists, mkdir, readTextFile } from "@tauri-apps/plugin-fs";
import { info, error } from "@tauri-apps/plugin-log";
import { parse, stringify } from "smol-toml"

const app_config_dir: { baseDir: BaseDirectory } = { baseDir: BaseDirectory.AppConfig }

export type AppConfig = {
  blackboard_download_dir: string;
};

export async function read_app_config(): Promise<AppConfig> {
  try {
    const config_exists = await exists("config.toml", app_config_dir);

    if (config_exists) {
      const config_file = await readTextFile("config.toml", app_config_dir);
      const parsed_config = parse(config_file);

      info(`Parsed config: \n${stringify(parsed_config)}`);

      return parsed_config as AppConfig;
    } else {
      const config = await create_config();
      return config;
    }
  } catch (err) {
    error(`Error reading app config: ${err}`);
    throw err;
  }
}

export async function create_config(): Promise<AppConfig> {
  try {
    const default_config: AppConfig = {
      blackboard_download_dir: "BlackBoard",
    };

    const config_dir_exists = await exists("", app_config_dir)

    if (!config_dir_exists) {
      // create config dir
      await mkdir("", app_config_dir)
    }

    const config_text = `#path relative to document directory\n${stringify(default_config)}`;
    const config_file = await create("config.toml", app_config_dir);

    await config_file.write(new TextEncoder().encode(config_text))
    await config_file.close()

    info(`Created config file with default values: ${stringify(default_config)}`);

    return default_config
  } catch (err) {
    error(`Error creating app config: ${err}`);
    throw err;
  }
}

