class ConnectionManager {
    constructor(gameFrame) {
        this.conn = null;
        this.gFrame = gameFrame;

        window.addEventListener('message', frameListener);
    }

    frameListener(msg) {
        send(msg.data);
    }

    connect(address) {
        this.conn = new WebSocket(address);

        this.conn.addEventListener('open', () => {
            console.log('Connection established');
            this.initSession();
        });

        this.conn.addEventListener('message', event => {
            console.log('Received message', event.data);
            this.receive(event.data);
        });
    }

    initSession() {
        const sessionId = window.location.hash.split('#')[1];
        if (sessionId) {
            this.send({
                type: 'join-session',
                id: sessionId,
            });
        } else {
            this.send({
                type: 'create-session',
            });
        }
    }

    receive(msg) {
        const data = JSON.parse(msg);
        if (data.type === 'session-created') {
            window.location.hash = data.id;
        } else {
            gameFrame.postMessage(data, location.origin);
        }
    }

    send(data) {
        const msg = JSON.stringify(data);
        console.log('Sending message', msg);
        this.conn.send(msg);
    }
}
