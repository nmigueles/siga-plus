import io from "socket.io-client";
import feathers from "@feathersjs/client";

const socket = io("https://siga-plus-v2.herokuapp.com/");
const app = feathers();

app.configure(feathers.socketio(socket));
app.configure(
  feathers.authentication({
    storageKey: "auth"
  })
);

export default app;
