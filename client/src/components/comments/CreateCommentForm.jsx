import { useState } from "react";
import { useNavigate, useParams, useResolvedPath } from "react-router-dom";
import PageContainer from "../PageContainer";
import { Button, ButtonToolbar, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import { createComment } from "../../managers/commentManager";

export default function CreateCommentForm({ loggedInUser }) {
    const [content, setContent] = useState("");
    const [subject, setSubject] = useState("");

    const { id } = useParams();

    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault()

        const comment = {
            content: content,
            subject: subject,
            postId: parseInt(id),
            userProfileId: loggedInUser.id
        }

        createComment(comment).then(() => {navigate(`/posts/${id}/comments`)})
    }

    return (
        <PageContainer>
            <h4 className="mt-2" style={{display: 'flex', justifyContent: 'center'}}>Create a Comment</h4>
            <Card className="w-75 shadow" outline color="light" style={{maxWidth: "1200px"}}>
                <CardBody>
                    <Form className="w-50 m-auto" style={{maxWidth:"20rem"}} onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label className="fw-bold">Comment Subject</Label>
                            <Input
                                type="text"
                                value={subject}
                                placeholder="Enter Subject"
                                onChange={(e) => {
                                    setSubject(e.target.value);
                                }}
                            />
                        </FormGroup> 
                        <FormGroup>
                            <Label className="fw-bold">Comment Content</Label>
                            <Input
                                type="textarea"
                                value={content}
                                placeholder="Enter Content"
                                onChange={(e) => {
                                    setContent(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <ButtonToolbar className="d-flex justify-content-end gap-2">
                            <Button type="submit">Save</Button>
                        </ButtonToolbar>
                    </Form>
                </CardBody>
            </Card> 
        </PageContainer>
    )
}