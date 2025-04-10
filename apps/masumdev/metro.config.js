const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all files in the monorepo
config.watchFolders = [workspaceRoot];

// Add workspace root to resolver roots
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Add additional resolver patterns for local packages
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx'];

// Override package resolution to use source files directly
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith('@masumdev/')) {
    const packageName = moduleName.split('/')[1];
    return {
      filePath: path.resolve(workspaceRoot, `libs/${packageName}/src/index.ts`),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
