import graphicLogger from './graphicsLogger'

/**
 * Append style in browser for css
 * @param {String} css the ccs in string format
 */
export default function addCss(css) {
    if(!css) return graphicLogger.warn('None CSS for this page')

    let styleNode = document.createElement('style')
    styleNode.innerHTML = css
    document.head.appendChild(styleNode)

    graphicLogger.trace('CSS added to the page')
}