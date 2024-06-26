import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSubscription, getSubscriptionsById, removeSubscription } from "../../managers/subscriptionManager.js";
import { createPostReaction, deletePostReaction } from "../../managers/postReactionManager.js";
import { deletePost, getApprovedAndPublishedPostById, unapprovePost } from "../../managers/postManager.js";
import { getAllTags } from "../../managers/tagManager.js";
import PostTagsModal from "../modals/PostTagsModal.jsx";
import PageContainer from "../PageContainer.jsx";
import { Badge, Button, Card, CardBody, CardImg, CardImgOverlay, CardSubtitle, CardText, CardTitle, Spinner } from "reactstrap";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal.jsx"

export const PostDetails = ({ loggedInUser }) => {
    const [post, setPost] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [allTags, setAllTags] = useState([])
    const [userSubscriptions, setUserSubscriptions] = useState([])
    
    const {id} = useParams()

    const navigate = useNavigate()
   
    useEffect(() => {
        getApprovedAndPublishedPostById(id).then(setPost)
        getAllTags().then(setAllTags)
        getSubscriptionsById(loggedInUser.id).then(setUserSubscriptions)
    }, [])

    const refresh = () => {
        getApprovedAndPublishedPostById(id).then(setPost)
    }

    const handleDeletePost = () => {
        deletePost(id).then(() => {
            navigate("/posts")
        })
    }

    const handleCreatePostReaction = (reactionId) => {
        const postReaction = {
            userProfileId: loggedInUser.id,
            postId: id,
            reactionId: reactionId,
        };

        createPostReaction(postReaction).then(() => {
            getApprovedAndPublishedPostById(id).then(setPost);
        });
    };

    const handleDeletePostReaction = (reactionId) => {
        const postReaction = {
            userProfileId: loggedInUser.id,
            postId: id,
            reactionId: reactionId,
        };

        deletePostReaction(postReaction).then(() => {
            getApprovedAndPublishedPostById(id).then(setPost);
        });
    };

    const handleSubscribe = (authorId, followerId) => {
        const newSubscription = {
            creatorId: authorId,
            followerId: followerId,
        };

        createSubscription(newSubscription).then(() => {
            getSubscriptionsById(loggedInUser.id).then(setUserSubscriptions);
        });
    };

    const handleUnsubscribe = (CreatorId, followerId) => {
        removeSubscription(CreatorId, followerId).then(() => {
            getSubscriptionsById(loggedInUser.id).then(setUserSubscriptions);
        });
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const toggleDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }

    const handleUnapprove = () => {
        unapprovePost(id).then(() => {
            navigate("/posts")
        })
    }
    
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
                            <Badge className="fs-3 fw-bold mb-2 shadow pe-auto">
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
                        <div className="d-flex gap-2 mb-2 pt-2">
                            {post.tags.map(t => {
                                return (
                                    <Badge color="info" key={`tag-${t.id}`} pill>{t.name}</Badge>
                                )
                            })}
                        </div>
                    )}
                    <div className="fw-bold mt-2">{post.userProfile.fullName}</div>
                    <CardSubtitle>{post.formattedPublicationDate}</CardSubtitle>
                    <CardSubtitle className="fst-italic">
                        {post.estimatedReadTime} {post.estimatedReadTime > 1 ? "minutes" : "minute"}
                    </CardSubtitle>
                    <CardText className="mt-3">{post.content}</CardText>
                    <div className="d-flex flex-column align-items-end">
                        <div className="d-flex flex-row flex-wrap gap-1">
                            {post.reactions.map(r => {
                                if (r.postReactions.some(pr => pr.userProfileId == loggedInUser.id)) {
                                    return (
                                        <Button 
                                            className="px-1 pe-2 py-0" 
                                            color="primary" 
                                            title={r.name} 
                                            onClick={() => handleDeletePostReaction(r.id)}
                                            key={`reaction-${r.id}`}
                                        >
                                            {`${r.reactionImage} ${r.postReactionsCount}`}
                                        </Button>
                                    )
                                } else {
                                    return (
                                        <Button 
                                            className="px-1 pe-2 py-0" 
                                            title={r.name} 
                                            onClick={() => handleCreatePostReaction(r.id)}
                                            key={`reaction-${r.id}`}
                                        >
                                            {`${r.reactionImage} ${r.postReactionsCount}`}
                                        </Button>
                                    )
                                }
                            })}
                        </div>
                        <div className="d-flex flex-row flex-wrap mt-3 w-100 gap-2">
                            <div className="d-flex flex-fill">
                                {loggedInUser.id != post.userProfileId && 
                                   ( userSubscriptions.some(us => us.creatorId == post.userProfileId) ? (
                                        <Button onClick={() => {handleUnsubscribe(post.userProfileId, loggedInUser.id)}}>Unsubscribe</Button>
                                    ) : (
                                        <Button onClick={() => {handleSubscribe(post.userProfileId,loggedInUser.id)}}>Subscribe</Button>
                                    ))
                                }
                            </div>
                            <Button onClick={() => navigate(`comments`)}>{`${post.commentsCount} Comments`}</Button>
                            <Button onClick={() => navigate("comments/create")}>Create A Comment</Button>
                            {loggedInUser.id == post.userProfileId && (
                                <>
                                    <Button onClick={toggleModal}>Manage Tags</Button>
                                    <Button onClick={() => navigate("edit")}>Edit</Button>
                                </>
                            )}
                            {loggedInUser.roles.includes("Admin") && (
                                <Button onClick={handleUnapprove}>Unapprove</Button>
                            )}
                            {(loggedInUser.id == post.userProfileId || loggedInUser.roles.includes("Admin")) && (
                                <Button onClick={toggleDeleteModal}>Delete</Button>
                            )}
                        </div>
                    </div>
                </CardBody>
            </Card>
            <PostTagsModal
                refresh = {refresh}
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                allTags={allTags}
                post={post}
            />
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                toggle={toggleDeleteModal}
                confirmDelete={handleDeletePost}
                typeName={"Post"}
            />
        </PageContainer>
    )
}

export default PostDetails;
