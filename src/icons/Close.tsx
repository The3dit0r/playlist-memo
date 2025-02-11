export const Close = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 41 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.color || "#fff"}
      {...props}
    >
      <path
        d="M25.4298 16.0783L20.3784 21.1297M15.3271 26.181L20.3784 21.1297M20.3784 21.1297L15.3271 16.0783M20.3784 21.1297L25.4298 26.181"
        strokeWidth="2.02054"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
