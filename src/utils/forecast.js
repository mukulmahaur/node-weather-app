const request = require("request")

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/1699a67d518017d8fd2975c6b5d11598/'+latitude+','+longitude+'?units=si'

    request({url ,json:true},(error,{body})=>{
        if(error){
            callback('Unable to Connect',undefined)
        }else if(body.error){
            callback(`${body.error}`,undefined)
        }else{
            callback(undefined,`${body.daily.data[0].summary} Current temperature in Gurgaon is ${body.currently.temperature} degrees Celsius and precipitation chances are ${body.currently.precipProbability*100}%`)
        }
    })
}

module.exports = forecast