# Domain Models and Test Plan

Content: 
1. [Client Presentation](#client-presentation)
2. [Core Features](#core-features)

    2.1. [User Story 1: Domain Model, Tests](#user-story-1)

    2.2. [User Story 2: Domain Model, Tests](#user-story-2)

    2.3. [User Story 3: Domain Model, Tests](#user-story-3)

    2.4. [User Story 4: Domain Model, Tests](#user-story-4)

3. [Additional Features](#additional-features)

    3.1. [User Story 5: Domain Model, Tests](#user-story-5)

4. [Stages of Implemented Solution](#stages-of-implemented-solution)
5. [Using AI for Additional Features - Reflections](#using-ai-for-additional-features---reflections)


## Client Presentation ##

**Problem**

The challenge at hand involves developing a banking prototype application equipped with account management, fund transactions, account statement printing, and transaction details storage features for the software company's clients. The objective is to clearly articulate the advantages of this software for both the client organization and individual end-users.

**Benefits to the Client (Business or Organization)**

*Efficient Account Management*\
 The software streamlines account management processes, allowing the client to efficiently oversee user accounts, transactions, and statements. Furthermore, users can benefit from a colored version of the account statement in the terminal, providing a visually intuitive and user-friendly experience.

*Enhanced Customer Service*\
 With features such as account access, depositing, and withdrawing funds, the client can provide improved customer service, promptly and effectively addressing the needs of their users.

*Improved Record-Keeping*\
 Automated account statements and transaction history, saved in an external document, contribute to enhanced record-keeping for the client, reducing manual efforts and minimizing errors.

*Compliance and Reporting*\
 The software can incorporate features to assist with compliance requirements and generate reports, customizable based on the specific criteria outlined in the Acceptance Criteria for user statements.

**Benefits to the End User (Individual Customers)**

*Convenient Account Access*\
 End users can easily access their accounts, check balances, and perform transactions without the need to visit a physical branch, providing convenience and accessibility. Additionally, users benefit from a colored printed statement in the terminal, enhancing visibility and clarity of their financial transactions.

*Time and Cost Savings*\
With the ability to perform various banking tasks online, end users can save time and potentially reduce transaction costs associated with physical banking.

*Real-Time Transaction Updates*\
 The software provides real-time updates on transactions, enabling end users to stay informed about their financial activities promptly.

*Financial Planning*\
 Access to detailed account statements and transaction histories allows end users to analyze their financial behavior, aiding in better financial planning and decision-making.


## Core Features

### User Stories -> Domain Models -> Tests

### User story 1 ###
**US1** - As a banking app user I want to be able to access my account, so that I can quickly view my account details.

**Domain Model - DM1**
Object | Properties | Message | Output |
| --- | --- | --- | --- |
| User | userName@String, userId@Integer, account@Account |  getAccount() | @Account |
| Account | accountId@Integer, balance@Integer, transactions@Array[@Transaction] | | |
| Transaction| transactionId@Integer, date@Date, amount@Integer, type@Credit or @Debit | | |

**Tests**\
**Test 1** - Check if the balance of the account associated with a given user is correct.



### User story 2 ###
**US2** - As a banking app user, I want to be able to deposit funds into my account, so that I can add money to my account.

**Domain Model - DM2**
Object | Properties | Message | Output |
| --- | --- | --- | --- |
| User | userName@String, userId@Integer, account@Account |  depositFunds(amount) | @Void |
| Account | accountId@Integer, balance@Integer, transactions@Array[@Transaction] | depositFunds(amount) | @Void |
| Transaction| transactionId@Integer, date@Date, amount@Integer, type@Credit or @Debit | | |

**Tests**\
**Test 1** - Check that depositing funds in the user's account correctly updates the balance.

### User story 3 ###
**US3** - As a banking app user, I want to withdraw funds from my account so that I can manage my transactions responsibly and avoid exceeding my balance.

**Domain Model - DM3**
| Object | Properties | Message | Output |
| --- | --- | --- | --- |
| User | userName@String, userId@Integer, account@Account |  withdrawFunds(amount) | @Void |
| Account | accountId@Integer, balance@Integer, transactions@Array[@Transaction] | withdrawFunds(amount)| @Void |
| Transaction| transactionId@Integer, date@Date, amount@Integer, type@Credit or @Debit | | |

**Tests**\
**Test 1** - Check that withdrawing funds in the user's account correctly updates the balance.
**Test 2** - Check that withdrawing funds does not result in a balance exceeding the available funds in the account.

### User story 4 ###
**US4** As a banking app user, I want to be able to print an account statement and that includes transaction details such as date, amount, and balance, and save it externally, so that I can review my financial transactions.

**Domain Model - DM3**
| Object | Properties | Message | Output |
| --- | --- | --- | --- |
| User | userName@String, userId@Integer, account@Account |  printAccountStatement() | @Void |
| Account | accountId@Integer, balance@Integer, transactions@Array[@Transaction] | printAccountStatement()| @Void |
| Transaction| transactionId@Integer, date@Date, amount@Integer, type@Credit or @Debit | | |

**Tests**\
**Test 1** - Check that the printAccountStatement method is called when user.printAccountStatement is invoked.
**Test2** - Record the transactions statement in an external file.
**Acceptance Criteria for US4** - Verify that the printed statement in the console matches the format specified in the README.md file.
For this test the index.js should be run.

## Additional  Features

### User story 5 ###
**US5** - As a banking app user, I want the statement to display credits and positive balances in green, and debits and negative balances in red for quick and clear differentiation.

**Domain Model - DM5**
Object | Properties | Message | Output |
| --- | --- | --- | --- |
| User | userName@String, userId@Integer, account@Account |  printColorAccountStatement() | @Void |
| Account | accountId@Integer, balance@Integer, transactions@Array[@Transaction] | formattedColor() | @Void |
| Transaction| transactionId@Integer, date@Date, amount@Integer, type@Credit or @Debit | | |

**Tests**\
**Test 1** - Check that depositing funds in the user's account correctly color the balance. 
I have abandoned this test as a good way to test this case was to display the bank statement and observe if it is colored as required.
**Test 2** -  Display a colored version of the bank statement in the terminal.


## Stages of Implemented Solution ##

I used a Kanban board on Trello to oversee my workload. The provided evidence illustrates the distribution of tasks throughout the allocated time.

![Initial Kanban Board](/docs/images/240123.png)
Figure 1: Initial Kanban Board

![Day 2 Kanban Board](/docs/images/240124.png)
Figure 2: Day 2 Kanban Board

![Day 3 Kanban Board](/docs/images/240125.png)
Figure 3: Day 3 Kanban Board

![Final Kanban Board](/docs/images/240125.png)
Figure 4: Final Kanban Board

The Trello Kanban Board can be accessed at: 
[Trello Board](https://trello.com/b/ExXsBeGy/bank-challenge)

## Using AI for Additional Features - Reflections ##

For User Story 5, which involves displaying colored credit, debit, and balance, I opted not to rely on Copilot for generating the unit test (as shown in Figure 5). Although the suggested test was good, I had already created a similar test for the user story related to printing the user statement. Consequently, I chose to manually implement a colored print user statement in the console, as shown in Figure 6.

![US5 -  Copilot suggestion](/docs/images/test%20suggestion%20copilote.JPG)
Figure 5: Copilot test suggestion

![Implementation of US5 in the terminal display](/docs/images/us5%20implementation%20.png)
Figure 6: Implementation of US5 in the terminal display

I am not keen on using Copilot for my code as I am committed to learning how to implement solutions by writing my own code. Additionally, I find value in understanding and adapting code to meet specific requirements, a process that Copilot may not fully comprehend due to its limitations in handling all possible scenarios.