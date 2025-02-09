import pool from '../config/db.js';

const testDBConnection = async () => {
    try {
        await pool.query("SELECT NOW()");
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

export default testDBConnection;