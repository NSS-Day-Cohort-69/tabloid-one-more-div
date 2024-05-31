import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getApprovedAndPublishedPostById } from "../../managers/postManager.js"
import PageContainer from "../PageContainer.jsx"
import { Badge, Button, ButtonToolbar, Card, CardBody, CardImg, CardImgOverlay, CardSubtitle, CardText, CardTitle, Spinner } from "reactstrap"

export const PostDetails = ({ loggedInUser }) => {
    const [post, setPost] = useState(null)

    const {id} = useParams()

    useEffect(() => {
        getApprovedAndPublishedPostById(id).then(setPost)
    }, [])
    
    if (!post) {
        return (
            <PageContainer>
                <Spinner/>
            </PageContainer>
        )
    }
    
    return (
        <PageContainer>
            <Card className="w-75 shadow-sm" style={{maxWidth: "1200px"}} outline color="light" key={post.id}>
                {post.headerImageURL && (
                    <>
                        <CardImg 
                            alt="Post Header Image"
                            src={post.headerImageURL}
                            width="100%"
                            className="mb-1"
                        />
                        <CardImgOverlay>
                            <Badge className="fs-3 fw-bold mb-2 shadow">{post.title}</Badge>
                            <div className="">
                                <Badge className="fs-6 mb-2 shadow" pill>{post.category.name}</Badge>
                            </div>
                        </CardImgOverlay>
                    </>
                )}
                <CardBody className="pt-1">
                    {!post.headerImageURL && (
                        <>
                            <CardTitle className="fs-2 fw-bold mb-0">{post.title}</CardTitle>
                            <div>
                                <Badge className="fs-6" pill>{post.category.name}</Badge>
                            </div>
                        </>
                    )}
                    {post.tags.length > 0 && (
                        <div className="d-flex gap-2 mb-3 pt-2">
                            {post.tags.map(t => {
                                return (
                                    <Badge color="info" key={`tag-${t.id}`} pill>{t.name}</Badge>
                                )
                            })}
                        </div>
                    )}
                    <CardSubtitle>{post.userProfile.fullName}</CardSubtitle>
                    <CardSubtitle>{post.formattedPublicationDate}</CardSubtitle>
                    <CardText className="mt-3">{post.content}</CardText>
                    <ButtonToolbar className="gap-2" style={{float: "right"}}>
                        <Button>Subscribe</Button>
                        <Button>{post.commentsCount} Comments</Button>
                        <Button>Create A Comment</Button>
                        <Button>Manage Tags</Button>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </ButtonToolbar>
                </CardBody>
            </Card>
        </PageContainer>
    )
}

export default PostDetails