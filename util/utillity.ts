// Helper function to get the date range
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