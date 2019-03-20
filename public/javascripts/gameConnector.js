const gameFrame = window.frames.gamebox;
let connManager = new ConnectionManager(gameFrame);

gameFrame.onload = () => {
    connManager.connect("ws://localhost:9000");
};