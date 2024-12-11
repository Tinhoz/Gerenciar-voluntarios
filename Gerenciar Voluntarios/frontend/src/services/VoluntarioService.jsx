const API_BASE_URL="http://localhost:3000"

class VoluntarioService{

    async buscarVoluntario(){
        const response = await fetch(`${API_BASE_URL}/voluntario`, {
            headers:{
                'Content-Type': 'application/json',
            },
            method: 'GET',
        }
        )
        if(!response.ok){
            console.log('Algo deu errado')
        }
        const dados = await response.json();
        return dados;
    }

    async buscarPorId(id){
        const response = await fetch(`${API_BASE_URL}/voluntario/${id}`, {
            headers:{
                'Content-Type': 'application/json',
            },
            method: 'GET',
        }
        )
        if(!response.ok){
            console.log('Algo deu errado')
        }
        const dados = await response.json();
        return dados;
    }

    async delete(id){
        const response = await fetch(`${API_BASE_URL}/voluntario/${id}`, {
            headers:{
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
        }
        )
        if(!response.ok){
            console.error('Erro ao excluir voluntário');
            alert('Ocorreu um erro ao excluir o voluntário');
        }else{
            alert('Voluntário excluído com sucesso!');
        }
    }

    async inserir(voluntario){
        const voluntarioJson = JSON.stringify(voluntario);
        const response = await fetch(`${API_BASE_URL}/voluntario`, {
            headers:{
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: voluntarioJson,
        }
        )
        if(!response.ok){
            console.error('Erro ao inserir voluntario');
            alert('Ocorreu um erro ao inserir o voluntario');
        }else{
            alert('Voluntário inserido com sucesso!');
        }
    }


    async alterar(id, voluntario){
        const voluntarioJson = JSON.stringify(voluntario);
        const response = await fetch(`${API_BASE_URL}/voluntario/${id}`, {
            headers:{
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: voluntarioJson,
        }
        )
        if(!response.ok){
            console.error('Erro ao editar voluntário');
            alert('Ocorreu um erro ao editar o voluntário');
        }else{
            alert('Voluntário alterado com sucesso!');
        }
    }
}

export default VoluntarioService