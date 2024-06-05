import { useEffect, useState } from "react"
import { getAllApprovedAndPublishedPosts, getUnapprovedCount } from "../../managers/postManager"
import PageContainer from "../PageContainer"
import { Badge, Button, Card, CardLink, CardText } from "reactstrap"
import { useNavigate } from "react-router-dom"

export const PostList = ({ loggedInUser }) => {
    const [posts, setPosts] = useState([])
    const [unapprovedCount, setUnapprovedCount] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        getAllApprovedAndPublishedPosts().then(setPosts)
        getUnapprovedCount().then(setUnapprovedCount)
    }, [])

    return (
        <PageContainer>
            <div className="w-75" style={{maxWidth: "1200px"}}>
                {loggedInUser.roles.includes("Admin") && (
                    <Button color = "primary"  style={{float: "right"}} onClick={() => {navigate("unapproved")}}>Unapproved Posts: {unapprovedCount}</Button>
                )}
                <h1>Posts</h1>
            </div>
            {posts.map(p => {
                return (
                    <Card className="w-75 shadow-sm p-3 pb-2" style={{maxWidth: "1200px"}} outline color="light" key={`post-${p.id}`}>
                        <div className="d-flex align-items-center gap-2">
                            <Badge className="fs-6" pill>{p.category?.name}</Badge>
                            {loggedInUser.roles.includes("Admin") ? (
                                <CardLink className="text-black text-decoration-none" href={`userprofiles/${p.userProfile.id}`}>
                                    <em>{p.userProfile.fullName}</em>
                                </CardLink>
                            ) : (
                                <CardText className="fst-italic">
                                    {p.userProfile.fullName}
                                </CardText>
                            )}
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