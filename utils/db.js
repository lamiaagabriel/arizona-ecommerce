import mongoose from 'mongoose';
const connection = {};

async function connect() {
    // false: could save any other fields than the schema's
    mongoose.set('strictQuery', false);
    if(connection.isConnected) {
        console.log("Aleady Connected");
        return;
    }

    // Resseting the state of connection
    // Have connection in connection field of db, but don't know its state 
    if(mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        // state true -> No need to reconnect to db
        if(connection.isConnected) {
            console.log("Use Previous Connection");
            return;
        }
        // stata false -> disconnect to be reconnected with a fresh one, with a true state
        await mongoose.disconnect();
    }

    // Create a fresh connection
    const db = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    console.log("new Connection");
    connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
    // No need to disconnect in developing mode
    if(connection.isConnected && process.env.NODE_ENV === 'production') {
        await mongoose.disconnect();
        connection.isConnected = false;
        console.log("Disconneted")
    }
}

export default { connect, disconnect };