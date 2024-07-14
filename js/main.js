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
    let customers = data.customers
    let transactions = data.transactions
    let cartona = ''
    for(let i=0; i<customers.length; i++){
        for(let j=0; j<transactions.length; j++){
            if(transactions[j].customer_id === customers[i].id){
                // console.log(customers[i].name, transactions[j])
                cartona += 
                    `<tr>
                        <td>${i+1}</td>
                        <td>${customers[i].name}</td>
                        <td>${transactions[j].date}</td>
                        <td>${transactions[j].amount}</td>
                    </tr>`
            }
        }
    }
    document.getElementById('data-container').innerHTML = cartona
}

getData()