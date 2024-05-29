import { useEffect, useState } from "react"
import { getAllTags } from "../managers/tagManager.js"
import { Button, ButtonToolbar, Card, CardBody, CardTitle } from "reactstrap"

export default function AllTags()
{
    const [tag, setTag]= useState([])

    useEffect(() => {
        getAllTags().then(setTag)
    },[])
    return(
        <>
        <h4 style={{display: 'flex', justifyContent: 'center'}}>Available Tags</h4>
        {tag.map((t) => (
        <Card className="mt-4 w-25 m-auto">
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