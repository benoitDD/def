import graphicLogger from './graphicsLogger'

/**
 * Load all images for set them in browser cache
 * @param {Array.String} arraySrc a array of image source
 * @return {Promise} promise call when all image are loaded
 */
export default function cachingImages(arraySrc){
    return new Promise((resolve) => {
        if(!arraySrc || !arraySrc.length){
            graphicLogger.trace('None image for this page')
            return resolve()
        }
        
        arraySrc.forEach((src, index) => {
            let img = new Image()
            img.onload = function() {
                if(index + 1 === arraySrc.length){
                    graphicLogger.trace('Images set in cache for this page')
                    resolve()
                }
            }
            img.src = src
        })
    })
}