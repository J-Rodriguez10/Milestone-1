// utils/dateUtils.js
import moment from 'moment'; 


/**
 * Helper function to get the date range for a given year and month.
 * 
 * @param {number} currentYear - The year for which the date range is required.
 * @param {number} currentMonth - The month (0-indexed) for which the date range is required.
 * @returns {[string, string]} - An array containing the start date and end date in "YYYY-MM-DD" format.
 * 
 * Purpose:
 * - Determines the first and last day of the specified month.
 * - If the month is the current month, the end date is today; otherwise, it’s the last day of the month.
 * 
 * Usage:
 * - Useful for APIs or data fetching that require a date range.
 */
export function getDateRange(currentYear: number, currentMonth: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to midnight local time to avoid time shift issues

  const isCurrentMonth =
    currentYear === today.getFullYear() && currentMonth === today.getMonth();

  // Start date is the first day of the current month
  const startDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`;

  // End date: today’s date if it's the current month; otherwise, the last day of the current month
  const endDate = isCurrentMonth
    ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
    : `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(new Date(currentYear, currentMonth + 1, 0).getDate()).padStart(2, "0")}`;

  return [ startDate, endDate ];
}

/**
 * Helper function to get the name of a month from its index.
 * 
 * @param {number} monthIndex - The index of the month (0 = January, 11 = December).
 * @returns {string} - The abbreviated name of the month, or "Invalid month" if the index is out of range.
 * 
 * Purpose:
 * - Converts a numeric month index into a human-readable abbreviated name.
 * 
 * Usage:
 * - Useful for formatting or displaying month names in the UI.
 */
export function getMonthName(monthIndex: number): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ]
  return months[monthIndex] || "Invalid month"
}

/**
 * Converts an ISO 8601 timestamp to a human-readable format
 * @param {string} timestamp - The timestamp in ISO 8601 format (e.g., "2024-11-21T19:07Z")
 * @returns {string} - The human-readable date string
 */
export function convertTimestampToReadableDate(timestamp: string) {
  if (!timestamp) return '';

  return moment(timestamp).format('dddd, MMMM D, YYYY, h:mm:ss A [UTC]');
};

/**
 * Helper function to get today's date in "YYYY-MM-DD" format.
 * 
 * @returns {string} - The current date in "YYYY-MM-DD" format.
 * 
 * Purpose:
 * - Provides a standardized format for the current date.
 * 
 * Usage:
 * - Useful for data filtering or date-specific operations.
 */
export function getTodaysDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}