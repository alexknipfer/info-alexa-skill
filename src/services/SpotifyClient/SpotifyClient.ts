import { SpotifyArtist } from '../../interfaces/spotify/SpotifyArtist'
import { SpotifyTrack } from '../../interfaces/spotify/SpotifyTrack'

export interface SpotifyClient {
  /**
   * Gets an artist by name
   * @param name The name of the artist
   */
  getArtistByName(name: string): Promise<SpotifyArtist>

  /**
   * Gets top tracks by artist id
   * @param id Spotify artist id
   */
  getTopTracksByArtistId(id: string): Promise<SpotifyTrack[]>
}
