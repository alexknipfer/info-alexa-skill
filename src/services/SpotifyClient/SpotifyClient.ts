import { SpotifyArtist } from '../../interfaces/spotify/SpotifyArtist'

export interface SpotifyClient {
  /**
   * Gets an artist by name
   * @param name The name of the artist
   */
  getArtistByName(name: string): Promise<SpotifyArtist>
}
