import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 * @param inputs - Class names to combine
 * @returns A merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}

/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes - The size in bytes
 * @returns A formatted string with the appropriate unit (Bytes, KB, MB, GB, TB)
 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  // Determine the appropriate unit by calculating the log
  const i: number = Math.floor(Math.log(bytes) / Math.log(k));
  
  // Format with 2 decimal places and round
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Generates a random UUID
 * @returns A random UUID string
 */
export const generateUUID = (): string => {
  return crypto.randomUUID();
};