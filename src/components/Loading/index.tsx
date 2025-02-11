export function LoadingAnimation({ text = "Searching" }: { text?: string }) {
  return (
    <div className="flex coll aictr jcctr g-full">
      <div>
        <img src={window.location.origin + "/load.svg"} width={90} />
      </div>
      {text}
    </div>
  );
}
