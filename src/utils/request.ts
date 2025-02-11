import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import SpotifyWebAPI from "spotify-web-api-node";

type ResponseData<T> =
  | {
      data: T;
      failed?: false;
      status: number;
      message: string;
    }
  | {
      data?: T;
      message: string;
      failed: boolean;
      status: number;
    };

export function requestData<T>(
  url: string,
  options: AxiosRequestConfig = {}
): [Promise<ResponseData<T>>, AbortController] {
  const controller = new AbortController();

  const promise = new Promise<ResponseData<T>>((resolve) => {
    axios
      .request({
        signal: controller.signal,
        url,
        ...options,
      })
      .then((res: AxiosResponse<T>) => {
        const obj = {
          failed: false,
          status: res.status,
          data: res.data,
          message: `Success (${res.status})`,
        };

        resolve(obj);
      })
      .catch((err: any) => {
        const obj = {
          failed: true,
          status: err.response?.status || -1,
          message: err.message,
        };

        resolve(obj);
      });
  });

  return [promise, controller];
}

const SpotifyAPI = new SpotifyWebAPI({
  redirectUri: window.location.origin + "/login",
});

export { SpotifyAPI };
