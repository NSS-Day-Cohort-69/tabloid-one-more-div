import { useEffect, useState } from "react"
import { approvePost, deletePost, getUnapprovedPosts } from "../../managers/postManager.js"
import PageContainer from "../PageContainer.jsx"
import { Badge, Button, Card, CardBody, CardImg, CardImgOverlay, CardSubtitle, CardText, CardTitle } from "reactstrap"
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal.jsx"

export default function ApprovePost({loggedInUser}){
    const [unapprovedPosts, setUnapprovedPosts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [postToDelete, setPostToDelete] = useState(0)

    useEffect(() => {
        getUnapprovedPosts().then(setUnapprovedPosts)
    },[])

    const handleDeleteModal = (postId) => {
        setPostToDelete(postId)
        toggleModal()
    }
    
    const handleDelete = () => {
        deletePost(postToDelete).then(() => {
            toggleModal()
            getUnapprovedPosts().then(setUnapprovedPosts)
        })
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <PageContainer>
            <h2>Unapproved Posts</h2>
            {unapprovedPosts.map(up => {
                return (
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
                            <div className="fw-bold">{up.userProfile.fullName}</div>
                            <CardSubtitle>{up.formattedPublicationDate}</CardSubtitle>
                            <CardSubtitle className="fst-italic">
                                {up.estimatedReadTime} {up.estimatedReadTime > 1 ? "minutes" : "minute"}
                            </CardSubtitle>
                            <CardText className="mt-3">{up.content}</CardText>
                            <div className="d-flex flex-row flex-wrap mt-3 w-100 gap-2">
                                {(loggedInUser.id == up.userProfileId || loggedInUser.roles.includes("Admin")) && (
                                    <Button onClick={() => handleDeleteModal(up.id)}>
                                        Delete
                                    </Button>
                                )}
                                <Button onClick={() => {
                                    approvePost(up.id).then(() => {
                                        getUnapprovedPosts().then(setUnapprovedPosts)
                                    })}} 
                                >
                                    Approve
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                )
            })}
            <ConfirmDeleteModal 
                isOpen={isModalOpen}
                toggle={toggleModal}
                confirmDelete={handleDelete}
                typeName={"Post"}
            />
        </PageContainer>
    )
}
