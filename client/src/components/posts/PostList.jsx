import { useEffect, useState } from "react"
import { getAllApprovedAndPublishedPosts } from "../../managers/postManager"
import PageContainer from "../PageContainer"
import { Badge, Card, CardBody, CardSubtitle, CardText } from "reactstrap"

export const PostList = ({ loggedInUser }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getAllApprovedAndPublishedPosts().then(setPosts)
    }, [])
    
    // if (posts.length == 0) {
    //     return (<>Loading...</>)
    // }

    return (
        <PageContainer>
            <div className="w-75">
                <h1>Posts</h1>
            </div>
            {posts.map(p => {
                return (
                    <Card className="w-75 shadow-sm p-1 pb-0" outline color="light" key={`post-${p.id}`}>
                        <CardBody>
                            <div className="d-flex align-items-center gap-2">
                                <Badge className="fs-6 mb-1" pill>{p.category.name}</Badge>
                                <CardSubtitle><em>{p.userProfile.fullName}</em></CardSubtitle>
                            </div>
                            <CardText className="fs-2 fw-bold">{p.title}</CardText>
                        </CardBody>
                    </Card>
                )
            })}
        </PageContainer>
    )
}

export default PostList