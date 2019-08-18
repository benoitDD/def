/**
 * This script will add in each html page when GV will do a load request.
 * It is a frontend script.
 */

import engine from './modules/engine'
import {getActionEventName, props} from '../conf'
import graphicLogger from './modules/graphicsLogger'

graphicLogger.trace('Loading page')

//When the page is loaded, we log that information.
window.onload = function(){
    graphicLogger.trace('Page loaded')
}

const {idContent} = props

const {
    bundle, //Bundle name
    page, //Page name
    graphics, //All Gaphics names for this page
    template, //Mustache template for this page
    css, //css for this page
    images //All images sources (for caching in browser)
} = window.graphics //Parameters of this pages

//Handler for entries request.
let handlerGraphic = engine(idContent, template, css, images)

//A listener for each graphics of this page. (communication between frontend and backend)
graphics.forEach(graphic => {
    //The backend will send a data specific to a graphic
    window.nodecg.listenFor(
        getActionEventName(bundle, page, graphic), //Named this event according to this bundle, page, graphic
        ({data, options}) => {
            //A new instance of log, only for the handle of this event.
            let LogForThisEvent = graphicLogger.instance()
            LogForThisEvent.trace('Start handle of event', {graphic, action: options.action})
            //Handle this action request.
            handlerGraphic(
                {[graphic]: data}, //We include this data in object with the graphic name
                {...options, log: LogForThisEvent} //The options of request. (example: for stop graphic after x millisecond, the action type.(start, stop)) 
            )
            LogForThisEvent.trace('End handle of event')
    })
})
