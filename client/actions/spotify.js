import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';

/** set the app's access and refresh tokens */
export function setTokens(accessToken, refreshToken) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}


export function getMyInfo(){
  return {
    type: SPOTIFY_ME_BEGIN,
    payload: spotifyApi.getMe().then(data => {
      console.log("inside first payload", data)
    })
  }
}