const VolunGeren = require('../model/VolunGeren.js')

class VoluntarioController{
    async inserir(req,res){
        try {
            const {nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado} = req.body;

            const voluntarioData = {nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado};
            const voluntario = await VolunGeren.criar(voluntarioData);
            res.status(201).json({
                message: 'Voluntário adicionado com sucesso!',
                data:voluntario.toJSON()
            });
        } catch (error) {
            res.status(500).json({
                error:error.message
            });
        }
    }

    async buscarPorFiltro(req,res){
        try {
            const {termo} = req.query;
            const voluntarios = await VolunGeren.buscaPorfiltro(termo);
            voluntarios.map(doar => {
                console.log(doar.toJSON())
            })

            if(voluntarios.length === 0){
                return res.status(404).json({
                    message:'Nenhum voluntário encontrado',
            });
        }
        res.status(200).json({
            message: 'Voluntários encontrados',
            data: voluntarios.map(voluntario=>voluntario.toJSON()),
        });

        }catch(error){
            console.error('Erro ao buscar voluntarios por filtro:', error);
            res.status(500).json({
                message: 'Erro ao buscar voluntarios por filtro',
                error: error.message,
            });
        }
    }

    async buscarPorId(req,res){
        try {
            const { id } = req.params;
            const voluntario = await VolunGeren.buscaPorId(id);

            if(!voluntario){
                return res.status(404).json({
                    message: 'Voluntário não encontrado',
                });
            }

            res.status(200).json({
                message: 'Voluntário encontrado',
                data: voluntario.toJSON(),
            });
        } catch (error) {
            console.error('Erro ao buscar voluntário por ID', error);
            res.status(500).json({
                message: 'Erro ao buscar voluntário por ID',
                error: error.message,
            });
        }
    }

    async deletar(req,res){
        try {
            const { id } = req.params;
            const voluntario = await VolunGeren.buscaPorId(id);

            if(!voluntario) {
                return res.status(404).json({
                    message: 'Voluntário não encontrado',
                });
            }

            await voluntario.deletar();

            res.status(200).json({
                message: 'Voluntário excluido com sucesso',
            });
            
        } catch (error) {
            console.error('Erro ao excluir voluntário:', error);
            res.status(500).json({
                message: 'Erro ao excluir voluntário',
                error: error.message,
            });
        }
    }

    async atualizar(req,res){
        try {
            const { id } = req.params;
            const { nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado } = req.body;

            const voluntario = await VolunGeren.buscaPorId(id);
            const cpfExist =await VolunGeren.buscaPorCpf(cpf);
        
            if(cpfExist!=null && voluntario.cpf!=cpf){
                return res.status(400).json({
                    message: 'CPF ja cadastrado',
                })
            }

            if(!voluntario) {
                return res.status(404).json({
                    message: 'Voluntário não encontrado',
                });
            }

            voluntario.nome = nome;
            voluntario.email = email;
            voluntario.dataNascimento = dataNascimento;
            voluntario.telefone = telefone;
            voluntario.cpf = cpf;
            voluntario.genero = genero;
            voluntario.endereco = endereco;
            voluntario.numero = numero;
            voluntario.cidade = cidade;
            voluntario.estado = estado;
            console.log(voluntario.cpf)
            
            await voluntario.atualizar();

            res.status(200).json({
                message: 'voluntario atualizado com sucesso',
                data: voluntario.toJSON(),
            });

        } catch (error) {
            console.error('Erro ao atualizar voluntario:', error),
            res.status(500).json({
                message: 'Erro ao atualizar voluntario',
                error: error.message,
            });
        }
    }

}

module.exports = new VolunGeren();