import { useDebugValue, useEffect, useState } from "react";
import { getAllCategories } from "../../managers/categoryManager";
import { Button, ButtonToolbar, Card, CardBody, CardTitle, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { deleteCategory } from "../../managers/CategoryManager";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleDeleteBtnClick = (id) => {
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
                    <Link to="/categories/create"><Button color="success">Create a Category</Button></Link>
                </div>
        {categories.map((c) => (
            <Card key={c.id} className="mt-3 w-25 m-auto">
                <CardBody className="d-flex align-items-center justify-content-between">
                
                    <CardTitle>
                        {c.name}
                    </CardTitle>
                
                    <ButtonToolbar className="gap-2 ">
                        <Button color="primary">Edit</Button>
                        <Button color="danger" onClick={() => handleDeleteBtnClick(c.id)}>Delete</Button>
                    </ButtonToolbar>
                </CardBody>
            </Card>
        ))}
        <ConfirmDeleteModal
            isOpen={isModalOpen}
            toggle={toggleModal}
            confirmDelete={handleDelete}
        />
        </div>
    )
}