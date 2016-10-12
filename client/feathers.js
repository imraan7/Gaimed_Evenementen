const io = require('socket.io-client')

import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import authentication from 'feathers-authentication/client';
import socketio from 'feathers-socketio/client';
import rx from 'feathers-reactive';
import RxJS from 'rxjs';

const app = feathers()
    .configure(hooks())
    .configure(socketio(io()))
    .configure(rx(RxJS))
    // Use localStorage to store our login token
    .configure(authentication({
        storage: window.localStorage
    }))

export default app
