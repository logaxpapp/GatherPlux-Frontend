import React, { useState } from 'react';
import { Button } from './button';
import { FaRegClock as Clock, FaCheck as Check } from 'react-icons/fa6';
import { cn } from '../../utils/utility';

interface TimePickerProps {
  handleSetTime: (time: string) => void;
  selectedTime?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  handleSetTime,
  selectedTime,
}) => {
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);

  // Generate times with 30-minute intervals (24-hour format)
  const generateTimeSlots = () => {
    const times = [];
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const hoursStr = hours.toString().padStart(2, '0');
        const minutesStr = minutes.toString().padStart(2, '0');
        times.push(`${hoursStr}:${minutesStr}`);
      }
    }
    return times;
  };

  // Format time for display (12-hour format)
  const formatTimeFor12Hour = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hoursNum = parseInt(hours);
    const period = hoursNum >= 12 ? 'PM' : 'AM';
    const hours12 = hoursNum % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  const timeSlots = generateTimeSlots();

  // Group times by AM/PM
  const groupedTimeSlots = timeSlots.reduce((acc, time) => {
    const period = parseInt(time.split(':')[0]) >= 12 ? 'PM' : 'AM';
    if (!acc[period]) acc[period] = [];
    acc[period].push(time);
    return acc;
  }, {} as { [key: string]: string[] });

  const handleSelectedTime = (time: string) => {
    const formattedTime = formatTimeFor12Hour(time);
    handleSetTime(formattedTime);
  };

  return (
    <div className='w-72 rounded-md bg-[#eeeded] overflow-hidden text-black'>
      {/* Header */}
      <div className='p-4 bg-[#9EDD45]'>
        <div className='flex items-center gap-2 mb-2'>
          <Clock className='w-5 h-5 text-white' />
          <span className='text-lg font-semibold text-white'>Select Time</span>
        </div>
      </div>

      {/* Time slots */}
      <div className='h-80 overflow-y-auto'>
        <div className='p-2'>
          {Object.entries(groupedTimeSlots).map(([period, times]) => (
            <div key={period} className='mb-4'>
              <div className='px-3 py-2 text-sm font-semibold text-gray-700'>
                {period}
              </div>
              <div className='space-y-1'>
                {times.map((time) => {
                  const isSelected = selectedTime === time;
                  const isHovered = hoveredTime === time;

                  return (
                    <Button
                      key={time}
                      variant='ghost'
                      className={cn(
                        'w-full justify-between text-left py-3 px-4 rounded-lg transition-all duration-200',
                        'hover:bg-white hover:text-[#9EDD45]',
                        isSelected &&
                          'bg-white font-bold text-[#9EDD45] hover:bg-blue-100',
                        'group relative',
                      )}
                      onClick={handleSelectedTime.bind(null, time)}
                      onMouseEnter={() => setHoveredTime(time)}
                      onMouseLeave={() => setHoveredTime(null)}
                    >
                      <span className='text-sm font-medium'>
                        {formatTimeFor12Hour(time)}
                      </span>
                      <div
                        className={cn(
                          'absolute right-4 opacity-0 transition-opacity duration-200',
                          (isSelected || isHovered) && 'opacity-100',
                        )}
                      >
                        <Check
                          className={cn(
                            'w-4 h-4',
                            isSelected ? 'text-[#9EDD45]' : 'text-gray-600',
                          )}
                        />
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
