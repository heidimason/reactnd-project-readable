export const getWeekday = function() {
    const weekday = new Date().toLocaleString([], {
    	weekday: 'long'
    })

    return weekday
}

export const getTime = function() {
    const time = new Date().toLocaleString([], {
    	hour: '2-digit',
    	minute: '2-digit'
    })

    return time
}