import {props} from '../../conf'

/** 
 * Handle many connected html layers and display only the last.
 * 
 * @param {string} rootId the root id to add the layers
 * @return the function module for handle layers in the root. It take two parameters : a html string (a layer) and a timeTolive (example : to remove this layer after x millisecond)
 */

export default function graphicsLayers(rootId){
    /**
     * Contain all layers (HTML node) and layer name
     * {
     *  node,
     *  name
     * }
     */
    let layers = []

    //The root to display the layers
    let root = document.getElementById(rootId)

    //Remove layer in [timeTolive] millisecond
    //Then display the last layer
    function handleTimeTolive(timeTolive, layer, log){
        setTimeout(() => {
            //Remove the layer
            removeLayer(layer.name, log)

            //Display the last layer
            if(layers.length)
                layers[layers.length - 1].node.style.visibility = 'visible'

        }, timeTolive)
    }

    //Remove this layer during a stop action
    function removeLayer(name, log){
        layers.filter(l => l.name === name).forEach(l => l.node.remove())
        
        //Remove the layer in the array
        layers = layers.filter(l => l.name !== name)

        log.trace(`Graphic ${name} remove in the page`)
    }

    //add a new layer
    function addLayer(html, name){
        //create a new layer with the html string parameter
        let node = document.createElement('div')
        node.style.position = 'absolute'
        node.innerHTML = html

        //Hidden the last layer
        if(layers.length)
            layers[layers.length - 1].node.style.visibility = 'hidden'

        //Add the new layer in last position
        let layer = {node, name}
        layers.push(layer)

        //Display the new layer
        root.appendChild(node)

        return layer
    }

    /**
     * @param {string} html the html string to display
     * @param {Object} options the options of the GV request (example: timeTolive to the graphics, action type (start, stop))
     */
    return function handlerLayer(html, {timeTolive, action, name, log}){
        if(action === props.actions.stop)
            removeLayer(name, log)

        //None html graphic. (Maybe a stop action without graphic)
        if(!html)
            return
        
        //Add a new layer (in DOM and in array)
        let layer = addLayer(html, name)

        log.trace(`Graphic ${name} add in the page`)

        //Handle timeTolive (example: remove layer in x millisecond)
        if(timeTolive)
            handleTimeTolive(timeTolive, layer, log)
    }
}