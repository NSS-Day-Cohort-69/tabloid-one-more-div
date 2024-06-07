import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReaction } from "../../managers/reactionManager";
import { Button, ButtonToolbar, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import PageContainer from "../PageContainer";

export default function CreateReaction() {
    const [name, setName] = useState("");
    const [reactionImage, setReactionImage] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const reaction = {
            name: name,
            reactionImage: reactionImage
        };
        
        createReaction(reaction).then(() => {navigate("/reactions")})
    }

    return (
        <PageContainer>
            <h4 className="mt-2" style={{display: 'flex', justifyContent: 'center'}}>Create a Reaction</h4>
            <Card className="w-75 shadow" outline color="light" style={{maxWidth: "1200px"}}>
                <CardBody>
                    <Form className="w-50 m-auto"
                        style={{maxWidth:"20rem"}}
                        onSubmit={handleSubmit}
                    >
                        <FormGroup>
                            <Label className="fw-bold">Reaction Name</Label>
                            <Input
                                type="text"
                                value={name}
                                placeholder="Enter Name For The Reaction"
                                onChange={(e) => {
                                setName(e.target.value);
                                }}
                            />
                        </FormGroup> 
                        <FormGroup>
                            <Label className="fw-bold">Reaction Image</Label>
                            <Input
                                 type="text"
                                value={reactionImage}
                                placeholder="Enter Reaction Image"
                                onChange={(e) => {
                                setReactionImage(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <ButtonToolbar className="d-flex justify-content-end gap-2">
                            <Button type="submit">Create</Button>
                        </ButtonToolbar>
                    </Form>
                </CardBody>
            </Card>
        </PageContainer>
    )
}