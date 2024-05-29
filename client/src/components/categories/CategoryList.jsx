import { useEffect, useState } from "react";
import { getAllCategories } from "../../managers/CategoryManager";
import { Button, ButtonToolbar, Card, CardBody, CardTitle, Table } from "reactstrap";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);

    return (
        <div>
        {categories.map((c) => (
        <Card className="mt-3 w-25 m-auto">
            <CardBody className="d-flex align-items-center justify-content-between">
                
                <CardTitle>
                    {c.name}
                </CardTitle>
                
                <ButtonToolbar className="gap-2 ">
                    <Button color="primary">Edit</Button>
                    <Button className="btn-danger">Delete</Button>
                </ButtonToolbar>
            </CardBody>
        </Card>
        ))}
        </div>
    )
}