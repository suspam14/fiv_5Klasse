// NodeJs Modul
// import * as http from 'http';
import * as path from 'path';
// Externes Modul
import * as express from 'express';
import * as bodyParser from 'body-parser';

export class Server {
    private _port: number;
    private _server: express.Express;

    constructor (port: number) {
        const assetspath = path.join(__dirname, '..', 'assets');
        this._port = port;
        this._server = express();

        this._server.set('views', path.join(__dirname, 'views'));
        const engine = this._server.set('view engine', 'pug');
        engine.locals.pretty = true;

        this._server.use('/', express.static(assetspath));
        this._server.use(bodyParser.json());
        this._server.use(bodyParser.urlencoded());
        this._server.post('/login.html', (req, res, next) => this.handlePostLogin(req, res, next));
        this._server.get('/liste', (req, res, next) => this.handleGetListe(req, res, next));
        this._server.get('/image.png', (req, res, next) => this.handleSendImage(res));
    }

    public start () {
        this._server.listen(this._port);
        console.log('HTTP Server gestartet auf port ' + this._port);
    }

    public get port () {
        return this._port;
    }

    private handleGetListe (req: express.Request, res: express.Response,
        next: express.NextFunction) {
        // res.send('Dere klana');
        const filePath = path.join(__dirname, '../assets', 'liste.html');
        console.log(filePath);
        res.sendFile(filePath);
    }

    private handleSendImage (res: express.Response) {
        const filePath = path.join(__dirname, '../assets', 'image.png');
        res.sendFile(filePath);
    }

    private handlePostLogin(req: express.Request, res: express.Response,
        next: express.NextFunction) {
            if (req.body.email === 'test@test.at' &&
            req.body.password === 'geheim') {
                res.render('welcome.pug', {anrede: 'Herr', name: 'Rossi'});
            } else {
                res.status(404).send('404 Not Authorized');
            }
            next();
        }
}
