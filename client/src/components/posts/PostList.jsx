import { useEffect, useState } from "react"
import { getAllApprovedAndPublishedPosts } from "../../managers/postManager"
import PageContainer from "../PageContainer"
import { Badge, Card, CardLink, CardText, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"
import { getAllCategories } from "../../managers/categoryManager"

export const PostList = ({ loggedInUser }) => {
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [dropdownOpen, setDropdownOpen] = useState(false)

    useEffect(() => {
        getAllApprovedAndPublishedPosts().then(setPosts)
    }, [])

    useEffect(() => {
        getAllCategories().then(setCategories)
    }, [])

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
    }

    const toggle = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const filteredPosts = selectedCategory == 'All' ? posts : 
    posts.filter(p => p.category?.name === selectedCategory);

    return (
        <PageContainer>
            <div className="w-75" style={{maxWidth: "1200px"}}>
                <h1>Posts</h1>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3" style={{ maxWidth: "1200px" }}>
            <div>
                <Dropdown className="shadow-sm" isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        Categories
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => handleCategorySelect('All')}>All</DropdownItem>
                        {categories.map((c) => (
                            <DropdownItem key={c.id} onClick={() => 
                                handleCategorySelect(c.name)
                            }>
                                {c.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div>
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
                            <CardLink className="fs-2 fw-bold text-black text-decoration-none" href={`posts/${p.id}`}>
                                {p.title}
                            </CardLink>
                        </div>
                    </Card>
                )
            })}
            </div>
            </div>
        </PageContainer>
    )
}

export default PostList