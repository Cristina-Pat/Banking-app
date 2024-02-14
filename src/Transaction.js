
class Transaction {

    #transactionId
    #date;
    #amount;
    #balance;


    static validType = {
        CREDIT: 'credit',
        DEBIT: 'debit',
    };

    constructor(anId, date, amount, type, balance){
        this.#transactionId = anId;
        this.#date = date;
        this.#amount = amount;
        // check if the input type is valid, set 'credit' as default if not
        this.type = Transaction.validType[type.toUpperCase()] || Transaction.validType.CREDIT;
        this.#balance = balance;
    }

    getTransactionId(){
        return this.#transactionId;
    }

    getTransactionDate(){
        return this.#date;
    }

    getTransactionAmount() {
        return this.#amount;
    }

    getTransactionType(){
        return this.type;
    }

    getBalance(){
        return this.#balance;
    }
}

export default Transaction;