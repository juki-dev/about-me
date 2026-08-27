import { describe, expect, it, vi } from 'vitest'
import { renderMarkdown } from './markdown'

const DIR = '/content/blog/un-post'

describe('renderMarkdown — imágenes', () => {
  it('deja pasar URLs externas y data: sin tocarlas', () => {
    const html = renderMarkdown('![Externa](https://ejemplo.com/x.png)', DIR)
    expect(html).toContain('src="https://ejemplo.com/x.png"')
  })

  it('resuelve rutas de public/images contra la BASE_URL', () => {
    const html = renderMarkdown('![Logo](images/logo/juki-dev.png)', DIR)
    expect(html).toContain(`src="${import.meta.env.BASE_URL}images/logo/juki-dev.png"`)
  })

  it('agrega las sugerencias de carga a toda imagen del cuerpo', () => {
    const html = renderMarkdown('![Externa](https://ejemplo.com/x.png)', DIR)
    expect(html).toContain('loading="lazy"')
    expect(html).toContain('decoding="async"')
  })

  it('conserva alt y title, y los escapa', () => {
    const html = renderMarkdown('![Un "alt"](https://ejemplo.com/x.png "El <title>")', DIR)
    expect(html).toContain('alt="Un &quot;alt&quot;"')
    expect(html).toContain('title="El &lt;title&gt;"')
  })

  it('avisa y no rompe el render cuando la imagen no existe', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const html = renderMarkdown('![Falta](no-existe.png)', DIR)
    expect(html).toContain('src="no-existe.png"')
    expect(warn).toHaveBeenCalledOnce()
    warn.mockRestore()
  })

  it('no toca las imágenes cuando no se pasa carpeta de assets', () => {
    const html = renderMarkdown('![Falta](no-existe.png)')
    expect(html).toContain('src="no-existe.png"')
  })
})
