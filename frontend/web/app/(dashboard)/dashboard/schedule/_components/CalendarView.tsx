'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const scheduledPosts = {
    5: [{ platform: 'Instagram', time: '3:00 PM' }],
    12: [{ platform: 'Twitter', time: '9:00 AM' }, { platform: 'LinkedIn', time: '2:00 PM' }],
    18: [{ platform: 'Facebook', time: '11:00 AM' }],
    25: [{ platform: 'Instagram', time: '5:00 PM' }, { platform: 'Twitter', time: '7:00 PM' }],
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square p-2 bg-muted/20 rounded-lg"></div>
      );
    }

    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasScheduled = scheduledPosts[day as keyof typeof scheduledPosts];
      const isToday =
        day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      days.push(
        <motion.div
          key={day}
          className={`aspect-square p-2 rounded-lg border cursor-pointer transition-all ${
            isToday
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary/50'
          }`}
          style={{ backgroundColor: hasScheduled ? 'rgb(var(--accent) / 0.1)' : 'rgb(var(--card))' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col h-full">
            <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-primary' : 'text-foreground'}`}>
              {day}
            </div>
            {hasScheduled && (
              <div className="flex-1 flex flex-col gap-1">
                {hasScheduled.slice(0, 2).map((post, idx) => (
                  <div
                    key={idx}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium truncate"
                  >
                    {post.platform}
                  </div>
                ))}
                {hasScheduled.length > 2 && (
                  <div className="text-[10px] text-muted-foreground">
                    +{hasScheduled.length - 2} more
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return days;
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={previousMonth}
            className="p-2 rounded-lg border border-border hover:bg-accent/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            onClick={nextMonth}
            className="p-2 rounded-lg border border-border hover:bg-accent/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary/20 border border-primary"></div>
          <span className="text-muted-foreground">Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-accent/20 border border-accent"></div>
          <span className="text-muted-foreground">Scheduled</span>
        </div>
      </div>
    </div>
  );
}
