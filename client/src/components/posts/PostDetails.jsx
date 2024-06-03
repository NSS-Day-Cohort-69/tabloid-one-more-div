import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getApprovedAndPublishedPostById } from "../../managers/postManager.js"
import PageContainer from "../PageContainer.jsx"
import { Badge, Button, Card, CardBody, CardImg, CardImgOverlay, CardSubtitle, CardText, CardTitle, Spinner } from "reactstrap"

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
            <Card className="w-75 shadow" style={{maxWidth: "1200px"}} outline color="light" key={post.id}>
                {post.headerImageURL && (
                    <>
                        <CardImg 
                            alt="Post Header Image"
                            src={post.headerImageURL}
                            width="100%"
                            className="mb-1"
                        />
                        <CardImgOverlay className="pe-none">
                            <Badge className="fs-3 fw-bold mb-2 shadow pe-auto" style={{ wordWrap: "normal"}}>
                                {post.title}
                            </Badge>
                            <div className="pe-auto">
                                <Badge className="fs-6 mb-2 shadow" pill>{post.category?.name}</Badge>
                            </div>
                        </CardImgOverlay>
                    </>
                )}
                <CardBody className="pt-1">
                    {!post.headerImageURL && (
                        <>
                            <CardTitle className="fs-2 fw-bold mb-0">{post.title}</CardTitle>
                            <div>
                                <Badge className="fs-6" pill>{post.category?.name}</Badge>
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
                    <CardSubtitle className="fw-bold">{post.userProfile.fullName}</CardSubtitle>
                    <CardSubtitle>{post.formattedPublicationDate}</CardSubtitle>
                    <CardText className="mt-3">{post.content}</CardText>
                    <div className="d-flex flex-column align-items-end">
                        <div className="d-flex flex-row flex-wrap gap-1">
                            {post.reactions.map(r => {
                                if (r.postReactions.some(pr => pr.userProfileId == loggedInUser.id)) {
                                    return (
                                        <Button className="px-1 pe-2 py-0" color="primary" title={r.name} key={`reaction-${r.id}`}>
                                            {`${r.reactionImage} ${r.postReactionsCount}`}
                                        </Button>
                                    )
                                } else {
                                    return (
                                        <Button className="px-1 pe-2 py-0" title={r.name} key={`reaction-${r.id}`}>
                                            {`${r.reactionImage} ${r.postReactionsCount}`}
                                        </Button>
                                    )
                                }
                            })}
                        </div>
                        <div className="d-flex flex-row flex-wrap mt-3 w-100 gap-2">
                            <div className="d-flex flex-fill">
                                {loggedInUser.id != post.userProfileId && (
                                    <Button>Subscribe</Button>
                                )}
                            </div>
                            <Button>{`${post.commentsCount} Comments`}</Button>
                            <Button>Create A Comment</Button>
                            {loggedInUser.id == post.userProfileId && (
                                <>
                                    <Button>Manage Tags</Button>
                                    <Button>Edit</Button>
                                </>
                            )}
                            {(loggedInUser.id == post.userProfileId || loggedInUser.roles.includes("Admin")) && (
                                <Button>Delete</Button>
                            )}
                        </div>
                    </div>
                </CardBody>
            </Card>
        </PageContainer>
    )
}

export default PostDetails