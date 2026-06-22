class BankAccount{
    constructor(){
        this.balance = 0;
        this.transactions = [];
    }

    deposit(amount){
        if(amount>0){
            const transaction = {
                type: "deposit",
                amount: amount
            }

            this.transactions.push(transaction);
            this.balance += amount;

            return `Successfully deposited \$${amount}. New balance: \$${this.balance}`;
        }
        else{
            return "Deposit amount must be greater than zero.";
        }
    }

    withdraw(amount){
        if(amount>0 && amount<=this.balance){
            const transaction = {
                type: "withdraw",
                amount: amount
            }

            this.transactions.push(transaction);
            this.balance -= amount;

            return `Successfully withdrew \$${amount}. New balance: \$${this.balance}`;
        }
        else{
            return "Insufficient balance or invalid amount.";
        }
    }

    checkBalance(){
        return `Current balance: \$${this.balance}`;
    }

    listAllDeposits(){
        let depositString = "Deposits: ";

        this.transactions.forEach(el => {
            if(el.type == "deposit"){
                depositString += el.amount + "  ";
            }

        })

        depositString = depositString.trim().replaceAll("  ", ",")

        return depositString;
    }

    listAllWithdrawals(){
        let withdrawString = "Withdrawals: ";

        this.transactions.forEach(el => {
            if(el.type == "withdraw"){
                withdrawString += el.amount + "  ";
            }
        })

        withdrawString = withdrawString.trim().replaceAll("  ", ",")
        return withdrawString;

    }
}

const myAccount = new BankAccount();

myAccount.deposit(100);
myAccount.withdraw(10);
myAccount.withdraw(5);
myAccount.deposit(15);
myAccount.withdraw(15);
myAccount.deposit(100);