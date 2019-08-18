/**
 * Create all graphics html files according to mappingCard.json file.
 * 
 * Create a directory for each bundle and a html page for each page according to mappingCard.json.
 * 
 * These futur html files will load when GV do a load request.
 */

//For insert a html tag script before all html tag script already include.
const cheerio = require('cheerio')

const fs = require('fs')
const path = require('path')

//Properties of the application. (frontend and backend)
let {mappingCardPath, templatesPath, graphicsPath} = require('../conf').props

//The mappingCard contain all bundles, pages, graphics and schema for GV requests validation.
let mappingCard = require(mappingCardPath)

//a Model HTML page that include core script of frontend. All html page extends this page.
const pageHTML = fs.readFileSync(path.join(__dirname, 'page.html'))

//Read all bundles and pages.
Object.keys(mappingCard).map(bundleName =>{
        let bundle = mappingCard[bundleName]
        Object.keys(bundle).map(pageName => {
            let page = bundle[pageName]

            //All graphic that contains in this page.
            let graphicsNames = Object.keys(page)

            //The new directory path of this bundleName.
            let bundlePath = path.join(graphicsPath, bundleName)

            //Create a directory named bundleName.
            fs.mkdirSync(bundlePath)

            //The path of the page in template. (include css and mustache file)
            let templatePath = path.join(templatesPath, `${bundleName}/${pageName}`)

            //The path of template page.
            let template = String(fs.readFileSync(`${templatePath}.mustache`))

            //The path of template page.
            let cssPath = `${templatePath}.css`

            //All css of this page in string format
            let css
            if(fs.existsSync(cssPath))
                css = String(fs.readFileSync(cssPath))

            //Define the page properties
            let pageProps = {bundle: bundleName, page: pageName, graphics: graphicsNames, template, css}
            propsScriptPage = `
            <script>
                window.graphics = ${JSON.stringify(pageProps)}
            </script>
            `

            //Transofor the html page for cheerio module
            let $ = cheerio.load(pageHTML)

            //Add the page properties
            let scripts = $('script')
            if (scripts.length) 
                scripts.first().before(propsScriptPage)
            else
                $('body').append(propsScriptPage)

            //Create a new html page in the graphic bundle
            let pagePath = path.join(bundlePath, pageName)
            fs.writeFileSync(pagePath + '.html', $.html())
        })
    }
)