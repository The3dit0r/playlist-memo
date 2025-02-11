export function parseParameter(paramStr: string) {
  const paramArr = paramStr.split("&");
  const obj: Record<string, string> = {};

  for (let i = 0; i < paramArr.length; i++) {
    const [name, value] = paramArr[i].split("=");

    if (!name) {
      continue;
    }

    if (typeof name !== "string") {
      continue;
    }

    obj[name] = value || "";
  }

  return obj;
}

export function getImageURL(images: { url: string }[], index = 0) {
  const target = images[Math.max(0, Math.min(index, images.length - 1))];
  return target?.url;
}

export function capitalize(chars: string) {
  if (!chars.length) return "";

  const [c, ...cs] = chars;
  return c.toUpperCase() + cs.join("");
}

export function durationFormat(d: number, min = ":", sec = "") {
  d = isNaN(Number(d)) ? 0 : Number(d);

  const m = Math.floor(d / 60_000);
  const s = Math.floor((d - m * 6e4) / 1e3);

  const mDisplay = m;
  const sDisplay = s < 10 ? "0" + s : s;

  return mDisplay + " " + min + " " + sDisplay + " " + sec;
}
