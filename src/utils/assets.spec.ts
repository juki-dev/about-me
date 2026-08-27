import { describe, expect, it } from 'vitest'
import { resolvePublicAsset } from './assets'

const BASE = import.meta.env.BASE_URL

describe('resolvePublicAsset', () => {
  it('antepone la BASE_URL a una ruta de public/', () => {
    expect(resolvePublicAsset('images/logo/juki-dev.png')).toBe(`${BASE}images/logo/juki-dev.png`)
  })

  it('trata igual la ruta con y sin barra inicial', () => {
    expect(resolvePublicAsset('/images/logo/juki-dev.png')).toBe(
      resolvePublicAsset('images/logo/juki-dev.png'),
    )
  })

  it('es idempotente: no vuelve a prefijar una URL ya resuelta', () => {
    const once = resolvePublicAsset('images/logo/juki-dev.png')!
    expect(resolvePublicAsset(once)).toBe(once)
  })

  it('deja intactas las URLs absolutas y los data URI', () => {
    expect(resolvePublicAsset('https://ejemplo.com/x.png')).toBe('https://ejemplo.com/x.png')
    expect(resolvePublicAsset('//ejemplo.com/x.png')).toBe('//ejemplo.com/x.png')
    expect(resolvePublicAsset('data:image/png;base64,AAAA')).toBe('data:image/png;base64,AAAA')
  })

  it('devuelve null cuando no hay imagen', () => {
    expect(resolvePublicAsset(null)).toBeNull()
    expect(resolvePublicAsset('')).toBeNull()
  })
})
