// Personal API Key for OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip="
const key = ",us&appid=33868c56a0734663f2de4e93f41ebf18"

async function getTemperature(url) {
  let res = await fetch(url);
  const data = await res.json();
  let temp = (Math.round((data.main.temp - 273.15) * 10) / 10) + " \xB0C";
  return temp;
}

// Event listener to add function to existing HTML DOM element
function performAction() {
    let data = {};
    let zip = document.getElementById('zip').value;
    let url = baseURL + zip + key;
    let d = new Date();
    let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
    let content = document.getElementById('feelings').value;
    let temp = 0;
    getTemperature(url).then((res) => {
      temp = res;
      //console.log(temp)
      data['temperature'] = temp;
      data['date'] = newDate;
      data['content'] = content;

      postData('/addWeather', data).then(() => {
        getEntry().then((data) => {
          document.getElementById('date').textContent = data.date;
          document.getElementById('temp').textContent = data.temperature;
          document.getElementById('content').textContent = data.content;

        })
      })

    })
    //console.log(zip, url, newDate, content)
    
}
let generate_btn = document.getElementById('generate');
generate_btn.addEventListener('click', performAction)

//Function to POST data to server
const postData = async ( url = '/addWeather', data = {})=>{
    const request = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });

  try {
      const newData = await request.text();
      return newData;
  } catch (err) {
    console.log(err)
  }    
      
}

// function to GET data from Server
const getEntry = async (url = '/recentEntry')=>{
    let response = await fetch(url);
    let data = await response.json()
    return data;
}


