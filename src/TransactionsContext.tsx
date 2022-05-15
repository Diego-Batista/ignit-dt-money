import { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from './services/api';

interface TransactionProps {
    id: number;
    title: string;
    amount: number;
    category: string;
    createdAt: string;
    type: string;
}
 
interface TransactionsProviderProps {
    children: ReactNode;
}
type TransactionInput = Omit<TransactionProps, 'id' | 'createdAt'>;

interface TransactionsContextData {
    transactions: TransactionProps[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

//interface TransactionInput {
//    title: string;
//    amount: number;
//    category: string;
//    type: string;
//} 

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transitions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        });
        
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );
}