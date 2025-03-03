import { Link, useLocation } from "react-router-dom";

type AProps = {
  id: string;
  type: string;
  name: string;
} & JSX.IntrinsicElements["a"];

export function ItemLink({ id, type, name, ...aProps }: AProps) {
  let pathname;
  try {
    pathname = useLocation().pathname;
  } catch {
    pathname = "%0DbGKsCaFaGtPC0exsT3HguR";
  }

  const url = `/${type}/${id}`;

  if (pathname === url || id === "0LyfQWJT6nXafLPZqxe9Of") {
    return <span>{name}</span>;
  }

  return (
    <Link {...aProps} to={url}>
      {name}
    </Link>
  );
}

export function ItemLinkList({
  items = [],
}: {
  items: { id: string; type: string; name: string }[];
}) {
  return (
    <div>
      {items.map((item, i) => (
        <>
          <ItemLink {...item} key={item.id} />
          {i + 1 === items.length ? "" : ", "}
        </>
      ))}
    </div>
  );
}
