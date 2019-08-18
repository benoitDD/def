const mappingCard = require('../assets/mappingCard.json')
const {getActionEventName, getRouteName, props} = require('../conf')
const {keyAction, nameKeyStop, actions} = props

//Read each graphic (bundle -> page -> many graphics) a build a route for this.
exports.addRoutes = function(app, nodecg){
    Object.keys(mappingCard).forEach(bundleName => {
        let bundle = mappingCard[bundleName]
        Object.keys(bundle).forEach(pageName => {
            let page = bundle[pageName]
            Object.keys(page).forEach(graphicName => {
                let validationTemplate = page[graphicName]
                addRoute(app, nodecg, bundleName, pageName, graphicName, validationTemplate)
            })
        })
    })
}

//Add a route in the app for a graphic
function addRoute(app, nodecg, bundleName, pageName, graphicName, validationTemplate){
    let handlerReqRes = createHandlerReqRes(nodecg, bundleName, pageName, graphicName, validationTemplate)

    let route = getRouteName(bundleName, graphicName)
    console.log(`Add the route ${route}`)
	app.post(route, handlerReqRes)
}

function createHandlerReqRes(nodecg, bundleName, pageName, graphicName, validationTemplate){
    let actionEventName = getActionEventName(bundleName, pageName, graphicName)
    return (req, res) => {
        let requestData = req.body
        /*
        let errMessage = valideParam(validationTemplate, requestData)
        if(errMessage)
            return res.status(400).send(errMessage)
        */

        //Action for the graphics (start, stop)
        let action = req.query[keyAction]

        //If action doesn't exist, we reply by a http error
        if(!action)
            return res.status(400).send(`You must define a action in the query of your request`)
        
        //If action doesn't handle by us, we reply by a http error
        if(!actions.all.includes(action))
            return res.status(400).send(`Your action [${action}] isn't handle`)

        //Build the option according to request
        let options = {action, name: graphicName}

        //Option to stop a graphic in x millisecond
        if(requestData[nameKeyStop])
            options.timeTolive = requestData[nameKeyStop]

        //This props contain the data and options of the request
        let props = {data: requestData, options}

        //We send in a specific graphic (Already, in a html page then redirect to the specific graphic)
        nodecg.sendMessage(actionEventName, props)
        
        res.send('OK')
	}
}