
import User from 'models/User';
import db from '/utils/db.js'
import data from 'utils/data';


export default async function handler(req, res) {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users);
    await db.disconnect();
    res.json({ message: 'Seeded Successfully' });
}