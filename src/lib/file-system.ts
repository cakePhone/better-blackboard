import { BaseDirectory, readDir, type DirEntry, lstat, type FileInfo, readTextFile } from '@tauri-apps/plugin-fs';
import { info } from '@tauri-apps/plugin-log';

export type FileTree = {
  info: FileData | undefined; // Information about the current file/directory
  nodes: FileTree[];
};

export type FileData = {
  name: string,
  type: string,
  path: string,
  links_to: string | undefined,

  atime: Date | null,
  birthtime: Date | null,

  isDirectory: boolean,
  isFile: boolean,
  isSymlink: boolean,
  isLink: boolean,
  isUltraDocumentBody: boolean,

  size: number,
}

export async function make_file_tree(dir: string): Promise<FileTree> {
  const entries: DirEntry[] = await readDir(dir, { baseDir: BaseDirectory.Document });

  const fileTree: FileTree = { info: undefined, nodes: [] };

  for (const entry of entries) {
    const entry_stat = await lstat(`${dir}/${entry.name}`, { baseDir: BaseDirectory.Document })
    if (entry.isDirectory && entry.name != "log") {
      // move into and recurse dir
      const childTree = await make_file_tree(dir + `/${entry.name}`);
      childTree.info = await make_file_data(dir, entry, entry_stat)
      fileTree.nodes.push(childTree);
    } else if (entry.name != "log") {
      // woohoo a file! ADD IT
      fileTree.nodes.push({ nodes: [], info: await make_file_data(dir, entry, entry_stat) });
    }
  }

  return fileTree;
}

export async function make_file_data(dir: string, entry: DirEntry, entry_stat: FileInfo): Promise<FileData> {
  const file_extension: string = get_file_extension(entry.name, entry.isDirectory)
  const link_info: { is_link: boolean, links_to: string | undefined } = await check_is_ink(`${dir}/${entry.name}`, file_extension)

  return {
    name: entry.name.replace(/\[.*?\]/g, ''), // remove year and course information from title
    type: file_extension,
    path: dir,
    links_to: link_info.links_to,

    atime: entry_stat.atime,
    birthtime: entry_stat.birthtime,

    isDirectory: entry.isDirectory,
    isFile: entry.isFile,
    isSymlink: entry.isSymlink,
    isLink: link_info.is_link,
    isUltraDocumentBody: entry.name == "ultraDocumentBody",

    size: entry_stat.size
  }
}

async function check_is_ink(file: string, type: string): Promise<{ is_link: boolean, links_to: string | undefined }> {
  if (type != "Binary") return { is_link: false, links_to: undefined }

  const file_contents: string = await readTextFile(file, { baseDir: BaseDirectory.Document })

  const lines = file_contents.split('\n');
  for (const line of lines) {
    if (line.startsWith("URL[$e]=")) {
      // Extract the URL from the line
      let url = line.replace("URL[$e]=", "");
      info("Found link: " + file + " : " + url?.toString())
      if (url) {
        // append http if there isn't

        if (url) {
          // append http if there isn't
          url = !url.startsWith("https://") && !url.startsWith("http://") ? `https://${url}` : url;
        }
        return { is_link: true, links_to: url };
      }
    }
  }

  info("Not a link: " + file)

  return { is_link: false, links_to: undefined };
}

function get_file_extension(name: string, is_dir: boolean) {
  if (is_dir) return "Directory"

  const last_dot_index = name.lastIndexOf(".");
  if (last_dot_index > 0 && last_dot_index < name.length - 1) {
    return name.slice(last_dot_index + 1);
  }
  return "Binary";
}
