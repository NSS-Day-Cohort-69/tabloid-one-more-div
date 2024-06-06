import { useEffect, useState } from "react"
import { getAllApprovedAndPublishedPosts, getUnapprovedCount } from "../../managers/postManager"
import PageContainer from "../PageContainer"
import { getAllCategories } from "../../managers/categoryManager"   
import { Badge, Button, Card, CardLink, CardText, Input } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { getAllTags } from "../../managers/tagManager"

export const PostList = ({ loggedInUser }) => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState(posts)
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState(0)
    const [tags, setTags] = useState([])
    const [tagId, setTagId] = useState(0)
    const [unapprovedCount, setUnapprovedCount] = useState(null)
    

    const navigate = useNavigate()

    useEffect(() => {
        getAllApprovedAndPublishedPosts().then(setPosts)
        getUnapprovedCount().then(setUnapprovedCount)
        getAllCategories().then(setCategories)
        getAllTags().then(setTags)
    }, [])

    useEffect(() => {
        setFilteredPosts(
            posts.filter(p => 
                (categoryId === 0 || p.categoryId === categoryId) && 
                (tagId === 0 || (p.tags && p.tags.some(tag => tag.id === tagId)))
            )
        )
    }, [posts, categoryId, tagId, categories, tags])

    return (
        <PageContainer>
            <div className="w-75 d-flex align-items-center justify-content-between" style={{maxWidth: "1200px"}}>
                <h1>Posts</h1>
                {loggedInUser.roles.includes("Admin") && (
                    <Button 
                        color = "primary" 
                        onClick={() => {navigate("unapproved")}}
                    >
                        Unapproved Posts: {unapprovedCount}
                    </Button>
                )}
            </div>
            <div className="d-flex justify-content-start w-75 gap-2" style={{maxWidth: "1200px"}}>
                <div>
                    <Input
                        type="select"
                        required
                        value={categoryId}
                        onChange={event => setCategoryId(parseInt(event.target.value))}
                    >
                        <option
                            value={0}
                            key={"c-0"}
                        >
                            All Categories
                        </option>
                        {categories.map(c => (
                            <option
                                value={c.id}
                                key={`c-${c.id}`}
                            >
                                {c.name}
                            </option>
                        ))}
                    </Input>
                </div>
                <div>
                    <Input
                        type="select"
                        required
                        value={tagId}
                        onChange={event => setTagId(parseInt(event.target.value))}
                    >
                        <option
                            value={0}
                            key={"t-0"}
                        >
                            All Tags
                        </option>
                        {tags.map(t => (
                            <option
                                value={t.id}
                                key={`t-${t.id}`}
                            >
                                {t.name}
                            </option>
                        ))}
                    </Input>
                </div>
            </div>
            {filteredPosts.map(p => {
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

export default PostList