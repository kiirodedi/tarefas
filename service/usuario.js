import pool from '../data/index.js';

export const cadastrarUsuario = async (filtro = '') => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = `INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?, ?)`;
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

export const alterarUsuario = async (id, dados) => {
    try {
        const cx = await pool.getConnection();
        const { nome, email, senha } = dados;

        const [resultado] = await cx.query(
            `UPDATE usuarios
             SET nome = ?, email = ?, senha = ?
             WHERE id = ?`,
            [nome, email, senha, id]
        );

        cx.release();
        return resultado;
    } catch (error) {
        throw error;
    }
};
