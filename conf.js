const path = require('path')

//Token for the name of each event. It is between bundle and page, page and graphic (example: bundleA#pageB#graphicC)
const tokenEvent = "#"

//A prefix for all event name, because event already exist before this application.
const prefixEvent = "graphic++"

//The actions (example: start, stop)
let actions = {
    start: 'start',
    stop: 'stop'
}
//A utility for regroup all actions
actions.all = Object.keys(actions).map(key => actions[key])


exports.props = {
    //Name of the key in the data request of GV, for stop a graphic after x millisecond
    nameKeyStop: "stop",

    //The path to the mapping card file. It define all bundles, pages, graphics and requests validation 
    mappingCardPath: path.join(__dirname, 'assets/mappingCard.json'),

    //The path to the templates directory. Contain all templates html/mustache (maybe css, image, video files ?)
    templatesPath: path.join(__dirname, 'assets/templates'),

    //The path to the graphics directory. On load requests, GV load these files.
    graphicsPath: path.join(__dirname, 'graphics'),

    //The id of html tag, where the application add graphics
    idContent: 'content',

    //The name of the action key in each query of GV action request.
    keyAction: 'action',

    //The actions (example: start and stop)
    actions
}

//The names of event, for action requests between Backend and frontend nodecg.
exports.getRouteName = function(bundle, graphic){
    return `/${bundle}/${graphic}/run`
}

//Build names events
function buildEventName(...args){
    return prefixEvent + args.join(tokenEvent)
}

//The names of event, for action requests between Backend and frontend nodecg.
exports.getActionEventName = function(bundle, page, graphic){
    return buildEventName(bundle, page, graphic, 'action')
}

//The names of event, for log the graphics between frontends toward backend nodecg.
exports.getGraphicsLogEventName = function(){
    return buildEventName('log-graphics')
}

//The names of event, for log the graphics between backend toward frontends nodecg. (example for set the log level)
exports.getSetUpLogEventName = function(){
    return buildEventName('log-set-up-graphics')
}

//The log levels
const LOG_LEVELS = {
    ANALIZE: {name: 'ANALIZE', level: 1}, //Look at in html node, in arrays...
    TRACE: {name: 'TRACE', level: 2},
    DEBUG: {name: 'DEBUG', level: 3},
    INFO: {name: 'INFO', level: 4},
    WARN: {name: 'WARN', level: 5},
    ERROR: {name: 'ERROR', level: 6},
    FATAL: {name: 'FATAL', level: 7} //turn off application (front-end or/and back-end)!!
}

exports.LOG_LEVELS = LOG_LEVELS

//The default log level
exports.defaultLogLevel = LOG_LEVELS.ANALIZE