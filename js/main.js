// ========== function to get data from json file ==========
async function getData(){
    const api = 'js/data.json'
    let response = await fetch(api)
    response = await response.json()
    // console.log(response) // => for testing
    displayData(response)
}

// ========== function to display data ==========
function displayData(data) {

}

getData()