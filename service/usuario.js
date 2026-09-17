import pool from '../data/index.js';

export const cadastrarUsuario = async (filtro = '') => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = `INSERT INTO usuarios(nome, email, nome, senha) VALUES (?, ?, ?, ?)`;
        await cx.query(cmdSql, [nome, email, nome, senha]);

        const [result] = await cx.query('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        const [dados, meta_dados] = await cx.query('SELECT * FROM usuarios WHERE id = ?', [lastId]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const consultarUsuario = async (filtro = '') => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = `SELECT * FROM usuarios WHERE usuarios.nome LIKE ?`;
        const [dados, meta_dados] = await cx.query(cmdSql, [`%${filtro}%`]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const consultarUsuarioPorId = async (id) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'SELECT * FROM usuarios WHERE usuarios.id = ?';
        const [dados, meta_dados] = await cx.query(cmdSql, [id]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};