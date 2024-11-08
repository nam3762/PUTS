import Button from "./Button";

export default function Pagination({
  currentIndex,
  handleFirst,
  handleLast,
  handlePageChange,
  getVisiblePages,
}) {
  return (
    <div className="flex justify-center items-center space-x-2 -mt-8">
      <Button
        onClick={handleFirst}
        className="btn-neutral btn-circle btn-xs text-xs"
      >
        {`<<`}
      </Button>
      <div className="join">
        {getVisiblePages().map((index) => (
          <input
            key={index}
            className="join-item btn btn-square -mt-4"
            type="radio"
            name="options"
            aria-label={index + 1}
            checked={currentIndex === index}
            onChange={() => handlePageChange(index)}
          />
        ))}
      </div>
      <Button
        onClick={handleLast}
        className="btn-neutral btn-circle btn-xs text-xs"
      >
        {`>>`}
      </Button>
    </div>
  );
}
