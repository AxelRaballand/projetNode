const socket = io('/my-namespace'+(Math.floor(Math.random()*2)+1));
socket.on('hello',function(data) {
    document.querySelector('#app').innerHTML = data;
});

