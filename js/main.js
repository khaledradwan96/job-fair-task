// ========== function to get data from json file ==========
async function getData(){
    const api = 'js/data.json'
    let response = await fetch(api)
    let data = await response.json()
    let customers = data.customers
    let transactions = data.transactions
    init(customers, transactions) // => call to start app
}
getData() // => to start app

function init(customers, transactions) {
    const container = document.getElementById('data-container')
    const customerFilter = document.getElementById('customerFilter')
    const amountFilter = document.getElementById('amountFilter')
    
    // ========== function to display data ==========
    function displayData(transactions){
        container.innerHTML = ''
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
    function filterData() {
        const customerName = customerFilter.value.toLowerCase();
        const amount = amountFilter.value;
        const filteredTransactions = [];
        for(let i=0; i<transactions.length; i++){
            let transaction = transactions[i]
            let customer = customers.find(c => c.id === transaction.customer_id)
            let matchesCustomer = customer.name.toLowerCase().includes(customerName);
            let matchesAmount = amount ? transaction.amount >= amount : true;
            if (matchesCustomer && matchesAmount) {
                filteredTransactions.push(transaction);
            }
        }
        displayData(filteredTransactions);
    }

    customerFilter.addEventListener('input', filterData)
    amountFilter.addEventListener('input', filterData)
    displayData(transactions)
}

