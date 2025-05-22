import { useAPIGet } from "./request";

export function usePlaylist(id: string) {
  return useAPIGet<SpotifyApi.PlaylistObjectFull>(`/playlists/${id}`);
}

export function usePlaylistTracks(id: string) {
  return useAPIGet<SpotifyApi.PlaylistTrackResponse>(`/playlists/${id}/tracks`);
}
