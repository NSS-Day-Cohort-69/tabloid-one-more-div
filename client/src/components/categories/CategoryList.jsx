import {useEffect, useState } from "react";
import { getAllCategories } from "../../managers/categoryManager";
import { Button, ButtonToolbar, Card, CardBody, CardTitle} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { deleteCategory } from "../../managers/categoryManager";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleDeleteModal = (id) => {
        setCategoryIdToDelete(id);
        toggleModal();
    };

    const handleDelete = () => {
        deleteCategory(categoryIdToDelete)
            .then(() => {
                setCategories(categories.filter(c => c.id !== categoryIdToDelete));
                toggleModal();
            });
    };

    return (
        <div>
            <h4 style={{display: 'flex', justifyContent: 'center'}}>Categories</h4>
                <div className="w-25 m-auto">
                    <Button color="success" onClick={() => navigate("/categories/create")}>Create a Category</Button>
                </div>
            {categories.map((c) => (
                <Card key={c.id} className="mt-3 w-25 m-auto">
                    <CardBody className="d-flex align-items-center justify-content-between">
                    
                        <CardTitle>
                            {c.name}
                        </CardTitle>
                    
                        <ButtonToolbar className="gap-2 ">
                            <Button color="primary" onClick={() => navigate(`/categories/${c.id}/edit`)}>Edit</Button>
                            <Button color="danger" onClick={() => handleDeleteModal(c.id)}>Delete</Button>
                        </ButtonToolbar>
                    </CardBody>
                </Card>
            ))}
            <ConfirmDeleteModal
                isOpen={isModalOpen}
                toggle={toggleModal}
                confirmDelete={handleDelete}
                typeName={"category"}
            />
        </div>
    )
}