/**
 * Set the graphics conf in package.json, in nodecg.graphics according to mappingCard.json file.
 */

const fs = require('fs')
const path = require('path')
let package = require('../package.json')
let {mappingCardPath} = require('../conf').props
let mappingCard = require(mappingCardPath)

package.nodecg.graphics = []
.concat(
    //Read all pages in mappingCard and construct the graphics conf with the bundle name and page name.
    ...Object.keys(mappingCard).map(
        bundleName => 
            Object.keys(mappingCard[bundleName]).map(pageName => ({
                file: `${bundleName}/${pageName}.html`,
                width: 1000,
                height: 500
            }))
))

//Write the new graphics conf in package.json
fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(package, null, '\t'))