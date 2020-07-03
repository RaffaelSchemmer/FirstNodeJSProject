import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    if (!transaction) {
      throw Error('This Account dont have balance necessary!');
    }
    return transaction;
  }
}

export default CreateTransactionService;
