import { useEffect, useState } from "react"
import { getAllTags } from "../managers/tagManager.js"
import { Button, ButtonToolbar, Card, CardBody, CardTitle } from "reactstrap"

export default function TagList()
{
    const [tags, setTags]= useState([])

    useEffect(() => {
        getAllTags().then(setTags)
    },[])
    return(
        <>
        <h4 style={{display: 'flex', justifyContent: 'center'}}>Available Tags</h4>
        <Button className="ms-3" color="success">Create a Tag</Button>
        {tags.map((t) => (
        <Card key={t.id} className="mt-4 w-25 m-auto">
            <CardBody className="d-flex align-items-center justify-content-between">
                <CardTitle className="fw-bold">
                {t.name}
                </CardTitle>
                <ButtonToolbar className="gap-2 "style={{float: "right"}} >
                <Button color="primary" >Edit</Button>
                <Button color="danger">DELETE</Button>
                </ButtonToolbar>
            </CardBody>
        </Card>

        ))}

        </>
    )
}