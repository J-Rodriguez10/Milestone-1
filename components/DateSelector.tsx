import { useState, useEffect } from "react"

import Button from "./Button"

interface DateSelectorProps {
  // Function to call when the user selects a date
  onDateChange: (year: number, month: number) => void
  // Props to reflect the current year and month
  currentYear: number
  currentMonth: number
}

function DateSelector({
  onDateChange,
  currentYear,
  currentMonth,
}: DateSelectorProps) {
  // State to manage the selected year and month
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [error, setError] = useState("")

  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth()

  // Sync internal state when currentYear or currentMonth changes
  useEffect(() => {
    setSelectedYear(currentYear)
    setSelectedMonth(currentMonth)
  }, [currentYear, currentMonth])

  // Function to handle confirmation of the selected date
  const handleConfirm = () => {
    const currentDate = new Date(todayYear, todayMonth)
    const selectedDate = new Date(selectedYear, selectedMonth)

    // Validate that the selected date is not in the future
    if (selectedDate > currentDate) {
      setError("You cannot select a future date.")
    } else {
      setError("")
      // Notify the parent component of the date change
      onDateChange(selectedYear, selectedMonth)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Dropdown to select a month */}
      <select
        value={selectedMonth}
        onChange={e => setSelectedMonth(Number(e.target.value))}
        className="rounded border border-gray-300 p-2"
      >
        {Array.from({ length: 12 }, (_, index) => (
          <option key={index} value={index}>
            {new Date(0, index).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>

      {/* Input field to select a year */}
      <input
        type="number"
        value={selectedYear}
        onChange={e => setSelectedYear(Number(e.target.value))}
        className="w-20 rounded border border-gray-300 p-2"
        min="1995" // NASA's APOD starts from 1995
        max={todayYear} // Prevent selecting future years
      />

      {/* Button to confirm the selection */}
      <Button onClick={handleConfirm} variant="greenYellow">Go</Button>

      {/* Display an error message if the date is invalid */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default DateSelector
