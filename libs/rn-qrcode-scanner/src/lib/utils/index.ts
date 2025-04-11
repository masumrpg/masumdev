/* eslint-disable @typescript-eslint/no-explicit-any */
type ModuleMap = {
  [key: string]: any;
};

/**
 * Dynamic import helper with safe fallback if module not installed.
 *
 * @param moduleName Name of the module to import (e.g. "expo-haptics")
 * @param exportName Name of the export you want from the module
 * @returns The exported function or `undefined` if import fails
 */
export async function lazyImport<T extends ModuleMap>(
  moduleName: string,
  exportName?: keyof T
): Promise<any | undefined> {
  try {
    const mod: T = await import(moduleName);
    return exportName ? mod[exportName] : mod;
  } catch (error) {
    console.warn(`[lazyImport] Failed to load module "${moduleName}"`, error);
    return undefined;
  }
}
