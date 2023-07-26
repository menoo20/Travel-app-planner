const axios = require("axios")


const getCityLoc = async(city, username) => {
    const {data} = await axios.get(`https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`)
    
    if(!data.geonames.length){
        const errMsg = {
            message: "no city with that name. please make sure of your spelling",
            error: true
        }
        return errMsg
    }
    return data.geonames[0]
}

module.exports =  {getCityLoc}