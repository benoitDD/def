import {
    getGraphicsLogEventName, 
    getSetUpLogEventName,
    LOG_LEVELS,
    defaultLogLevel
} from '../../conf'
import {format, getDateInStringFormat} from './logFormat'

const {
    bundle, //Bundle name
    page //Page name
} = window.graphics //Parameters of this pages

let base = {bundle, page}

let logEventName = getGraphicsLogEventName()

//The default log level
let currentLevel = defaultLogLevel

//We listen the backend for set up the log level
//We receive a object log level. (example: {name: 'INFO', level: 4})
window.nodecg.listenFor(getSetUpLogEventName(), level => {
    currentLevel = level
})

/**
 * Send log to back-end
 * @param {Object} data data to send. It will extend with the base.
 * @param {String} message message to send. It will be formating.
 */
function logThat(level, message, data = {}){
    let extendedData = {...data}

    //Add the log level information
    extendedData.logLevel = level

    //Add the current date of browser
    extendedData.browserDate = getDateInStringFormat()

    //Message formated
    let formatedMessage = format(message, extendedData)

    //Send to backend
    window.nodecg.sendMessage(logEventName, {
        data: extendedData,
        message: formatedMessage
    })
}

//If the level pass, we log
function pass(level, ...args){
    if(currentLevel.level <= level.level)
        logThat(level, ...args)
}

/**
 * We can create a new instance for remain each data. (example: during the perform of request)
 * @param {boolean} remain if true, each call log methods, we remain the data.
 */
function instance(remain = false){
    let extendedData = {...base}
    let shouldRemain = data => {
        if(remain){
            extendedData = {...extendedData, ...data}
            return extendedData
        } else {
            return {...extendedData, ...data}
        }
    }
    return {
        analyze: function(message, data){
            pass(LOG_LEVELS.ANALIZE, message, shouldRemain(data))
        },
        trace: function(message, data){
            pass(LOG_LEVELS.TRACE, message, shouldRemain(data))
        },
        debug: function(message, data){
            pass(LOG_LEVELS.DEBUG, message, shouldRemain(data))
        },
        info: function(message, data){
            pass(LOG_LEVELS.INFO, message, shouldRemain(data))
        },
        warn: function(message, data){
            pass(LOG_LEVELS.WARN, message, shouldRemain(data))
        },
        error: function(message, data){
            pass(LOG_LEVELS.ERROR, message, shouldRemain(data))
        },
        fatal: function(message, data){
            pass(LOG_LEVELS.FATAL, message, shouldRemain(data))
        }
    }
}

export default {
    //Default all data aren't remaining
    ...instance(false),

    //We can create a new instance for remain each data. (example: during the perform of request)
    instance: function(){
        return instance(true)
    }
}