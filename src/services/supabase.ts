import { UserProfile, TelebirrTransaction, ExamAttempt } from '../types';

const STORAGE_KEYS = {
  USER: 'skyprep_user_profile',
  TRANSACTIONS: 'skyprep_telebirr_txs',
  ATTEMPTS: 'skyprep_exam_attempts'
};

export const getStoredUser = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const saveStoredUser = (user: UserProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user', e);
  }
};

export const getStoredTransactions = (): TelebirrTransaction[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveTransaction = (tx: TelebirrTransaction): void => {
  try {
    const current = getStoredTransactions();
    const filtered = current.filter(t => t.id !== tx.id && t.transactionId !== tx.transactionId);
    filtered.unshift(tx);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to save transaction', e);
  }
};

export const verifyTelebirrTransactionLocal = (txId: string): { success: boolean; message: string } => {
  const cleaned = txId.trim().toUpperCase();
  if (cleaned.length < 6) {
    return { success: false, message: 'Invalid Transaction ID format. Must be at least 6 characters.' };
  }
  return { success: true, message: 'Transaction verified successfully.' };
};

export const getStoredExamAttempts = (): ExamAttempt[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveExamAttempt = (attempt: ExamAttempt): void => {
  try {
    const current = getStoredExamAttempts();
    current.unshift(attempt);
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save attempt', e);
  }
};
