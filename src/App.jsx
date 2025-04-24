import { useState, useEffect } from "react";

export default function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [age, setAge] = useState(null);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const today = new Date();
    setDay(today.getDate().toString());
    setMonth((today.getMonth() + 1).toString());
    setYear(today.getFullYear().toString());
  }, []);
  
  // Update days in month 
  useEffect(() => {
    if (month && year) {
      const daysCount = new Date(parseInt(year), parseInt(month), 0).getDate();
      setDaysInMonth(daysCount);
      
     
      if (parseInt(day) > daysCount) {
        setDay(daysCount.toString());
      }
    }
  }, [month, year, day]);
  
  const calculateAge = () => {
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const currentDate = new Date();
    
    //birth date
    if (birthDate > currentDate) {
      setError(true);
      setAge(null);
      return;
    }
    
    setError(false);
    
    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();
    
    if (ageDays < 0) {
      const lastMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      ageDays += lastMonth.getDate();
      ageMonths--;
    }
    
    if (ageMonths < 0) {
      ageMonths += 12;
      ageYears--;
    }
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedBirthDate = birthDate.toLocaleDateString('en-US', options);
    const formattedCurrentDate = currentDate.toLocaleDateString('en-US', options);
    
    setAge({
      years: ageYears,
      months: ageMonths,
      days: ageDays,
      birthDate: formattedBirthDate,
      currentDate: formattedCurrentDate
    });
  };
  
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i);
    }
    
    return years;
  };
  
  const generateDays = () => {
    const days = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Age Calculator</h1>
        
        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <label htmlFor="day" className="block text-sm font-medium text-gray-700 mb-1">Day</label>
            <select
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {generateDays().map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">Month</label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {generateYears().map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
        
        {error && (
          <div className="text-red-500 text-sm mb-4">Please select a valid date of birth.</div>
        )}
        
        <button
          onClick={calculateAge}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition duration-200"
        >
          Calculate Age
        </button>
        
        {age && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <div className="text-gray-700">Today's Date: <span className="font-medium">{age.currentDate}</span></div>
            <div className="text-gray-700 mt-1">Birth Date: <span className="font-medium">{age.birthDate}</span></div>
            <div className="text-gray-800 font-semibold mt-3">
              Your age is: {age.years} years, {age.months} months, {age.days} days
            </div>
          </div>
        )}
      </div>
    </div>
  );
}