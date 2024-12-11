const db = require('../config/db.js')

class VoluntarioDAO{

    async inserir(voluntario){
        const {nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado} = voluntario;
        const query = `INSERT INTO voluntarios (nome, email, data_nascimento, telefone, cpf, genero, endereco, numero, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.execute(query, [nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado]);
        console.log(result);
        return result.insertId;
    }

    async buscarPorTermo(termo){
        
        if(!termo || termo.trim() === ''){
            const query = `SELECT * FROM voluntarios ORDER BY nome ASC`;
            const [rows] = await db.execute(query);
            return rows;
        }else{
            const query = `SELECT * FROM voluntarios WHERE nome LIKE ? OR cpf LIKE ? ORDER BY nome ASC`;
            const [rows] = await db.execute(query, [`%${termo}%`, `%${termo}%`]);
            return rows;
        }
            
    }

    async buscarPorId(id){
        const query = 'SELECT * FROM voluntarios WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }

    async buscarPorCpf(cpf){
        const query = 'SELECT * FROM voluntarios WHERE cpf = ?';
        const [rows] = await db.execute(query, [cpf]);
        return rows[0];
    }

    async deletar(id){
        const query = 'DELETE FROM voluntarios WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }

    async atualizar(id, voluntario){
        const {nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado} = voluntario;
        const query = `UPDATE voluntarios SET nome = ?, email = ?, data_nascimento= ?, telefone = ?, cpf = ?, genero = ?, endereco = ?, numero = ?, cidade = ?, estado = ? WHERE id = ?`
        try {
            const [result] = await db.execute(query, [nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado, id]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=VoluntarioDAO