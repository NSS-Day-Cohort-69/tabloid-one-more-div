import { useEffect, useState } from "react"
import { approvePost, getUnapprovedPosts } from "../../managers/postManager.js"
import PageContainer from "../PageContainer.jsx"
import { Badge, Button, Card, CardBody, CardImg, CardImgOverlay, CardSubtitle, CardText, CardTitle } from "reactstrap"

export default function ApprovePost({loggedInUser}){

    const [unapprovedPosts, setUnapprovedPosts] = useState([])


    useEffect(() => {
        getUnapprovedPosts().then(setUnapprovedPosts)
    },[])
    return (
        <PageContainer>
            <h2>Unapproved Posts</h2>
            {unapprovedPosts.map(up => {
                return(
                    <Card className="w-75 shadow" style={{maxWidth: "1200px"}} outline color="light" key={up.id}>
                        {up.headerImageURL && (
                            <>
                                <CardImg 
                                    alt="Up Header Image"
                                    src={up.headerImageURL}
                                    width="100%"
                                    className="mb-1"
                                />
                                <CardImgOverlay className="pe-none">
                                    <Badge className="fs-3 fw-bold mb-2 shadow pe-auto">
                                        {up.title}
                                    </Badge>
                                    <div className="pe-auto ">
                                        <Badge className="fs-6 mb-2 shadow" pill>{up.category?.name}</Badge>
                                    </div>
                                </CardImgOverlay>
                            </>
                        )}
                        <CardBody className="pt-1">
                            {!up.headerImageURL && (
                                <>
                                    <CardTitle className="fs-2 fw-bold mb-0">{up.title}</CardTitle>
                                    <div className="mb-2">
                                        <Badge className="fs-6" pill>{up.category?.name}</Badge>
                                    </div>
                                </>
                            )}
                            <CardSubtitle className="fw-bold">{up.userProfile.fullName}</CardSubtitle>
                            <CardSubtitle>{up.formattedPublicationDate}</CardSubtitle>
                            <CardText className="mt-3">{up.content}</CardText>
                            <div className="d-flex flex-row flex-wrap mt-3 w-100 gap-2">
                                {(loggedInUser.id == up.userProfileId || loggedInUser.roles.includes("Admin")) && (
                                    <Button>Delete</Button>
                                )}
                                <Button onClick={() => {approvePost(up.id)
                                    .then(getUnapprovedPosts()
                                    .then(setUnapprovedPosts))}} 
                                >
                                    Approve
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                )
  
            })}
            
        </PageContainer>
    )
}
