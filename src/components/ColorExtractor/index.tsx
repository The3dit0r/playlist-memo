import { useEffect, useRef, useState } from "react";
import Color, { ColorInstance } from "color";
import { clusterize } from "./kmeans.js";

const defaultColor = new Color("#131313");

type ColorT = ColorInstance;

type Props = {
  onColor?: (color: ColorT) => void;
  edgeOnly?: boolean;
  children: string;
};

/**
 * @description Generate color palette from array of HSL-format color.
 */
function generateColorPalette(
  colors: [number, number, number][],
  palleteColorCount = 3
): Promise<ColorT[]> {
  return new Promise((resolve, _) => {
    // Apply K-means clustering
    clusterize(colors, { k: palleteColorCount }, (err: any, res: any) => {
      if (err) return console.error(err);

      const sorted = res.sort(
        (a: any, b: any) => b.cluster.length - a.cluster.length
      );

      const fin = sorted.map(
        ({ centroid: c }: any) => new Color(`hsl(${c[0]}, ${c[1]}%, ${c[2]}%)`)
      );

      resolve(fin);
    });
  });
}

function getImageHSl(
  imgEl: HTMLImageElement,
  edge?: boolean
): [number, number, number][] {
  var blockSize = 4, // only visit every 4 pixels
    canvas = document.createElement("canvas"),
    context = canvas.getContext && canvas.getContext("2d"),
    data,
    width,
    height,
    i = -4,
    length;

  if (!context) {
    return [[13, 13, 13]];
  }

  height = canvas.height =
    imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    if (edge) {
      data = context.getImageData(width - 1, 0, width - (width - 1), height);
    } else {
      data = context.getImageData(0, 0, width, height);
    }
  } catch (e) {
    /* security error, img on diff domain */
    return [[13, 13, 13]];
  }

  length = data.data.length;

  const colors = new Array<[number, number, number]>();
  while ((i += blockSize * 4) < length) {
    const r = data.data[i];
    const g = data.data[i + 1];
    const b = data.data[i + 2];
    const c = new Color(`rgb(${r}, ${g}, ${b})`);

    colors.push([c.hue(), c.saturationl(), c.lightness()]);
  }

  return colors;
}

export default function ColorExtractor({ children: src, onColor }: Props) {
  const canvasRef = useRef(null);
  const [color, setColor] = useState<ColorT>(defaultColor);

  useEffect(() => {
    setColor(defaultColor);
  }, [src]);

  useEffect(() => {
    if (!onColor) return;
    onColor(color);
  }, [color]);

  return (
    <div style={{ zIndex: -1, position: "absolute", display: "none" }}>
      <img
        crossOrigin="anonymous"
        src={src}
        alt=""
        onLoad={(e) => {
          const t = e.target as HTMLImageElement;
          const colors = getImageHSl(t, false);
          generateColorPalette(colors, 3).then((res) => {
            console.log(res);
            setColor(res[0]);
          });

          // const cMax = Math.max(v.r, v.g, v.b) / 255;
          // const cMin = Math.min(v.r, v.g, v.b) / 255;
          // const d = (cMax + cMin) / 2;

          // const c = { ...v, d: color.isLight() ? 0 : 1 };
        }}
      />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
