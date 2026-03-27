import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

const PAGES_DIR = path.resolve(process.cwd(), 'apps/web/src/app/pages');

const RAW_HTML_REGEX = /dangerouslySetInnerHTML=\{\{\s*__html:\s*`([\s\S]*?)`\s*\}\}\s*\/>/m;

function toCamelCase(cssProp) {
  return cssProp.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function escapeSingleQuotes(text) {
  return text.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function cssToJsxStyle(cssText) {
  const declarations = cssText
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean);

  if (!declarations.length) {
    return '{{}}';
  }

  const pairs = declarations
    .map((declaration) => {
      const [rawProp, ...rawValueParts] = declaration.split(':');
      if (!rawProp || !rawValueParts.length) {
        return null;
      }

      const prop = rawProp.trim();
      const value = rawValueParts.join(':').trim();
      if (!prop || !value) {
        return null;
      }

      const key = prop.startsWith('--')
        ? `'${escapeSingleQuotes(prop)}'`
        : toCamelCase(prop);

      return `${key}: '${escapeSingleQuotes(value)}'`;
    })
    .filter(Boolean);

  return pairs.length ? `{{ ${pairs.join(', ')} }}` : '{{}}';
}

function htmlToJsx(html) {
  let jsx = html;

  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '');
  jsx = jsx.replace(/\sclass=/g, ' className=');
  jsx = jsx.replace(/\sfor=/g, ' htmlFor=');
  jsx = jsx.replace(/\stabindex=/g, ' tabIndex=');
  jsx = jsx.replace(/\smaxlength=/g, ' maxLength=');
  jsx = jsx.replace(/\sminlength=/g, ' minLength=');
  jsx = jsx.replace(/\sreadonly(?=[\s>])/g, ' readOnly');
  jsx = jsx.replace(/\sautocomplete=/g, ' autoComplete=');
  jsx = jsx.replace(/\sautofocus(?=[\s>])/g, ' autoFocus');

  jsx = jsx.replace(/\sstyle="([^"]*)"/g, (_, cssText) => ` style=${cssToJsxStyle(cssText)}`);

  jsx = jsx
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return jsx;
}

function indent(text, spaces) {
  const prefix = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((line) => (line ? `${prefix}${line}` : line))
    .join('\n');
}

function buildComponentSource(componentName, jsxMarkup) {
  const indentedMarkup = indent(jsxMarkup, 6);

  return `export default function ${componentName}() {\n  return (\n    <div className="w-full min-h-screen bg-surface">\n${indentedMarkup}\n    </div>\n  );\n}\n`;
}

async function run() {
  const files = (await readdir(PAGES_DIR)).filter((file) => file.endsWith('.tsx'));

  let convertedCount = 0;

  for (const file of files) {
    const fullPath = path.join(PAGES_DIR, file);
    const source = await readFile(fullPath, 'utf8');

    const match = source.match(RAW_HTML_REGEX);
    if (!match) {
      continue;
    }

    const rawHtml = match[1];
    const jsxMarkup = htmlToJsx(rawHtml);
    const componentName = path.basename(file, '.tsx');
    const output = buildComponentSource(componentName, jsxMarkup);

    await writeFile(fullPath, output, 'utf8');
    convertedCount += 1;
    console.log(`Converted ${file}`);
  }

  console.log(`Done. Converted ${convertedCount} page(s).`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
