const axios = require("axios")


const getCityPic = async(city, key) => {
    const {data} = await axios.get(`https://pixabay.com/api/?key=${key}&q=${city}&image_type=photo`)
    const image = data.hits[0].largeImageURL
    
    // now i will send an object with single property image
    return {image}
}

module.exports = {
    getCityPic
}