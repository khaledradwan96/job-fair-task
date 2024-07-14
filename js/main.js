// ========== function to get data from json file ==========
async function getData(){
    const api = 'js/data.json'
    try{
        let response = await fetch(api)
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json()
        init(data.customers, data.transactions); // => call to start app
    } catch{
        console.error('Failed to fetch data:', error);
    }

}
getData() // => to start app

function init(customers, transactions) {
    const container = document.getElementById('data-container')
    const customerFilter = document.getElementById('customerFilter')
    const amountFilter = document.getElementById('amountFilter')
    const ctx = document.getElementById('transactionGraph').getContext('2d')
    let transactionChart
    
    // ========== function to display data ==========
    function displayData(transactions){
        container.innerHTML = ''
        let cartona = ''
        for(let i=0; i<customers.length; i++){
            for(let j=0; j<transactions.length; j++){
                if(transactions[j].customer_id === customers[i].id){
                    cartona += 
                        `<tr>
                            <td>${j+1}</td>
                            <td class="customer-name">${customers[i].name}</td>
                            <td>${transactions[j].date}</td>
                            <td>$${transactions[j].amount}</td>
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

    // ========== function Debouncing Input ==========
    // For the filter inputs, consider debouncing to prevent excessive filtering operations as the user types.
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
    customerFilter.addEventListener('input', debounce(filterData, 300));
    amountFilter.addEventListener('input', debounce(filterData, 300));

    // ========== function to update graph ==========
    function updateGraph(customerId, customerName){
        let filteredTransactions = [];
        for(let i=0; i<transactions.length; i++){
            let transaction = transactions[i];
            if (transaction.customer_id === customerId) {
                filteredTransactions.push(transaction);
            }
        }
        let dates = []
        let amounts = []
        for(let i=0; i<filteredTransactions.length; i++){
            dates.push(filteredTransactions[i].date);
            amounts.push(filteredTransactions[i].amount);
        }
        if (transactionChart) {
            transactionChart.destroy();
        }
        transactionChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: `Transaction Amount for ${customerName}`,
                    data: amounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                    lineTension: 0.3 // Smooth the line
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    container.addEventListener('click', (event) => {
        const customerName = event.target.closest('tr').children[1].textContent;
        const customer = customers.find(c => c.name === customerName);
        updateGraph(customer.id, customer.name);
    });

    displayData(transactions);
}
