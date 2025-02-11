export default function HomePanel() {
  return (
    <div className="content-wrapper">
      <GreetingsHeader />
      <p>This is where you find your recommendation for the day</p>
    </div>
  );
}

function GreetingsHeader() {
  const greets = ["morning", "afternoon", "evening", "night"];
  let i = 0;

  const hours = new Date().getHours();

  // if (hours >= 5) i = 0;
  if (hours >= 13) i = 1;
  if (hours >= 18) i = 2;
  if (hours >= 21) i = 3;

  return <h1>Have a great {greets[i]}!</h1>;
}
