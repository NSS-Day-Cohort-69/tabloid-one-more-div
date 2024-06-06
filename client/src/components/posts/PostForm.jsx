import { Button, ButtonToolbar, Card, CardBody, Form, FormGroup, Input, InputGroup, InputGroupText, Label } from "reactstrap"
import PageContainer from "../PageContainer.jsx"
import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/categoryManager.js"
import { useNavigate, useParams } from "react-router-dom"
import { createPost, getApprovedAndPublishedPostById, updatePost } from "../../managers/postManager.js"

export const PostForm = ({ loggedInUser }) => {
    const [title, setTitle] = useState("")
    const [categoryId, setCategoryId] = useState(0)
    const [headerImageURL, setHeaderImageURL] = useState("")
    const [content, setContent] = useState("")
    const [date, setDate] = useState("")
    const [includeDate, setIncludeDate] = useState(false)
    const [categories, setCategories] = useState([])

    const {id} = useParams()

    const navigate = useNavigate()
    
    useEffect(() => {
        getAllCategories().then(setCategories)
    }, [])

    useEffect(() => {
        if (id) {
            getApprovedAndPublishedPostById(id).then(post => {
                if (post.userProfileId != loggedInUser.id) {
                    navigate(`/posts/${id}`)
                }
                
                setTitle(post.title)
                setCategoryId(post.categoryId == null ? 0 : post.categoryId)
                setHeaderImageURL(post.headerImageURL == null ? "" : post.headerImageURL)
                setContent(post.content)
            })
        }
    }, [id])

    const handleSubmit = (event) => {
        event.preventDefault()
        
        if (categoryId === 0) {
            window.alert("You need to pick a category!")
            return
        }
        
        if (id) {
            updateExistingPost()
        } else {
            createNewPost()
        }
    }

    const handleCancel = () => {
        if (id) {
            navigate(`/posts/${id}`)
        } else {
            navigate("/posts")
        }
    }

    const createNewPost = () => {
        const newPost = {
            title: title,
            categoryId: categoryId,
            headerImageURL: headerImageURL == "" ? null : headerImageURL,
            content: content,
            publicationDate: includeDate ? date : null,
            userProfileId: loggedInUser.id
        }

        createPost(newPost).then(() => {
            navigate("/posts")
        })
    }

    const updateExistingPost = () => {
        const postUpdate = {
            title: title,
            categoryId: categoryId,
            headerImageURL: headerImageURL == "" ? null : headerImageURL,
            content: content
        }

        updatePost(id, postUpdate).then(() => {
            navigate(`/posts/${id}`)
        })
    }

    return (
        <PageContainer>
            <Card className="w-75 shadow" outline color="light" style={{maxWidth: "1200px"}}>
                <CardBody>
                    {id ? (<h1>Edit Post</h1>) : (<h1>Create new Post</h1>)}
                    <Form
                        onSubmit={handleSubmit}
                    >
                        <FormGroup>
                            <Label className="fw-bold">Title</Label>
                            <Input 
                                type="text"
                                placeholder="Enter the Title for the Post"
                                required
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="fw-bold">Category</Label>
                            <Input
                                type="select"
                                required
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
                                required
                                value={content}
                                onChange={event => setContent(event.target.value)}
                            />
                        </FormGroup>
                        {!id && (
                            <FormGroup>
                                <Label className="fw-bold">When to Publish?</Label>
                                <InputGroup>
                                    <InputGroupText>
                                        <Input 
                                            addon
                                            type="checkbox"
                                            value={includeDate}
                                            onChange={event => setIncludeDate(event.target.checked)}
                                        />
                                    </InputGroupText>
                                    <Input 
                                        type="date"
                                        value={date}
                                        disabled={!includeDate}
                                        onChange={event => setDate(event.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                        )}
                        <ButtonToolbar className="d-flex justify-content-end gap-2">
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button type="submit">Save</Button>
                        </ButtonToolbar>
                    </Form>
                </CardBody>
            </Card>
        </PageContainer>
    )
}

export default PostForm