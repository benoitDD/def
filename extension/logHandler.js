const {getGraphicsLogEventName} = require('../conf')

exports.logHandler = function(nodecg){
    nodecg.listenFor(getGraphicsLogEventName(), ({
        data,
        message
    }) => {
        console.log(message)
    })
}