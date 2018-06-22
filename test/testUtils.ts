import { SpotifyArtist } from '../src/interfaces/spotify/SpotifyArtist'
import { SpotifyTrack } from '../src/interfaces/spotify/SpotifyTrack'

export function getSpotifyArtist(): SpotifyArtist {
  return {
    external_urls: {
      spotify: 'exernalUrl'
    },
    followers: {
      href: null,
      total: 21614317
    },
    genres: ['canadian hip hop', 'canadian pop', 'hip hop', 'pop rap', 'rap'],
    href: 'href',
    id: 'artistId',
    images: [
      {
        height: 640,
        url: 'imageUrl',
        width: 640
      },
      {
        height: 320,
        url: 'imageUrl',
        width: 320
      },
      {
        height: 160,
        url: 'imageUrl',
        width: 160
      }
    ],
    name: 'artistName',
    popularity: 99,
    type: 'artist',
    uri: 'uri'
  }
}

export function getSpotifyTrack(): SpotifyTrack {
  return {
    album: {
      album_type: 'single',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4'
          },
          href: 'https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4',
          id: '3TVXtAsR1Inumwj472S9r4',
          name: 'Drake',
          type: 'artist',
          uri: 'spotify:artist:3TVXtAsR1Inumwj472S9r4'
        }
      ],
      available_markets: ['US'],
      external_urls: {
        spotify: 'https://open.spotify.com/album/1ZGxGu4fMROqmZsFSoepeE'
      },
      href: 'https://api.spotify.com/v1/albums/1ZGxGu4fMROqmZsFSoepeE',
      id: '1ZGxGu4fMROqmZsFSoepeE',
      images: [
        {
          height: 640,
          url:
            'https://i.scdn.co/image/cc0a4440a6297ad9b44f4597aa8dda712ccee4e0',
          width: 640
        },
        {
          height: 300,
          url:
            'https://i.scdn.co/image/aad2b5b7154b8859f34748eabb1922a1a168bfdb',
          width: 300
        },
        {
          height: 64,
          url:
            'https://i.scdn.co/image/6aad5ea1c029f9fe93b43f8f91470e4cae5670f4',
          width: 64
        }
      ],
      name: 'Nice For What',
      release_date: '2018-04-06',
      release_date_precision: 'day',
      type: 'album',
      uri: 'spotify:album:1ZGxGu4fMROqmZsFSoepeE'
    },
    artists: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4'
        },
        href: 'https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4',
        id: '3TVXtAsR1Inumwj472S9r4',
        name: 'Drake',
        type: 'artist',
        uri: 'spotify:artist:3TVXtAsR1Inumwj472S9r4'
      }
    ],
    available_markets: ['US'],
    disc_number: 1,
    duration_ms: 210925,
    explicit: true,
    external_ids: {
      isrc: 'USCM51800077'
    },
    external_urls: {
      spotify: 'https://open.spotify.com/track/1cTZMwcBJT0Ka3UJPXOeeN'
    },
    href: 'https://api.spotify.com/v1/tracks/1cTZMwcBJT0Ka3UJPXOeeN',
    id: '1cTZMwcBJT0Ka3UJPXOeeN',
    is_local: false,
    name: 'Nice For What',
    popularity: 98,
    preview_url: null,
    track_number: 1,
    type: 'track',
    uri: 'spotify:track:1cTZMwcBJT0Ka3UJPXOeeN'
  }
}
