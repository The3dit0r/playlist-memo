import { useAPIGet } from "./request";

export function useArtist(id: string) {
  return useAPIGet<SpotifyApi.ArtistObjectFull>(`/artists/${id}`);
}

export function useArtistTopTracks(id: string) {
  return useAPIGet<SpotifyApi.ArtistsTopTracksResponse>(
    `/artists/${id}/top-tracks`
  );
}

export function useArtistAlbums(id: string, { limit = 10, offset = 0 } = {}) {
  return useAPIGet<SpotifyApi.ArtistsAlbumsResponse>(
    `/artists/${id}/albums?include_groups=album%2C+single&limit=${limit}&offset=${offset}`
  );
}

export function useArtistApperances(
  id: string,
  { limit = 10, offset = 0 } = {}
) {
  return useAPIGet<SpotifyApi.ArtistsAlbumsResponse>(
    `/artists/${id}/albums?include_groups=appears_on%2C+compilation&limit=${limit}&offset=${offset}`
  );
}
