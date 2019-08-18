import {getDateInStringFormat, format} from '../src/modules/logFormat'
import {LOG_LEVELS} from '../conf'

test('Date in string format', () => {
    let memo = global.Date

    global.Date = function (){
        this.getFullYear = () => 2019
        this.getMonth = () => 5
        this.getDate = () => 9
        this.getHours = () => 16
        this.getMinutes = () => 34
        this.getSeconds = () => 2
        this.getMilliseconds = () => 55
    }

    expect(getDateInStringFormat()).toBe('2019-06-09 16:34:02:055')

    global.Date = memo
})

test('Message format', () => {
    expect(
        format(
            'Hello World !', 
            {
                browserDate: '2019-06-09 16:34:02:055', 
                logLevel: LOG_LEVELS.INFO,
                bundle: 'bundleA',
                page: 'pageB',
                graphic: 'graphicC',
                action: 'start'
            }
        )
    ).toMatch(/^2019-06-09 16:34:02:055.*INFO.*bundleA.*pageB.*graphicC.*start.*Hello World !$/)
})

