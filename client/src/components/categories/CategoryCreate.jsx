import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory, getAllCategories } from "../../managers/categoryManager";
import { Button, ButtonGroup, Form, FormGroup, Input, Label } from "reactstrap";

export default function CategoryCreate() {
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCategory = {
            name,
        };

    createCategory(newCategory).then(() => {
        navigate("/categories")
    });

    };

    return (
        <>
        <h4 style={{display: 'flex', justifyContent: 'center'}}>Create a Category</h4>
        <Form>
            <FormGroup>
                <Label>Name</Label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => {
                        setName(e.target.value);
                        }}
                    />
            </FormGroup>
                <ButtonGroup>
                    <Button onClick={handleSubmit} color="success">Create</Button>
                </ButtonGroup>
        </Form>

        </>
    )
}