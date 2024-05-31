import { useEffect, useState } from "react"
import { getAllApprovedAndPublishedPosts } from "../../managers/postManager"
import PageContainer from "../PageContainer"
import { Badge, Card, CardSubtitle, CardText } from "reactstrap"

export const PostList = ({ loggedInUser }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getAllApprovedAndPublishedPosts().then(setPosts)
    }, [])

    return (
        <PageContainer>
            <div className="w-75" style={{maxWidth: "1200px"}}>
                <h1>Posts</h1>
            </div>
            {posts.map(p => {
                return (
                    <Card className="w-75 shadow-sm p-3 pb-2" style={{maxWidth: "1200px"}} outline color="light" key={`post-${p.id}`}>
                        <div className="d-flex align-items-center gap-2">
                            <Badge className="fs-6 mb-1" pill>{p?.category?.name}</Badge>
                            <CardSubtitle><em>{p.userProfile.fullName}</em></CardSubtitle>
                        </div>
                        <CardText className="fs-2 fw-bold">{p.title}</CardText>
                    </Card>
                )
            })}
        </PageContainer>
    )
}

export default PostList