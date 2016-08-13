import React, {Component} from 'react';
export const Speaker = (track, toggleSound, size = 2) => {
  if(track) {
    return (
      <i
        className={`speaker fa fa-volume-up fa-${size}x`}
        id="speaker"
        aria-hidden="true"
        type="button"
        onClick={toggleSound}>
        <audio src={ track }></audio>
      </i>
    )
  } else {
    return null
  }
}
