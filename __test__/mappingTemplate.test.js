import './helpersGraphics.js'
import mappingTemplate from '../src/modules/mappingTemplate'

let mappingHandler = mappingTemplate(`
{{#logo}}
    <p
    {{#next}}
        class = ".thrill"
    {{/next}}
    >
        {{channel}}
    </p>
{{/logo}}
{{#next}}
<div>{{TITLE}}</div>
<div>{{LINE_1}}</div>
    {{#LINE_2}}
<div>{{LINE_2}}</div>
        {{#LINE_3}}
<div>{{LINE_3}}</div>
        {{/LINE_3}}
    {{/LINE_2}}
{{/next}}
`)

test('ABCDE', () => {
    expect(mappingHandler({logo: {channel: 'Eurosport 1'}} ,{name: 'logo'}))
    .toBe(`
    <p
    >
        Eurosport 1
    </p>
`)
    expect(mappingHandler({next: {
        TITLE: 'This night',
        LINE_1: 'Fooball',
        LINE_2: 'Rugby',
        LINE_3: 'Handball',
    }} ,{name: 'next'}))
    .toBe(`
    <p
        class = ".thrill"
    >
        Eurosport 1
    </p>
<div>This night</div>
<div>Fooball</div>
<div>Rugby</div>
<div>Handball</div>
`)
})