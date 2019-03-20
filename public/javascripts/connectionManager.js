class ConnectionManager {
    constructor(gameFrame) {
        this.conn = null;
        this.gFrame = gameFrame;        
    }

    connect(address) {
        this.conn = new WebSocket(address);

        this.conn.addEventListener('open', () => {
            console.log('Connection established');
            this.gFrame.postMessage({
                type: 'open'
            }, '*');
        });

        this.conn.addEventListener('message', event => {
            console.log('Received message', event.data);
            this.receive(event.data);
        });
    }

    initSession(state) {
        const sessionId = window.location.hash.split('#')[1];
        if (sessionId) {
            this.send({
                type: 'join-session',
                id: sessionId,
                state
            });
        } else {
            this.send({
                type: 'create-session',
                state
            });
        }
    }

    receive(msg) {
        const data = JSON.parse(msg);
        if (data.type === 'session-created') {
            window.location.hash = data.id;
        } else {
            this.gFrame.postMessage(data, '*');
        }
    }

    send(data) {
        const msg = JSON.stringify(data);
        console.log('Sending message', msg);
        this.conn.send(msg);
    }
}
