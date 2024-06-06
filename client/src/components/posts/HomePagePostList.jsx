import { useEffect, useState } from "react"
import { getSubscribedPosts } from "../../managers/postManager.js"

export default function HomePagePosts({loggedInUser})
{
    const [subscribedPosts, setSubscribedPosts] = useState([])

    useEffect(() => {
        getSubscribedPosts(loggedInUser.id).then(setSubscribedPosts)
    },[])
    return (
        <div>hello</div>
    )
}