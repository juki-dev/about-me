#!/usr/bin/env node
/**
 * Fails the build when a markdown file under /content references an image
 * that does not exist on disk.
 *
 * Image references are resolved by Vite at build time into hashed URLs, and a
 * reference that matches nothing silently renders as a broken <img> in
 * production. This check turns that into a build error instead, so a typo in
 * a filename never reaches the deploy.
 *
 * The resolution rules mirror resolveContentImage() in src/content/images.ts;
 * the two must stay in sync.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** Markdown image syntax: ![alt](src) and ![alt](src "title"). */
const IMAGE_RE = /!\[[^\]]*\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g
/** Raw <img src="…"> written directly in a body. */
const HTML_IMG_RE = /<img\b[^>]*?\ssrc\s*=\s*["']([^"']+)["']/gi
/** Frontmatter cover: image: some/path.png */
const FRONTMATTER_IMAGE_RE = /^image:\s*(.+)$/m

const EXTERNAL_RE = /^(https?:)?\/\//
const PUBLIC_RE = /^\/?images\//

/** Strips fenced code blocks so examples inside ``` never fail the build. */
function stripCodeFences(body) {
  return body.replace(/^```[\s\S]*?^```/gm, '')
}

function splitFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  return match ? { frontmatter: match[1], body: match[2] } : { frontmatter: '', body: raw }
}

/** Maps a reference to the file it must resolve to, or null when it self-resolves. */
function expectedFile(src, dir) {
  if (!src || EXTERNAL_RE.test(src) || src.startsWith('data:')) return null
  if (PUBLIC_RE.test(src)) return join(root, 'public', src.replace(/^\//, ''))

  const relative = src.replace(/^\.\//, '')
  if (relative.startsWith('/content/')) return join(root, relative.slice(1))
  return join(root, dir, relative)
}

function lineOf(raw, src) {
  const index = raw.indexOf(src)
  return index === -1 ? 1 : raw.slice(0, index).split('\n').length
}

// Each post is a folder holding its index.md; folders starting with "_" are
// author scratch space and are skipped.
const folders = ['blog', 'projects'].flatMap((collection) =>
  readdirSync(join(root, 'content', collection), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
    .map((entry) => `content/${collection}/${entry.name}`),
)

// A folder without an index.md is a post that silently never renders.
const orphans = folders.filter((folder) => !existsSync(join(root, folder, 'index.md')))
const files = folders
  .filter((folder) => !orphans.includes(folder))
  .map((folder) => `${folder}/index.md`)

const problems = []

for (const file of files) {
  const raw = readFileSync(join(root, file), 'utf8')
  const { frontmatter, body } = splitFrontmatter(raw)
  const dir = dirname(file)

  const refs = []
  const cover = FRONTMATTER_IMAGE_RE.exec(frontmatter)?.[1]?.trim().replace(/^["']|["']$/g, '')
  if (cover && cover !== 'null' && cover !== '~' && cover !== '') refs.push(cover)

  const scannable = stripCodeFences(body)
  for (const re of [IMAGE_RE, HTML_IMG_RE]) {
    re.lastIndex = 0
    let match
    while ((match = re.exec(scannable)) !== null) refs.push(match[1])
  }

  for (const src of refs) {
    const target = expectedFile(src, dir)
    if (target && !existsSync(target)) {
      problems.push({ file, line: lineOf(raw, src), src, target })
    }
  }
}

if (orphans.length > 0) {
  console.error(`\n✖ ${orphans.length} carpeta(s) de contenido sin index.md:\n`)
  for (const folder of orphans) console.error(`  ${folder}/`)
  console.error('\nSin index.md la entrada no se publica. Agrégalo o borra la carpeta.\n')
  process.exit(1)
}

if (problems.length > 0) {
  console.error(`\n✖ ${problems.length} imagen(es) referenciada(s) que no existe(n):\n`)
  for (const { file, line, src, target } of problems) {
    console.error(`  ${file}:${line}`)
    console.error(`    referencia: ${src}`)
    console.error(`    se esperaba: ${target.replace(`${root}/`, '')}\n`)
  }
  console.error('Agrega el archivo o corrige la referencia y vuelve a construir.\n')
  process.exit(1)
}

console.log(`✔ imágenes de contenido verificadas (${files.length} entradas)`)
