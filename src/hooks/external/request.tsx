import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";

import { APP } from "../../utils/config";
import { useUserData } from "../internal";

type Status = "standby" | "pending" | "resolved" | "rejected";
type Data<T> = AxiosResponse<T> | null | any;

type RequestRes<T> =
  | { status: "pending"; response: null }
  | { status: "standby"; response: null }
  | { status: "rejected"; response: any }
  | { status: "resolved"; response: AxiosResponse<T> };

export function useRequest<T>(config: AxiosRequestConfig): RequestRes<T> {
  const [response, setResponse] = useState<Data<T>>(null);
  const [status, setStatus] = useState<Status>("standby");

  function resetState(status: Status) {
    setResponse(null);
    setStatus(status);
  }

  const configString = useMemo(() => JSON.stringify(config), [config]);

  useEffect(() => {
    resetState("pending");

    axios
      .request(config)
      .then((res) => {
        setResponse(res);
        setStatus("resolved");
      })
      .catch((rej) => {
        setResponse(rej);
        setStatus("rejected");
      });

    return () => {
      resetState("standby");
    };
  }, [configString]);

  return { status, response };
}

export function useAPIGet<T>(path: string) {
  const user = useUserData();

  if (!user) {
    throw new Error("useAPI call must be used within UserProvider");
  }

  if (!user.profileB64) {
    throw new Error("useAPI cannot be called when not authenticated");
  }

  const headers = {
    Authorization: "Bearer " + user.profileB64,
  };

  return useRequest<T>({
    method: "GET",
    url: APP.getApiUrl(path),
    headers,
  });
}

export function useAPIPost<T>(path: string, data: any) {
  const user = useUserData();

  if (!user) {
    throw new Error("useAPI call must be used within UserProvider");
  }

  if (!user.profileB64) {
    throw new Error("useAPI cannot be called when not authenticated");
  }

  const headers = {
    Authorization: "Bearer " + user.profileB64,
  };

  return useRequest<T>({
    method: "POST",
    url: APP.getApiUrl(path),
    data,
    headers,
  });
}
