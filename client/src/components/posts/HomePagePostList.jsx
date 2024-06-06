import { useEffect, useState } from "react"
import { getSubscribedPosts } from "../../managers/postManager.js"
import PageContainer from "../PageContainer.jsx"
import { Badge, Button, Card, CardLink, CardText} from "reactstrap"

export default function HomePagePosts({loggedInUser})
{
    const [subscribedPosts, setSubscribedPosts] = useState([])

    useEffect(() => {
        getSubscribedPosts(loggedInUser.id).then(setSubscribedPosts)
    },[])
    return (
        <PageContainer>
        <div className="w-75 d-flex align-items-center justify-content-between" style={{maxWidth: "1200px"}}>
            <h1>Subscribed Posts</h1>
            {/* {loggedInUser.roles.includes("Admin") && (
                <Button 
                    color = "primary" 
                    onClick={() => {navigate("unapproved")}}
                >
                    Unapproved Posts: {unapprovedCount}
                </Button>
            )} */}
        </div>
       
        {subscribedPosts.map(p => {
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
                        {p.tags.length > 0 && (
                            <div className="d-flex gap-2 pt-2">
                                {p.tags.map(t => {
                                    return (
                                        <Badge color="info" key={`tag-${t.id}`} pill>{t.name}</Badge>
                                    )
                                })}
                            </div>
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