const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const name = document.getElementById('name');

const randomName = 'Anonymous' + Math.floor(Math.random() * 100);

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        const message = {
            name: name.value || randomName,
            message: input.value
        };
        socket.emit('chat message', message);
        input.value = '';
    }
});

socket.on('chat message', function (msg) {
    const item = document.createElement('li');
    const nameLabel = document.createElement('strong');
    nameLabel.textContent = msg.name;
    item.textContent = `: ${msg.message}`;
    item.className = (name.value || randomName) === msg.name ? 'your-message' : 'other';
    item.prepend(nameLabel);
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});