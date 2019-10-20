const Hapi = require('@hapi/hapi');

const RequestHandler = require('./handler');

const start = async () => {

    const reqHandler = new RequestHandler();

    const server = Hapi.server({ 
        port: 4000, 
        host: 'localhost' 
    });

    server.state('accinfo', {
        ttl: null,
        isSecure: false,
        isHttpOnly: false,
        encoding: 'base64json',
        domain:'.localhost',
        path:'/',
        clearInvalid: false,
        strictHeader: false
    });

    server.route({
        method: 'GET',
        path: '/login',
        handler: reqHandler.login,
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with','set-cookie'],
                credentials:true
            }
        }
    });

    await server.start();

    console.log('server running at: ' + server.info.uri);
};

module.exports = start;