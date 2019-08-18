import './helpersGraphics.js'
import cssHandler from '../src/modules/cssHandler'

test('Add css', () => {
    const css = 'p {color: blue;}'
    cssHandler(css)

    expect(document.head.innerHTML).toBe(`<style>${css}</style>`)
})

test('Add none css', () => {
    document.querySelectorAll('style').forEach(element => element.remove())

    cssHandler()

    expect(document.head.innerHTML).toBe('')
})