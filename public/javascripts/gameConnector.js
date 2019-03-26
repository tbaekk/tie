const gameFrame = window.frames.gamebox;
let connManager = new ConnectionManager(gameFrame);

console.log('Trying to connect to');
connManager.connect("ws://18.218.252.59:3000");

window.addEventListener('message', (msg) => {
    if (msg.data.type === 'init-state') {
        connManager.initSession(msg.data.state);
    } else {
        connManager.send(msg.data);
    }
});

const linkBox = document.querySelector('#linkBox');
const shareButton = document.querySelector('#shareButton');

shareButton.addEventListener('click', (eve) => {
    linkBox.value = location.href;
    linkBox.select();
    document.execCommand('copy');
});

// gameFrame.onload = () => {
// };