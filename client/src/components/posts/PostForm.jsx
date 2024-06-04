import { Button, ButtonToolbar, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import PageContainer from "../PageContainer.jsx"
import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/categoryManager.js"

export const PostForm = ({ loggedInUser }) => {
    const [title, setTitle] = useState("")
    const [categoryId, setCategoryId] = useState(0)
    const [headerImageURL, setHeaderImageURL] = useState("")
    const [content, setContent] = useState("")
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(setCategories)
    }, [])

    const handleSubmit = (event) => {
        // Implement submission handler
    }

    return (
        <PageContainer>
            <Card className="w-75 shadow" outline color="light" style={{maxWidth: "1200px"}}>
                <CardBody>
                    <h1>Create new Post</h1>
                    <Form>
                        <FormGroup>
                            <Label className="fw-bold">Title</Label>
                            <Input 
                                type="text"
                                placeholder="Enter the Title for the Post"
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="fw-bold">Category</Label>
                            <Input
                                type="select"
                                value={categoryId}
                                onChange={event => setCategoryId(event.target.value)}
                            >
                                <option
                                    value={0}
                                    key={"c-0"}
                                    disabled
                                >
                                    Choose a Category
                                </option>
                                {categories.map(c => (
                                    <option
                                        value={c.id}
                                        key={`c-${c.id}`}
                                    >
                                        {c.name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label className="fw-bold">Header Image URL</Label>
                            <Input 
                                type="text"
                                placeholder="(Optional) Enter the URL for the Post Header"
                                value={headerImageURL}
                                onChange={event => setHeaderImageURL(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="fw-bold">Post Content</Label>
                            <Input 
                                type="text"
                                placeholder="Enter the content for the Post"
                                value={content}
                                onChange={event => setContent(event.target.value)}
                            />
                        </FormGroup>
                        <ButtonToolbar className="d-flex justify-content-end gap-2">
                            <Button>Cancel</Button>
                            <Button>Submit</Button>
                        </ButtonToolbar>
                    </Form>
                </CardBody>
            </Card>
        </PageContainer>
    )
}

export default PostForm