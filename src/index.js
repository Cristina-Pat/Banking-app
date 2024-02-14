import User from "./user.js";
import Account from "./Account.js";

//Acceptance criteria

//Given a client makes a deposit of 1000 on 10-01-2012 
const account = new Account(1, 0, [])
const testUser = new User("Chris", account);
testUser.depositFunds(new Date('2012-01-10'), 1000, 'credit');
//And a deposit of 2000 on 13-01-2012 
testUser.depositFunds(new Date('2012-01-13'), 2000, 'credit');
//And a withdrawal of 500 on 14-01-2012 
testUser.withdrawFunds(new Date('2012-01-14'), 500, 'debit');

//When she prints her bank statement
testUser.printAccountStatement();

//Then she would see - check the terminal and the userStatement.txt on docs

// If she wants a color version of her bank statement in terminal, then she would see
console.log(" ================ ");
testUser.printColorAccountStatement();