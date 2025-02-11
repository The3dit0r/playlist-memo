export const Library = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="41"
      height="42"
      viewBox="0 0 41 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || "#fff"}
      {...props}
    >
      {" "}
      <path
        d="M11.7349 12.2324V29.5193"
        strokeWidth="2.02054"
        strokeLinecap="round"
        strokeLinejoin="round"
      />{" "}
      <path
        d="M17.4973 12.2324V29.5193"
        strokeWidth="2.02054"
        strokeLinecap="round"
        strokeLinejoin="round"
      />{" "}
      <path
        d="M23.2595 29.5193V12.2324L29.0218 16.2217V29.5193H23.2595Z"
        strokeWidth="2.02054"
        strokeLinecap="round"
        strokeLinejoin="round"
      />{" "}
    </svg>
  );
};
