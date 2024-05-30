import { useEffect, useState } from "react";
import { getAllCategories } from "../../managers/categoryManager";
import { Button, ButtonToolbar, Card, CardBody, CardTitle, Table } from "reactstrap";
import { Link } from "react-router-dom";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);

    return (
        <div>
        <h4 style={{display: 'flex', justifyContent: 'center'}}>Categories</h4>
        <Link to="/categories/create"><Button color="success">Create a Category</Button></Link>
        {categories.map((c) => (
        <Card key={c.id} className="mt-3 w-25 m-auto">
            <CardBody className="d-flex align-items-center justify-content-between">
                
                <CardTitle>
                    {c.name}
                </CardTitle>
                
                <ButtonToolbar className="gap-2 ">
                    <Button color="primary">Edit</Button>
                    <Button color="danger">Delete</Button>
                </ButtonToolbar>
            </CardBody>
        </Card>
        ))}
        </div>
    )
}