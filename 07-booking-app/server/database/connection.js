import pg from 'pg';
import createUsersTable from '../models/user.js';
import createSlotsTable from '../models/slot.js';


const { Pool } = pg;

export const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export async function databaseInit() {
    // try catch block
    try {
        // promise is pending
        const dbName = await pool.query("SELECT current_database()");
        const dbRes = await pool.query("SELECT NOW()");
        const time = dbRes.rows[0].now;
        const name = dbName.rows[0].current_database;
        // promise is fulfilled
        console.log(`Connected to ${name} at ${time}`);

        // create database table
        await createUsersTable();
        await createSlotsTable();
    } catch (error) {
        // promise is rejected
        console.error("Database connection failed");
        console.error(error);
    }
};