export const Search = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || "#fff"}
      {...props}
    >
      {" "}
      <path
        d="M25.6545 25.0313C27.1921 23.4628 28.1402 21.3143 28.1402 18.9443C28.1402 14.1418 24.2471 10.2487 19.4446 10.2487C14.6421 10.2487 10.7489 14.1418 10.7489 18.9443C10.7489 23.7468 14.6421 27.64 19.4446 27.64C21.8771 27.64 24.0763 26.6411 25.6545 25.0313ZM25.6545 25.0313L30.7489 30.2487"
        strokeWidth="2.02054"
        strokeLinecap="round"
      />{" "}
    </svg>
  );
};
