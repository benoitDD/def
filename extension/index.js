'use strict'

const app = require('express')()
const {addRoutes} = require('./routes')
const {logHandler} = require('./logHandler')

module.exports = function (nodecg) {

	//Add all routes for our graphics and GV
	addRoutes(app, nodecg)

	logHandler(nodecg)

	nodecg.mount(app)
}
