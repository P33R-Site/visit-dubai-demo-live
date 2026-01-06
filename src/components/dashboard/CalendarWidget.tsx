import React from 'react';

interface CalendarWidgetProps {
    tripStart?: number;
    tripEnd?: number;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({ tripStart: initialStart = 5, tripEnd: initialEnd = 9 }) => {
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const [range, setRange] = React.useState<{ start: number | null, end: number | null }>({ start: initialStart, end: initialEnd });

    const handleDateClick = (day: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent opening dashboard details
        if (!range.start || (range.start && range.end)) {
            // New selection start
            setRange({ start: day, end: null });
        } else {
            // Complete selection
            if (day < range.start) {
                setRange({ start: day, end: range.start });
            } else {
                setRange({ start: range.start, end: day });
            }
        }
    };

    return (
        <div className="h-full p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-text-primary dark:text-white font-medium">June 2026</h3>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-text-muted dark:text-white/40 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={`${d}-${i}`}>{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-1 flex-1 content-start">
                {days.map(day => {
                    const isStart = day === range.start;
                    const isEnd = day === range.end;
                    const isRange = range.start && range.end && day > range.start && day < range.end;
                    const isSelected = isStart || isEnd;

                    return (
                        <div
                            key={day}
                            onClick={(e) => handleDateClick(day, e)}
                            className={`
                        flex items-center justify-center text-xs rounded-full w-full aspect-square max-w-[2rem] mx-auto transition-all cursor-pointer
                        ${isSelected ? 'bg-primary text-surface font-bold scale-110 shadow-lg shadow-primary/20' : ''}
                        ${isRange ? 'bg-primary/10 dark:bg-primary/20 text-primary' : ''}
                        ${!isSelected && !isRange ? 'text-text-secondary dark:text-white/60 hover:bg-surface-alt dark:hover:bg-white/5' : ''}
                    `}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
