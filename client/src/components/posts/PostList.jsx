import { useEffect, useState } from "react"
import { getAllApprovedAndPublishedPosts } from "../../managers/postManager"
import PageContainer from "../PageContainer"
import { Badge, Card, CardLink } from "reactstrap"

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
                            <Badge className="fs-6" pill>{p.category.name}</Badge>
                            <CardLink className="text-black text-decoration-none" href={`userprofiles/${p.userProfile.id}`}>
                                <em>{p.userProfile.fullName}</em>
                            </CardLink>
                        </div>
                        <div>
                            <CardLink className="fs-2 fw-bold text-black text-decoration-none" href={`posts/${p.id}`}>
                                {p.title}
                            </CardLink>
                        </div>
                    </Card>
                )
            })}
        </PageContainer>
    )
}

export default PostList