const gameFrame = window.frames.gamebox;
let connManager = new ConnectionManager(gameFrame);

console.log('Trying to connect to');
connManager.connect("ws://localhost:3000");

window.addEventListener('message', (msg) => {
    if (msg.data.type === 'init-state') {
        connManager.initSession(msg.data.state);
    } else {
        connManager.send(msg.data);
    }
});
// gameFrame.onload = () => {
// };