import Account from "../../src/Account.js";
import User from "../../src/user.js";
import Transaction from "../../src/Transaction.js";
import { readFileSync } from "node:fs";

// A user can access their account and see the balance
describe("User", () => {
  let user;

  beforeEach(() => {
    user = new User("John", new Account(101, 1000, []));
  });

  it("should return the user account", () => {
    const account = user.getAccount();
    expect(account instanceof Account).toBe(true);
    expect(account.getBalance()).toBe(1000);
  });
});

describe("Deposit funds test", () => {
  it("should add 200 to the account balance and record the transaction with a specific date", () => {
    // Arrange
    const initialTransaction = new Transaction(
      1,
      new Date("4/7/2022"),
      200,
      "credit"
    );
    const userAccount = new Account(789, 1000, [initialTransaction]);
    const testUser = new User("John Doe", userAccount);
    const expectedBalance = 1200;
    const depositDate = new Date("14/7/2022");

    // Act
    testUser.depositFunds(depositDate, 200);

    // Assert
    // Check the balance
    expect(testUser.getAccount().getBalance()).toBe(expectedBalance);
    //Check if the transaction was recorded
    const transactions = testUser.getAccount().getTransactions();
    expect(transactions.length).toBe(2);
    expect(transactions[1].getTransactionType()).toBe(
      Transaction.validType.CREDIT
    );
    expect(transactions[1].getTransactionDate()).toEqual(depositDate);
  });
});

describe("Withdraw funds test", () => {
  it("should decrease the account balance by 500 and record the transaction with a specific date", () => {
    // Arrange
    const initialTransaction = new Transaction(
      2,
      new Date("10/7/2022"),
      200,
      "debit"
    );
    const testUser = new User(
      "Martin Luther",
      new Account(785, 1200, [initialTransaction])
    );
    const expectedBalance = 700;
    const depositDate = new Date("24/7/2022");

    // Act
    testUser.withdrawFunds(depositDate, 500);

    // Assert
    expect(testUser.getAccount().getBalance()).toBe(expectedBalance);

    //Check if the transaction was recorded
    const transactions = testUser.getAccount().getTransactions();
    expect(transactions.length).toBe(2);
    expect(transactions[1].getTransactionType()).toBe(
      Transaction.validType.DEBIT
    );
    expect(transactions[1].getTransactionDate()).toEqual(depositDate);
  });
});

describe("Withdraw funds test without exceeding the balance, but record the transaction", () => {
  it("should not be able to withdraw money if amount is more than the balance", () => {
    // Arrange
    const initialTransaction = new Transaction(
      3,
      new Date("10/8/2022"),
      200,
      "debit"
    );
    const testUser = new User(
      "Emily",
      new Account(987, 500, [initialTransaction])
    );
    const expectedBalance = 500;
    const depositDate = new Date("24/8/2022");

    // Act
    testUser.withdrawFunds(depositDate, 700);

    // Assert
    // Check if the balance remains de same
    expect(testUser.getAccount().getBalance()).toBe(expectedBalance);
    //Check if the transaction was recorded
    const transactions = testUser.getAccount().getTransactions();
    expect(transactions[1].getTransactionAmount()).toBe(700);
  });
});

describe("print transaction details test", () => {
  //Arrange
  let userAccount;
  let testUser;

  beforeEach(() => {
    userAccount = new Account(108, 1700, []);
    testUser = new User("Chris", userAccount);
  });

  it("should call printAccountStatement when user.printAccountStatement is invoked", () => {
    spyOn(userAccount, "printAccountStatement");

    // Act
    testUser.printAccountStatement();

    // Assert
    expect(userAccount.printAccountStatement).toHaveBeenCalled();
  });
});

describe("Validate the transactions statement in an external file", () => {
  it("should be able to check the content of the file", () => {
    // Arrange
    const trans = new Transaction(1, new Date("4/7/2022"), 700, "credit", 700);
    const trans1 = new Transaction(2, new Date("10/7/2022"), 200, "debit", 500);
    const trans2 = new Transaction(3, new Date("10/8/2022"), 200, "debit", 300);

    const account = new Account(1, 0, [trans, trans1, trans2]);
    const testUser = new User("Chris", account);
    const expectedText =
      "date       || credit     || debit      || balance    \n" +
      "08/10/2022 ||            || 200.00     || 300.00\n" +
      "07/10/2022 ||            || 200.00     || 500.00\n" +
      "07/04/2022 || 700.00     ||            || 700.00\n";

    // Act
    testUser.printAccountStatement();

    // Assert
    expect(readFileSync("docs/userStatement.txt", "utf8")).toBe(expectedText);
  });
});


// NB: I have abandoned this test as a good way to test it was to display the bank statement and observe if it is colored as required.


// describe("Validate the transaction statement in the appropriate coloring format", () => {
    
//     let mockTestUser; 

//       // create a mock obj
//       const mockAccount = {
//         accountId: "123",
//         balance: 100,
//         transactions: [],
//       };
  
//     beforeEach(() => {
//       mockTestUser = {
//         userName: "Chris",
//         account: mockAccount,
//         depositFunds: "depositFunds",
//         withdrawFunds: "withdrawFunds",
//         printAccountStatement:"printAccountStatement"
//       };

//     mockTestUser.depositFunds = jasmine.createSpy("depositFunds", mockTestUser.depositFunds);
//     mockTestUser.withdrawFunds = jasmine.createSpy("withdrawFunds", mockTestUser.withdrawFunds)
//     mockTestUser.printAccountStatement = jasmine.createSpy("printAccountStatement", mockTestUser.printAccountStatement);
    
//     });
  
//     it("should call depositFunds method when depositing money", () => {
//       mockTestUser.depositFunds(new Date("10/8/2022"), 50);
//       expect(mockTestUser.depositFunds).toHaveBeenCalledWith(new Date("10/8/2022"), 50);
//     });
  
//     it("should call withdrawFunds method when withdrawing money", () => {
//       mockTestUser.withdrawFunds(new Date("14/8/2022"), 50);
//       expect(mockTestUser.withdrawFunds).toHaveBeenCalledWith(new Date("14/8/2022"), 50);
//     });
  
//     it("should call printAccountStatement method when printing the account statement", () => {
//       mockTestUser.printAccountStatement();
//       expect(mockTestUser.printAccountStatement).toHaveBeenCalled();
//     });
//   });
  