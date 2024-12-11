import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Extract date components from the input string (YYYY-MM-DDTHH:MM:SS)
  const [datePart] = dateString.split("T");  // Get the date part (YYYY-MM-DD)
  const [month, day] = datePart.split("-");  // Split it into year, month, and day

  // Get the abbreviated month name and format the date
  const monthName = months[parseInt(month, 10) - 1];  // Month is 1-indexed, so subtract 1
  return `${monthName}. ${parseInt(day, 10)}`;  // Return formatted string like "Nov. 24"
}