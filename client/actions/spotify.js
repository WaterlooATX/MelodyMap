import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';

/** set the app's access and refresh tokens */
export function setTokens({accessToken, refreshToken}) {
  console.log("setTokens accessToken", accessToken)
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}

/* get the user's info from the /me api */
// export function getMyInfo() {
//   console.log("get my info called!")
//   return dispatch => {
//     dispatch({ type: SPOTIFY_ME_BEGIN});
//     spotifyApi.getMe().then(data => {
//       console.log("getmyinfo data", data)
//       dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
//     }).catch(e => {
//       dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
//     });
//   };
// }

export function getMyInfo(){
  return {
    type: SPOTIFY_ME_BEGIN,
    payload: spotifyApi.getMe().then(data => {
      console.log("inside first payload", data)
    })
  }
}