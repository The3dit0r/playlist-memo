const APP = {
  name: "Bad Music App - Remake",
  version: "1.4.2-beta",

  apiUrl: "https://api.spotify.com/v1",
  getApiUrl(path = "") {
    return this.apiUrl + path;
  },
};

export { APP };
