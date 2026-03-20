// -----------------------------
// Expense Tracker Main Script
// -----------------------------

// Select DOM Elements for UI interaction
const balance = document.getElementById('balance'); // Displays current balance
const moneyPlus = document.getElementById('money-plus'); // Displays total income
const moneyMinus = document.getElementById('money-minus'); // Displays total expenses
const list = document.getElementById('transaction-list'); // List of transactions
const descInput = document.getElementById('desc-input'); // Input for transaction description
const amountInput = document.getElementById('amount-input'); // Input for transaction amount
const typeInput = document.getElementById('type-input'); // Input for transaction type (income/expense)
const addBtn = document.getElementById('add-btn'); // Button to add a new transaction

// Load transactions from localStorage if available, otherwise start with an empty array
const saved = localStorage.getItem('transactions');
let transactions = saved ? JSON.parse(saved) : [];

// Calculate and update the balance, income, and expense totals in the UI
function updateTotals() {
    let income = 0;
    let expense = 0;

    // Sum up income and expenses from all transactions
    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            income += transaction.amount;
        } else if (transaction.type === 'expense') {
            expense += transaction.amount;
        }
    });

    // Calculate the net balance
    const totalBalance = income - expense;

    // Update the UI with calculated values
    balance.innerText = `$${totalBalance.toFixed(2)}`;
    moneyPlus.innerText = `$${income.toFixed(2)}`;
    moneyMinus.innerText = `$${expense.toFixed(2)}`;
}

// Create a DOM node (li) for a single transaction
function createTransactionNode(transaction) {
    const li = document.createElement('li');
    // Add class based on transaction type for styling
    li.classList.add(transaction.type === 'income' ? 'plus' : 'minus');

    const sign = transaction.type === 'income' ? '+' : '-';
    // Set the inner HTML for the transaction item
    li.innerHTML = `
    ${transaction.description} <span>${sign}$${transaction.amount.toFixed(2)}</span>
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
  `;
    return li;
}

// Delete a transaction by its ID, update storage and UI
window.deleteTransaction = function (id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    saveTransactions();
    render();
}

// Add a new transaction from user input
function addTransaction() {
    const description = descInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    // Validate input fields
    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid description and amount');
        return;
    }

    // Create a new transaction object
    const transaction = {
        id: Date.now(), // Unique ID based on timestamp
        description,
        amount,
        type
    };

    // Add transaction to the array and update storage/UI
    transactions.push(transaction);
    saveTransactions();
    render();
}

// Save the transactions array to localStorage
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Render all transactions in the list and update totals
function render() {
    list.innerHTML = '';
    transactions.forEach(transaction => {
        const transactionNode = createTransactionNode(transaction);
        list.appendChild(transactionNode);
    });
    updateTotals();
}

// Event listener for the Add button
addBtn.addEventListener('click', addTransaction);

// Initial render to populate UI on page load
render();