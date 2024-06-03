import { useEffect, useState } from "react"
import { getAllTags } from "../../managers/tagManager.js"
import { Button, ButtonToolbar, Card, CardBody, CardTitle } from "reactstrap"
import { useNavigate } from "react-router-dom"

export default function TagList()
{
    const [tags, setTags]= useState([])
    const navigate = useNavigate()
    const [tagIdToDelete, setTagIdToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getAllTags().then(setTags)
    },[])
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleDeleteModal = (id) => {
        setTagIdToDelete(id);
        toggleModal();
    };

    
    return(
        <>
            <h4 style={{display: 'flex', justifyContent: 'center'}}>Available Tags</h4>
            <div className="w-25 m-auto ">
                <Button  color="success" 
                onClick={() => {navigate('/tags/create')}}>Create a Tag</Button>
                
            </div>
            {tags.map((t) => (
                <Card key={t.id} className="mt-4 w-25 m-auto">
                    <CardBody className="d-flex align-items-center justify-content-between">
                        <CardTitle className="fw-bold">
                        {t.name}
                        </CardTitle>
                        <ButtonToolbar className="gap-2 "style={{float: "right"}} >
                            <Button color="primary"
                            onClick={() => navigate(`/tags/${t.id}/edit`)} >Edit</Button>
                            <Button color="danger" onClick={() => handleDeleteModal(t.id)}>DELETE</Button>
                        </ButtonToolbar>
                    </CardBody>
                </Card>
            ))}
            
        </>
    )
}
