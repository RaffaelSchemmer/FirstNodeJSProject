import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = {} as Balance;
    balance.income = 0;
    balance.outcome = 0;

    for (const transaction of this.transactions) {
      if (transaction.type === 'income') balance.income += transaction.value;
      else balance.outcome += transaction.value;
      balance.total = balance.income - balance.outcome;
    }
    return balance;
  }

  public create({
    title,
    value,
    type,
  }: Omit<Transaction, 'id'>): Transaction | null {
    const transaction = new Transaction({ title, value, type });

    if (transaction.type === 'outcome') {
      if (this.getBalance().total >= transaction.value) {
        this.transactions.push(transaction);
        return transaction;
      }
    } else {
      this.transactions.push(transaction);
      return transaction;
    }
    return null;
  }
}

export default TransactionsRepository;
