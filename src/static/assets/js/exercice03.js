const socket = io();

const room = "myRoom"+(Math.floor(Math.random()*2)+1);

socket.on('connect', function() {
    console.log("connect");
    socket.emit('room', room);
});

socket.on('message', function(data) {
    document.querySelector('#app').innerHTML = data;
});
