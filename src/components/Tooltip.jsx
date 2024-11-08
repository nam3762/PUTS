export default function Tooltip({ children, style }) {
  return (
    <div
      className="tooltip ml-2 before:whitespace-pre-line before:content-[attr(data-tip)]"
      data-tip={children}
    >
      <span className={`btn btn-xs btn-circle text-sm h-5 w-5 ${style}`}>
        ?
      </span>
    </div>
  );
}
