import Transaction from "./Transaction.js";
import { appendFileSync, unlinkSync } from "node:fs";

class Account {
    #accountID;
    #balance;
    #transactions = [];


    constructor(id, balance = 0, initialTransaction = []) {
        this.#accountID = id;
        this.#balance = balance;
        this.#transactions = initialTransaction;
    }
    // Getters 
    getBalance() {
        return this.#balance;
    }

    getAccountId() {
        return this.#accountID;
    }

    getTransactions() {
        return this.#transactions;
    }
    // Increment the balance by the specified amount
    incrementBalance(amount) {
        this.#balance += amount;

    }

    // Decrease the balance by the specified amount but not exceed the balance
    decreaseBalance(amount) {
        if (this.#balance - amount >= 0) {
            this.#balance -= amount;
        }
    }

    // Method to record transaction
    recordTransaction(date, amount, type) {
        const transaction = new Transaction(this.#transactions.length + 1, date, amount, type, this.#balance);
        this.#transactions.push(transaction);
    }

    // Logging and writing to a file all the transactions of the account 
    // A print of the account statement is displayed in the console as well
    printAccountStatement() {
        // Delete the file if this exists
        unlinkSync("docs/userStatement.txt");

        const header = "date       || credit     || debit      || balance    ";
        // Create a file if it not exists and appends the header
        appendFileSync("docs/userStatement.txt", header + "\n");
        console.log(header);
        for (const transaction of this.#transactions.reverse()) {
            const date = transaction.getTransactionDate();
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
            const formattedCredit = transaction.getTransactionType() === "credit"
                ? `|| ${transaction.getTransactionAmount().toFixed(2).toString().padEnd(10, ' ')} ||            ||`
                : `||            || ${transaction.getTransactionAmount().toFixed(2).toString().padEnd(10, ' ')} ||`;

            const formattedBalance = transaction.getBalance().toFixed(2);

            const lineStatement = `${formattedDate} ${formattedCredit} ${formattedBalance}`
            console.log(lineStatement);
            // Appending the statement line to the file
            appendFileSync("docs/userStatement.txt", lineStatement + "\n");
        }

    }

    /*
    Displays the account statement with colored formatting:
    - credits and positive balances are displayed in green
    - debits and negative balances are displayed in red
    */
    formattedColor() {
        const header = "date       || credit     || debit      || balance    ";
        console.log(header);
        for (const transaction of this.#transactions) {
            const date = transaction.getTransactionDate();
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
            const formattedCredit = transaction.getTransactionType() === "credit"
                ? `|| \x1b[32m${transaction.getTransactionAmount().toFixed(2).toString().padEnd(10, ' ')}\x1b[0m ||            ||` // Green color for credit
                : `||            || \x1b[31m${transaction.getTransactionAmount().toFixed(2).toString().padEnd(10, ' ')}\x1b[0m ||`; // Red color for debit

            const formattedBalance = transaction.getBalance() >= 0
                ? `\x1b[32m${transaction.getBalance().toFixed(2)}\x1b[0m` // Green color for positive balance
                : `\x1b[31m${transaction.getBalance().toFixed(2)}\x1b[0m`; // Red color for negative balance

            const lineStatement = `${formattedDate} ${formattedCredit} ${formattedBalance}`;
            console.log(lineStatement);
        }
    }

}


export default Account;