/**
 * return date to format AAAA-MM-DD HH-MM:SS:MMMM
 */
export function getDateInStringFormat(){
    let date = new Date()

    return `${date.getFullYear()}-${number2(date.getMonth() + 1)}-${number2(date.getDate())} `
    + `${number2(date.getHours())}:${number2(date.getMinutes())}:${number2(date.getSeconds())}:${number3(date.getMilliseconds())}`
}

// return number in string format, complete with maximum two 0
function number2(number){
    return String(number).padStart(2, '0')
}

// return number in string format, complete with maximum three 0
function number3(number){
    return String(number).padStart(3, '0')
}

//Complete the message to right with space.
function completeRight(message = '', max){
    //Don't cut the message, if it too long
    if(message.length > max) 
        return message

    return String(message).padEnd(max, ' ')
}

/**
 * 
 * @param {message} message 
 * @param {Object} parameters the parameter for enrich this log. We need browserDate, 
 * logLevel, bundle and page. We would like graphic and action.
 */
export function format(message, {browserDate, logLevel, bundle, page, graphic, action}){
    return `${browserDate} ${completeRight(logLevel.name, 8)}`
    + ` category: ${completeRight(`${bundle}.${page}.${graphic || '*'}`, 20)}`
    + ` action: ${completeRight(action || '*', 10)}` + message
}