const Grid = ({
  classNames,
}: {
  classNames?: { path?: string; svg?: string };
}) => {
  return (
    <svg
    className={classNames?.svg}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={classNames?.path}
        d="M8 1H1V8H8V1Z"
        stroke="#030515"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        className={classNames?.path}
        d="M19 1H12V8H19V1Z"
        stroke="#030515"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        className={classNames?.path}
        d="M19 12H12V19H19V12Z"
        stroke="#030515"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        className={classNames?.path}
        d="M8 12H1V19H8V12Z"
        stroke="#030515"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Grid;
