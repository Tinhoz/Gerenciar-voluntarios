import { useEffect,useState } from "react"
import { Table,Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns'
import VoluntarioService from "../services/VoluntarioService.jsx"


function Lista(){
    const [voluntarios, setvoluntarios] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        (async ()=> {
            const storedVoluntarios = new VoluntarioService();
            const voluntarioArma = await storedVoluntarios.buscarVoluntarios();
            setVoluntarios(voluntarioArma.data);
        })()
    }, [])

    const handleDelete = async (index)=>{
        const confirmDelete = window.confirm("Deseja confirmar a exclusao do Voluntário?");

        if(confirmDelete){
            const voluntarioEx = new VoluntarioService();
            await voluntarioEx.delete(index)
        }
    }

    const handleEditar = async (index)=>{
        localStorage.setItem('voluntarios', index);
        navigate('/')
    }

    const filteredVoluntarios = voluntarios.filter((voluntario)=>
        voluntario.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return <>
        <h2>Voluntarios</h2>

        <Form.Group className="mb-3">
            <Form.Control
                type="text"
                placeholder="Pesquisar Voluntario por nome"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
        </Form.Group>

        <Table striped bordered hover>
           <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Cpf</th>
                    <th>Genero</th>
                    <th>Data de Nascimento</th>
                    <th>Telefone</th>
                    <th>Endereco</th>
                </tr>
            </thead> 
            <tbody>
                {
                    filteredVoluntarios.length>0 ? (
                        <>
                            {filteredVoluntarios.map((voluntario) => (
                            <tr key={voluntario.id}>
                                <td>{voluntario.id}</td>
                                <td>{voluntario.nome}</td>
                                <td>{voluntario.email}</td>
                                <td>{voluntario.cpf}</td>
                                <td>{voluntario.genero}</td>
                                <td>{format(voluntario.dataNascimento, 'dd/MM/yyyy')}</td>
                                <td>{voluntario.telefone}</td>
                                <td>{voluntario.endereco && (`${voluntario.endereco}${voluntario.numero ? `, nº: ${voluntario.numero}` : ''}${voluntario.cidade ? `, ${voluntario.cidade}` : ''}${voluntario.estado ? `/${voluntario.estado}` : ''}`
                                )}</td>
                                <td>
                                    <Button variant="primary" className="me-1" onClick={()=>handleEditar(voluntario.id)}>Editar</Button>
                                    <Button variant="danger" onClick={()=>handleDelete(voluntario.id)}>Excluir</Button>
                                </td>
                            </tr>
                            ))}
                        </>
                    ):(
                        <span>Não ha voluntarios</span>
                    )
                    
                }
            </tbody>
        </Table>
    </>
}

export default Lista;