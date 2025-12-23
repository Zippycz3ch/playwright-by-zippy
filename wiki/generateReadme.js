const fs = require('fs');
const path = require('path');

// Paths relative to this script in /wiki/
const packageJsonPath = path.resolve(__dirname, '../package.json');
const templatePath = path.resolve(__dirname, './README.template.md'); // now in /wiki/
const readmePath = path.resolve(__dirname, '../README.md');

const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const template = fs.readFileSync(templatePath, 'utf-8');

function formatDeps(deps, type) {
  return Object.entries(deps || {})
    .map(([name, version]) => `| [${name}](https://www.npmjs.com/package/${name}) | ${version} | ${type} |`)
    .join('\n');
}

const tableHeader = `| Package | Version | Type |
|---------|---------|------|`;

const dependenciesTable = [tableHeader, formatDeps(pkg.dependencies, 'dependencies'), formatDeps(pkg.devDependencies, 'devDependencies')].filter(Boolean).join('\n');

const finalReadme = template.replace('{{PACKAGE_LIST}}', dependenciesTable);

fs.writeFileSync(readmePath, finalReadme, 'utf-8');

console.log('✅ README.md generated successfully.');
