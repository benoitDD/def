import './helpersGraphics.js'
import cachingImages from '../src/modules/cachingImages'

test('With one images', () => {
    return expect(cachingImages(['toto'])).resolves.toBeUndefined()
})

test('With many images', () => {
    return expect(cachingImages(['toto', 'bobo'])).resolves.toBeUndefined()
})

test('With none image', () => {
    return expect(cachingImages([])).resolves.toBeUndefined()
})