// ========== function to get data from json file ==========
async function getData(){
    const api = 'js/data.json'
    let response = await fetch(api)
    let data = await response.json()
    let customers = data.customers
    let transactions = data.transactions
    // console.log(response) // => for testing
    init(customers, transactions) // => call displayData function
    // filterData(response)
}
getData() // => to start app


function init(customers, transactions) {
    let container = document.getElementById('data-container')
    let customerFilter = document.getElementById('customerFilter')
    let amountFilter = document.getElementById('amountFilter')
    
    // ========== function to display data ==========
    function displayData(customers, transactions){
        let cartona = ''
        for(let i=0; i<customers.length; i++){
            for(let j=0; j<transactions.length; j++){
                if(transactions[j].customer_id === customers[i].id){
                    cartona += 
                    `<tr>
                        <td>${transactions[j].id}</td>
                        <td>${customers[i].name}</td>
                        <td>${transactions[j].date}</td>
                        <td>${transactions[j].amount}</td>
                    </tr>`
                }
            }
        }
        container.innerHTML = cartona
    }

    // ========== function filter data ==========
    function filterData(){
        container.innerHTML = ''
        const customerName = customerFilter.value.toLowerCase();
        const amount = amountFilter.value;
        let filteredTransactions = [];
        for(let i=0; i< transactions.length; i++){
            console.log(filteredTransactions)
        }
        displayData(filteredTransactions)
    }
    customerFilter.addEventListener('input', filterData)
    amountFilter.addEventListener('input', filterData)
    displayData(customers, transactions)
}

