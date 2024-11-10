import { forwardRef, useState, useEffect } from "react";

const TimeSelector = forwardRef(function (
  { title, timeType, name, weekdays, periodLabels, value = [], onChange },
  ref
) {
  // 선택된 시간들을 상태로 관리
  const [selectedTimes, setSelectedTimes] = useState([]);

  // value prop이 변경될 때마다 selectedTimes 상태를 업데이트
  useEffect(() => {
    setSelectedTimes(Array.isArray(value) ? value : []);
  }, [value]);

  const toggleTime = (dayIndex, periodIndex) => {
    const exists = selectedTimes.some(
      (t) => t[0] === dayIndex && t[1] === periodIndex
    );
    const newSelectedTimes = exists
      ? selectedTimes.filter(
          (t) => !(t[0] === dayIndex && t[1] === periodIndex)
        )
      : [...selectedTimes, [dayIndex, periodIndex]];
    setSelectedTimes(newSelectedTimes);
    onChange(newSelectedTimes); // 부모 컴포넌트로 변경된 값 전달
  };

  const toggleAllDay = (dayIndex, checked) => {
    const newSelectedTimes = checked
      ? [
          ...selectedTimes.filter((t) => t[0] !== dayIndex),
          ...periodLabels.map((_, periodIndex) => [dayIndex, periodIndex]),
        ]
      : selectedTimes.filter((t) => t[0] !== dayIndex);
    setSelectedTimes(newSelectedTimes);
    onChange(newSelectedTimes); // 부모 컴포넌트로 변경된 값 전달
  };

  const isTimeSelected = (dayIndex, periodIndex) => {
    return selectedTimes.some((t) => t[0] === dayIndex && t[1] === periodIndex);
  };

  const isDayFullySelected = (dayIndex) => {
    return periodLabels.every((_, periodIndex) =>
      isTimeSelected(dayIndex, periodIndex)
    );
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
                  checked={isDayFullySelected(dayIndex)}
                  onChange={(e) => toggleAllDay(dayIndex, e.target.checked)}
                  className="checkbox mr-2"
                />
                <span className="font-semibold text-base-content text-sm">
                  {day}
                </span>
              </div>
              {periodLabels.map((period, periodIndex) => (
                <div
                  key={periodIndex}
                  onClick={() => toggleTime(dayIndex, periodIndex)}
                  className={`btn bg-base-100 w-full flex items-center justify-center cursor-pointer ${
                    timeType === "offTimes"
                      ? "hover:bg-error"
                      : "hover:bg-success"
                  } my-1 ${
                    isTimeSelected(dayIndex, periodIndex)
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
