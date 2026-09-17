import mysql from 'mysql2/promise';

const pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'gerenciador_tarefas',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 10
});

export default pool;