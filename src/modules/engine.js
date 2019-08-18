import graphicsLayers from './graphicsLayers'
import mappingTemplate from './mappingTemplate'
import cssHandler from './cssHandler'
import cachingImages from './cachingImages'

/**
 * 
 * @param {String} rootId the root id to add the layers
 * @param {String} mustacheTemplate the mustache template
 * @param {String} css the css in string format
 * @param {Array.String} images a array of image source
 * @return the function module for handle a entering data
 */
export default function engine(rootId, mustacheTemplate, css, images){
    //Caching the images in browser cache.
    cachingImages(images)

    //Add the css in browser
    cssHandler(css)

    //Handler for the graphics
    let graphicHandler = graphicsLayers(rootId)

    //Handler for map data in template and return html string
    let mappingHandler = mappingTemplate(mustacheTemplate)

    /**
     * Handler for entries request
     * @param {Object} data the data of the GV request
     * @param {Object} options the options of the GV request (example: timeTolive to the graphics, action type (start, stop))
     */
    return function handle(data, options){
        //Transform data into html string
        let html = mappingHandler(data, options)

        //If html is empty (or contain only whitespace), we musn't display it.
        html = html && html.trim() === '' ? null : html

        //We display the html into a graphic or/and remove a old graphic
        graphicHandler(html, options)
    }
}