import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: 'string';
  type: 'income' | 'outcome';
  value: number;
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
    const income = this.transactions.reduce((total, transaction) => {
      const { value } = transaction;

      if (transaction.type === 'income') {
        return total + value;
      }
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, transaction) => {
      const { value } = transaction;

      if (transaction.type === 'outcome') {
        return total + value;
      }
      return total;
    }, 0);

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (!['income', 'outcome'].includes(type)) {
      throw Error('The type should be income or outcome');
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
