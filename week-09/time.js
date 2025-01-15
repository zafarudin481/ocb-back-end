const time = new Date()
const hours = time.getHours()
const minutes = time.getMinutes()
const seconds = time.getSeconds()
const day = time.getDay()

const masa = {
    time,
    hours,
    minutes,
    seconds,
    day
}

module.exports = masa;