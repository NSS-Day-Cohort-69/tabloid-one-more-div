import { useEffect, useState } from "react"
import PageContainer from "../PageContainer.jsx"
import { Badge, Button, Card, CardBody, CardImg, CardImgOverlay, CardSubtitle, CardText, CardTitle, Spinner } from "reactstrap"
import { deletePost, getMyPosts, publishPost, unpublishPost } from "../../managers/postManager.js"
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal.jsx"
import { useNavigate } from "react-router-dom"
import PostTagsModal from "../modals/PostTagsModal.jsx"
import { getAllTags } from "../../managers/tagManager.js"

export const MyPostList = ({ loggedInUser }) => {
    const [posts, setPosts] = useState(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isTagsModalOpen, setIsTagsModalOpen] = useState(false)
    const [postToDelete, setPostToDelete] = useState(0)
    const [postToUpdateTags, setPostToUpdateTags] = useState(null)
    const [tags, setTags] = useState([])
    
    const navigate = useNavigate()

    useEffect(() => {
        getMyPosts(loggedInUser.id).then(setPosts)
        getAllTags().then(setTags)
    }, [])

    const refreshPosts = () => {
        getMyPosts(loggedInUser.id).then(setPosts)
    }
    
    const handleDeleteModal = (postId) => {
        setPostToDelete(postId)
        toggleModal()
    }
    
    const handleDelete = () => {
        deletePost(postToDelete).then(() => {
            toggleModal()
            getMyPosts(loggedInUser.id).then(setPosts)
        })
    }

    const toggleDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }

    const handleTagsModal = (post) => {
        setPostToUpdateTags(post)
        toggleTagsModal()
    }

    const toggleTagsModal = () => {
        setIsTagsModalOpen(!isTagsModalOpen)
    }

    const handlePublish = (postId) => {
        publishPost(postId).then(() => {
            getMyPosts(loggedInUser.id).then(setPosts)
        })
    }

    const handleUnpublish = (postId) => {
        unpublishPost(postId).then(() => {
            getMyPosts(loggedInUser.id).then(setPosts)
        })
    }

    if (posts == null) {
        return (
            <PageContainer>
                <Spinner/>
            </PageContainer>
        )
    }
    
    return (
        <PageContainer>
            {posts.map(p => {
                return (
                    <Card className="w-75 shadow" style={{maxWidth: "1200px"}} outline color="light" key={p.id}>
                        {p.headerImageURL && (
                            <>
                                <CardImg 
                                    alt="P Header Image"
                                    src={p.headerImageURL}
                                    width="100%"
                                    className="mb-1"
                                />
                                <CardImgOverlay className="pe-none">
                                    <Badge className="fs-3 fw-bold mb-2 shadow pe-auto">
                                        {p.title}
                                    </Badge>
                                    <div className="pe-auto ">
                                        <Badge className="fs-6 mb-2 shadow" pill>{p.category?.name}</Badge>
                                    </div>
                                </CardImgOverlay>
                            </>
                        )}
                        <CardBody className="pt-1">
                            {!p.headerImageURL && (
                                <>
                                    <CardTitle className="fs-2 fw-bold mb-0">{p.title}</CardTitle>
                                    <div className="mb-2">
                                        <Badge className="fs-6" pill>{p.category?.name}</Badge>
                                    </div>
                                </>
                            )}
                            <div>
                                {p.tags.length > 0 && (
                                    <div className="d-flex gap-2 my-1">
                                        {p.tags.map(t => {
                                            return (
                                                <Badge color="info" key={`tag-${t.id}`} pill>{t.name}</Badge>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                            <div className="fw-bold">{p.userProfile.fullName}</div>
                            <CardSubtitle>{p.formattedPublicationDate}</CardSubtitle>
                            <CardSubtitle className="fst-italic">
                                {p.estimatedReadTime} {p.estimatedReadTime > 1 ? "minutes" : "minute"}
                            </CardSubtitle>
                            <CardText className="mt-3">{p.content}</CardText>
                            <div className="d-flex flex-row mt-3 gap-2 justify-content-end">
                                {Date.parse(p.publicationDate) > Date.now() ? (
                                    <Button onClick={() => handlePublish(p.id)}>
                                        Publish
                                    </Button>
                                ) : (
                                    <Button onClick={() => handleUnpublish(p.id)}>
                                        Unpublish
                                    </Button>
                                )}
                                <Button onClick={() => handleTagsModal(p)}>
                                    Manage Tags
                                </Button>
                                <Button onClick={() => navigate(`/posts/${p.id}/edit`)}>
                                    Edit
                                </Button>
                                <Button onClick={() => handleDeleteModal(p.id)}>
                                    Delete
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                )
            })}
            {postToUpdateTags && (
                <PostTagsModal
                    refresh = {refreshPosts}
                    isModalOpen={isTagsModalOpen}
                    toggleModal={toggleTagsModal}
                    allTags={tags}
                    post={postToUpdateTags}
                />
            )}
            <ConfirmDeleteModal 
                isOpen={isDeleteModalOpen}
                toggle={toggleDeleteModal}
                confirmDelete={handleDelete}
                typeName={"Post"}
            />
        </PageContainer>
    )
}

export default MyPostList