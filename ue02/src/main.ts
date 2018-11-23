import { Server} from './server';

class Main {

    public static main () {
    const server = new Server(4711);
    server.start();
    }
}

Main.main();
