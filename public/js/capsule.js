let button = document.getElementById('addCapsule');
const socket = io(); // Connect to the Socket.IO server

button.addEventListener('click', () => {
})


// Emit a "createCapsule" event
socket.emit('createCapsule', { name, description });

// Listen for a "capsuleCreated" event from the server
socket.on('capsuleCreated', (capsule) => {
  // Handle the created capsule data
  console.log('Capsule created:', capsule);
});


// Emit a "joinCapsule" event
socket.emit('joinCapsule', capsuleId);

// Listen for a "capsuleJoined" event from the server
socket.on('capsuleJoined', (capsule) => {
  // Handle the joined capsule data
  console.log('Capsule joined:', capsule);
});