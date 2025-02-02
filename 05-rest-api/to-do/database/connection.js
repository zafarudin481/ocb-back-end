import pg from 'pg'
import createUsersTable from '../model/user.js';
import createTodosTable from '../model/todo.js';

const { Pool } = pg

export const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'a1b2c3d4',
    database: 'to-do-app-ocb',
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
        await createTodosTable();
    } catch (error) {
        // promise is rejected
        console.error("Database connection failed");
    }
};