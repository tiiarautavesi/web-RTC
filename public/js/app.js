'use strict';

const constraints = {
  audio: true,
  video: true
};
const socket = io.connect('https://localhost:3000');

navigator.mediaDevices.getUserMedia(constraints).then(mediaStream => {
  const video = document.querySelector('video');
  video.srcObject = mediaStream;
}).catch(err => {
  console.log(err.name + ': ' + err.message);
});

socket.on('connect', () => {
  console.log('socket.io connected!');
});
