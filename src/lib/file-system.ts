import { exists, BaseDirectory, readDir, type DirEntry, lstat, type FileInfo } from '@tauri-apps/plugin-fs';

export type FileTree = {
  info: FileData | undefined; // Information about the current file/directory
  nodes: FileTree[];
};

export type FileData = {
  name: string,
  type: string,
  path: string,

  atime: Date | null,
  birthtime: Date | null,

  isDirectory: boolean,
  isFile: boolean,
  isSymlink: boolean,

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
      childTree.info = make_file_data(dir, entry, entry_stat)
      fileTree.nodes.push(childTree);
    } else if (entry.name != "log") {
      // woohoo a file! ADD IT
      fileTree.nodes.push({ nodes: [], info: make_file_data(dir, entry, entry_stat) });
    }
  }

  return fileTree;
}

export function make_file_data(dir: string, entry: DirEntry, entry_stat: FileInfo): FileData {
  return {
    name: entry.name,
    type: get_file_extension(entry.name),
    path: dir,

    atime: entry_stat.atime,
    birthtime: entry_stat.birthtime,

    isDirectory: entry.isDirectory,
    isFile: entry.isFile,
    isSymlink: entry.isSymlink,

    size: entry_stat.size
  }
}

function get_file_extension(name: string) {
  const last_dot_index = name.lastIndexOf(".");
  if (last_dot_index > 0 && last_dot_index < name.length - 1) {
    return name.slice(last_dot_index + 1);
  }
  return "Binary";
}
