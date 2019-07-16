const request = require("request")

const geocode = (address,callback) =>{
    // console.log(encodeURIComponent(address))
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibXVrdWxtYWhhdXIiLCJhIjoiY2p5MmNkZG5sMG16cjNobnF4dDJ4cmY2biJ9.yaaB8YhKj-GwSrkhRCvUYQ'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to Connect',undefined)
        }else if(body.features.length == 0){
            callback('Unable to find locations. Try another Search',undefined)
        }else{
            callback(undefined,{
                latitude: `${body.features[0].center[1]}`,
                longitude: `${body.features[0].center[0]}`,
                location: `${body.features[0].place_name}`
            })
        }
    })
}

module.exports = geocode