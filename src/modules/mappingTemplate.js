import Mustache from 'mustache'
import {props} from '../../conf'

/**
 * Handler for map data in template and return html string
 * 
 * @param {String} mustacheTemplate the mustache template
 * @return the function module for mapping each data in template. It take two parameters : the data and the timeTolive (example : to remove this data after x millisecond)
 */
export default function mappingTemplate(mustacheTemplate){
    /**
     * Stack of all living data.
     * Format:
     * {
     *  data,
     *  immortal: boolean,
     *  name
     * }
     */
    let arrayData = []

    //Override the current data with the latest data
    function overrideData(data, timeTolive){
        //If none parent, the new data will be the new parent.
        if(!arrayData.length)
            return data

        //Take the latest parent
        let parent = arrayData[arrayData.length - 1]
        
        //If the new data have a timeTolive, her parent must be a immortal data.
        if(!timeTolive)
            //We take the latest immortal data.
            parent = arrayData.reverse().find(d => d.immortal)

        //If none parent, the new data will be the new parent.
        if(!parent)
            return data

        //Override the new data is a merge between it and her parent.
        return {...parent.data, ...data}
    }

    //Set time to live for the data
    function setTimeToLiveForData(dataAndImmortal, timeTolive){
        setTimeout(() => {
            //Remove the data
            arrayData = arrayData.filter(d => d !== dataAndImmortal)

        }, timeTolive)
    }

    //Remove this data during a stop action
    function removeData(name){
        //Remove the data
        arrayData = arrayData.filter(d => d.name !== name)
    }

    /**
     * @param {Object} data the data of the GV request.
     * @param {Object} options the options of the GV request (example: timeTolive to the graphics, action type (start, stop))
     */
    return function render(data, {timeTolive, action, name}){
        if(action === props.actions.stop)
            removeData(name)

        //Override the data
        let dataOveride = overrideData(data, timeTolive)

        //Wrap the data, with property immortal 
        let dataAndImmortal = {
            data: dataOveride,
            immortal: !timeTolive,
            name
        }
        //Add in last position
        arrayData.push(dataAndImmortal)

        //set time to live for data
        if(timeTolive)
            setTimeToLiveForData(dataAndImmortal, timeTolive)

        //Render template with the data
        return Mustache.render(mustacheTemplate, dataOveride)
    }
}