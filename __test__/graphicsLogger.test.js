import {mockNodecg} from './helpersGraphics.js'

import graphicLogger from '../src/modules/graphicsLogger'
import {LOG_LEVELS} from '../conf'

describe('Test all levels methods for log level INFO', () => {
    
    //Set the log level to INFO
    window.nodecg.listenFor.mock.calls[0][1](LOG_LEVELS.INFO)

    test('Test info', () => {
        mockNodecg()

        graphicLogger.trace('Hello world', {greety: 'Hola'})

        //TRACE level is below INFO level
        expect(window.nodecg.sendMessage.mock.calls.length).toBe(0)
    })

    test('Test warn', () => {
        mockNodecg()
        
        const expectedMessage = 'It may cause any problem !'
        const expectedData = {toto: 'ro', titi: 'azerty'}
        graphicLogger.warn(expectedMessage, expectedData)

        expect(window.nodecg.sendMessage.mock.calls.length).toBe(1)

        let {data, message} = window.nodecg.sendMessage.mock.calls[0][1]

        expect(message).toMatch(expectedMessage)
        expect(data).toMatchObject(expectedData)
    })
})