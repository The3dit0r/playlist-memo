export const Home = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M25.6729 29.2946H29.0405C29.9704 29.2946 30.7243 28.5408 30.7243 27.6108V20.1024C30.7243 19.6071 30.5062 19.1369 30.1281 18.817L21.7092 11.6933C21.0814 11.1621 20.1618 11.1621 19.534 11.6933L11.115 18.817C10.737 19.1369 10.5189 19.6071 10.5189 20.1024V27.6108C10.5189 28.5408 11.2727 29.2946 12.2027 29.2946H15.5702"
        strokeWidth="2.3573"
        strokeLinecap="round"
        strokeLinejoin="round"
      />{" "}
    </svg>
  );
};
