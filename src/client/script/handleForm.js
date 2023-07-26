import axios from "axios";
const form = document.querySelector("form");
const cityInp = document.querySelector("#city");
const dateInp = document.querySelector("#flightDate");

const handleSubmit = async (e) => {

  e.preventDefault();

  //checking if the function is working fine
  console.log("I am working fine");

  //get the location first and make sure call is successful
  const Location = await getCityLoc();

  //failing call to location
  if (Location && Location.error) {
    console.log(Location.message);

  } else if (Location && !Location.error) {

    //extract longitude and latitude
    const { lng, lat, name } = await Location;

    //get the date of the flight
    const date = dateInp.value;

    //user didn't input the date
    if(!date){
        console.log("please enter the date");
        return
    }

    
    if (lng && lat) {

      // get remaining days before the flight
      //i need to calcualte remaining days
      const remainingDays = getRdays(date);

      //get the weather data and consider sending the remaining days to know when
      //exactly should i get my data back.

      const weather = await getWeather(lng, lat, remainingDays);
      const pic = await getCityPic(name)
      }
    }
  }

const getCityLoc = async () => {
  if (cityInp.value) {
    const { data } = await axios.post("http://localhost:8000/getCity", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data.name);
    return data;
  }
};


const getWeather = async (lng, lat, remainingDays) => {
  const { data } = await axios.post("http://localhost:8000/getWeather", {
    lng,
    lat,
    remainingDays,
  });

  return data
};

const getRdays = (date) => {
  // Set the start and end dates
  const startDate = new Date();
  const endDate = new Date(date);

  // Calculate the time difference in milliseconds
  const timeDiff = endDate.getTime() - startDate.getTime();

  // Convert the time difference to days
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Output the result
  console.log(
    `There are ${daysDiff} days between ${startDate.toDateString()} and ${endDate.toDateString()}`
  );
  return daysDiff;
};

//getting the city picture from pixabay
const getCityPic = async(city_name)=>{
  const { data } = await axios.post("http://localhost:8000/getCityPic", {
    city_name
  });
  console.log(data);
}


export { handleSubmit };
