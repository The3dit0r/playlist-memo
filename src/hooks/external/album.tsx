import { useAPIGet } from "./request";

export function useAlbum(id: string) {
  return useAPIGet<SpotifyApi.AlbumObjectFull>(`/albums/${id}`);
}

export function useAlbumTracks(id: string) {
  return useAPIGet<SpotifyApi.AlbumTracksResponse>(`/albums/${id}/tracks`);
}
