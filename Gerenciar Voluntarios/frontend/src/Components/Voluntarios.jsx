import { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import VoluntarioService from "../services/VoluntarioService.jsx"

function Voluntarios(){
    const [nome, setNome] = useState ('');
    const [email, setEmail] = useState ('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [genero, setGenero] = useState('');
    const [cpf, setCpf] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const navigate = useNavigate();

    useEffect(() =>{
        const id = localStorage.getItem('voluntarios');
        if(id != null){
            (async ()=> {
                const carregarVoluntario = new VoluntarioService();
                const voluntario = await carregarVoluntarios.buscarPorId(id);
                const voluntarioDados = voluntario.data
                console.log(voluntarioDados)
                fillFields(voluntarioDados);
            })()
        }

    }, [])

    const handleVoluntarioSubmit = async (e)=>{
        e.preventDefault();
        const id = localStorage.getItem('voluntarios');

        if(!nome || !email || !dataNascimento || !telefone || !genero || !cpf) return;

        const storedVoluntarios = new VoluntarioService()
        const novoVoluntario = {nome, email, dataNascimento, telefone, genero, cpf, endereco, numero, cidade, estado};
        if(id != null){
            await storedVoluntarios.alterar(id, novoVoluntario);
            localStorage.removeItem('voluntarios');
        }else{
            await storedVoluntarios.inserir(novoVoluntarios);
        }
        
        resetFields();

        navigate('/listar')
    }

    const handleCpf = (event) => {
        const unformattedCpf = event.target.value.replace(/\D/g, '');
        const formattedCpf = unformattedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        setCpf(formattedCpf);
    }

    const handleTelefone = (event) =>{
        const unformattedTelefone = event.target.value.replace(/\D/g, '');
        const formattedTelefone = unformattedTelefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        setTelefone(formattedTelefone);
    }

    const fillFields = (voluntario)=>{
        setNome(voluntario.nome);
        setEmail(voluntario.email);
        setDataNascimento(voluntario.dataNascimento);
        setTelefone(voluntario.telefone);
        setGenero(voluntario.genero);
        setCpf(voluntario.cpf);
        setEndereco(voluntario.endereco);
        setNumero(voluntario.numero);
        setCidade(voluntario.cidade);
        setEstado(voluntario.estado);
    }


    const resetFields = () => {
        setNome('');
        setEmail('');
        setDataNascimento('');
        setTelefone('');
        setGenero('');
        setCpf('');
        setEndereco('');
        setNumero('');
        setCidade('');
        setEstado('');
    };


    return <>
        <h1>Gerenciar Voluntarios</h1>
        
        <Form onSubmit={handleVoluntarioSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formNome">
                <Form.Label>Nome*</Form.Label>
                <Form.Control required type="text" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="FormGenero">
                    <Form.Label>Gênero*</Form.Label>
                    <Form.Select required value={genero} onChange={(e)=>setGenero(e.target.value)}>
                        <option value=""></option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Não declarado">Não quero declarar</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control required type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="FormCpf">
                    <Form.Label>Cpf*</Form.Label>
                    <Form.Control required type="text" value={cpf} onChange={handleCpf} maxLength="14"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formDataNasc">
                    <Form.Label>Data de Nascimento*</Form.Label>
                    <Form.Control required type="date" value={dataNascimento} onChange={(e)=>setDataNascimento(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formTelefone">
                    <Form.Label>Telefone/Celular*</Form.Label>
                    <Form.Control required type="tel" value={telefone} onChange={handleTelefone} maxLength="13"/>
                </Form.Group>

                <Form.Group as={Col} controlId="FormEstado">
                    <Form.Label>UF</Form.Label>
                    <Form.Select value={estado} onChange={(e)=>setEstado(e.target.value)}>
                        <option value=""></option>
                        <option value="AC">Acre (AC)</option>
                        <option value="AL">Alagoas (AL)</option>
                        <option value="AP">Amapá (AP)</option>
                        <option value="AM">Amazonas (AM)</option>
                        <option value="BA">Bahia (BA)</option>
                        <option value="CE">Ceará (CE)</option>
                        <option value="DF">Distrito Federal (DF)</option>
                        <option value="ES">Espírito Santo (ES)</option>
                        <option value="GO">Goiás (GO)</option>
                        <option value="MA">Maranhão (MA)</option>
                        <option value="MT">Mato Grosso (MT)</option>
                        <option value="MS">Mato Grosso do Sul (MS)</option>
                        <option value="MG">Minas Gerais (MG)</option>
                        <option value="PA">Pará (PA)</option>
                        <option value="PB">Paraíba (PB)</option>
                        <option value="PR">Paraná (PR)</option>
                        <option value="PE">Pernambuco (PE)</option>
                        <option value="PI">Piauí (PI)</option>
                        <option value="RJ">Rio de Janeiro (RJ)</option>
                        <option value="RN">Rio Grande do Norte (RN)</option>
                        <option value="RS">Rio Grande do Sul (RS)</option>
                        <option value="RO">Rondônia (RO)</option>
                        <option value="RR">Roraima (RR)</option>
                        <option value="SC">Santa Catarina (SC)</option>
                        <option value="SP">São Paulo (SP)</option>
                        <option value="SE">Sergipe (SE)</option>
                        <option value="TO">Tocantins (TO)</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formEndereco">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control type="text" value={endereco} onChange={(e)=>setEndereco(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="FormNumero">
                    <Form.Label>Nº</Form.Label>
                    <Form.Control type="text" value={numero} onChange={(e)=>setNumero(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="FormCidade">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control type="text" value={cidade} onChange={(e)=>setCidade(e.target.value)}/>
                </Form.Group>
            </Row>


            <Form.Group style={{gap:'20px'}} className="mb-3" id="formCheckbox">
                    <Form.Check type="checkbox" label="Aceitar Termos de Uso e Política de Privacidade" />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3" >Confirmar</Button>
        </Form>
             
            
    </>
}

export default Voluntarios;