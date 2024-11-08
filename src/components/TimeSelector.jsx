import { forwardRef } from "react";

const TimeSelector = forwardRef(function (
  { title, timeType, name, weekdays, periodLabels, value = [], onChange },
  ref
) {
  // value가 배열인지 확인하고, 그렇지 않으면 빈 배열로 설정
  const timeValues = Array.isArray(value) ? value : [];

  const toggleTime = (day, period) => {
    const newValue = timeValues.some(
      (t) => t.day === day && t.period === period
    )
      ? timeValues.filter((t) => !(t.day === day && t.period === period))
      : [...timeValues, { day, period }];
    onChange(newValue);
  };

  const toggleAllDay = (day, checked) => {
    const newValue = checked
      ? [
          ...timeValues.filter((t) => t.day !== day),
          ...periodLabels.map((period) => ({ day, period })),
        ]
      : timeValues.filter((t) => t.day !== day);
    onChange(newValue);
  };

  const isTimeSelected = (day, period) => {
    return timeValues.some((t) => t.day === day && t.period === period);
  };

  const isDayFullySelected = (day) => {
    return periodLabels.every((period) => isTimeSelected(day, period));
  };

  return (
    <div className="w-1/2 flex justify-center">
      <details className="dropdown mb-4 text-center">
        <summary className="btn btn-primary mb-4 min-w-40">{title}</summary>
        <div className="grid grid-cols-5 gap-4">
          {weekdays.map((day, dayIndex) => (
            <div key={dayIndex} className="flex flex-col">
              <div className="flex items-center justify-center mb-2">
                <input
                  type="checkbox"
                  checked={isDayFullySelected(day)}
                  onChange={(e) => toggleAllDay(day, e.target.checked)}
                  className="checkbox mr-2"
                />
                <span className="font-semibold text-base-content text-sm">
                  {day}
                </span>
              </div>
              {periodLabels.map((period, periodIndex) => (
                <div
                  key={periodIndex}
                  onClick={() => toggleTime(day, period)}
                  className={`btn bg-base-100 w-full flex items-center justify-center cursor-pointer ${
                    timeType === "offTimes"
                      ? "hover:bg-error"
                      : "hover:bg-success"
                  } my-1 ${
                    isTimeSelected(day, period)
                      ? `${timeType === "offTimes" ? "bg-error" : "bg-success"}`
                      : "bg-base-100"
                  }`}
                >
                  {period}
                </div>
              ))}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
});

export default TimeSelector;
