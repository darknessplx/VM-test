const socket = io("http://localhost:3000");
const container = document.getElementById('novnc_container');
const rfb = new RFB(container, 'ws://localhost:6080', { credentials: { password: 'collab' } });
rfb.viewOnly = true;

document.getElementById('request').addEventListener('click', () => {
  socket.emit('request_control');
});

socket.on('control_granted', () => {
  alert('Masz kontrolę!');
  rfb.viewOnly = false;
});

socket.on('queued', n => alert('Jesteś w kolejce: ' + n));
