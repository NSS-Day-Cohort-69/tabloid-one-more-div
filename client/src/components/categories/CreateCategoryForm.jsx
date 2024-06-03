import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCategory, getCategoryById, updateCategory } from "../../managers/categoryManager";
import { Button, ButtonGroup, ButtonToolbar, Form, FormGroup, Input, Label } from "reactstrap";

export default function CreateCategoryForm() {
    const [name, setName] = useState("");
    const [editCategory, setEditCategory] = useState({});
    const {categoryid} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(categoryid)
            {
                getCategoryById(categoryid).then((categoryObj) => {
                    setEditCategory(categoryObj)
                    setName(categoryObj.name)
                })
            }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const category = {
            name: name
        };
        if(categoryid)
            {
                updateCategory(editCategory.id,category).then(() => {navigate("/categories")});
            }
            else
            {
                createCategory(category).then(() => {navigate("/categories")});
            }
    };

    return (
        <>
        {categoryid ? (
        <h4 className="mt-2" style={{display: 'flex', justifyContent: 'center'}}>Edit a Category</h4>
        ) : (
        <h4 className="mt-2" style={{display: 'flex', justifyContent: 'center'}}>Create a Category</h4>
        )}
        <Form className="w-50 m-auto"
            style={{maxWidth:"20rem"}}
            onSubmit={handleSubmit}
        >
            <FormGroup >               
                    <Input
                        type="text"
                        value={name}
                        placeholder="Enter Name For A Category"
                        onChange={(e) => {
                        setName(e.target.value);
                        }}
                    />
            </FormGroup>
                <ButtonToolbar className="gap-2" style={{float: "right"}}>
                    <Button type="submit" color="success" style={{float: "right"}}>Save</Button>
                    {categoryid && <Button color="danger" onClick={() => {navigate("/categories")}}>Cancel</Button>}
                </ButtonToolbar>
        </Form>
        </>
    )
}