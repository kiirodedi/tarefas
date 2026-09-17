export const cadastrarTarefa = async (fk_usuario_id, titulo, descricao, data, status) => {
    try {
        const cx = await pool.getConnection();
        // Inserir os dados na tabela empresa
        const cmdSql = 'INSERT INTO tarefas(fk_usuario_id, titulo, descricao, data, status) VALUES (?, ?, ?, ?, ?)';
        await cx.query(cmdSql, [fk_usuario_id, titulo, descricao, data, status]);

        // Recuperar o último ID inserido
        const [result] = await cx.query('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        // Consultar a empresa recém-cadastrada pelo último ID
        const [dados, meta_dados] = await cx.query('SELECT * FROM tarefas WHERE id = ?', [lastId]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const consultarTarefa = async (filtro = '') => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = `SELECT * FROM tarefas WHERE tarefas.titulo LIKE ?`;
        const [dados, meta_dados] = await cx.query(cmdSql, [`%${filtro}%`]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const excluirTarefas = async (id) => {
    try {
        const cx = await pool.getConnection();
        const [dados, meta_dados] = await cx.query('DELETE FROM tarefas WHERE id = ?', [id]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const consultarTarefasPorUsuario = async (usuarioId) => {
    try {
        const cx = await pool.getConnection();
        const [dados] = await cx.query(
            'SELECT * FROM tarefas WHERE fk_usuario_id = ? ORDER BY data DESC',
            [usuarioId]
        );
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};