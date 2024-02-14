
import Account from "./Account.js";

class User {

    #userName;
    // A static variable to keep track of the next available user ID
    static #nextUserId = 100;
    // 
    #account;

    constructor(aName, account) {
        this.#userName = aName;
        // Assign a new user ID using the generateUserId() method
        this.userId = this.generateUserId();
        this.#account = account;

    }

    // Private static method to generate a new user ID, incrementing by 1 the nextUserId
    generateUserId() {
        return User.#nextUserId++;
    }

    // Getters to retrieve the user's properties
    getUserName() {
        return this.#userName;
    }

    getUserId() {
        return this.userId;
    }

    getAccount() {
        return this.#account;
    }

    setAccount(account) {
        this.#account = account;
    }

    // Method to deposit funds into the associated account and record transaction; delegates the operations to the Account methods
    depositFunds(date, amount) {
        this.getAccount().incrementBalance(amount);
        this.getAccount().recordTransaction(date, amount, "credit", this.getAccount().getBalance());

    }

    // Method to withdraw funds from the associated account and record transaction; delegates the operations to the Account methods
    withdrawFunds(date, amount) {
        this.getAccount().decreaseBalance(amount);
        this.getAccount().recordTransaction(date, amount, "debit", this.getAccount().getBalance());

    }
    // Method for printing the transactions associated with the account and recording them into a file
    printAccountStatement(){
        this.getAccount().printAccountStatement();
    }

    // Method for printing the transactions associated with the account and display them in the color format
    printColorAccountStatement(){
        this.getAccount().formattedColor();
    }

}

export default User;