import { useEffect, useState } from "react"
import {  demoteUser, getProfileWithRolesById, promoteUser } from "../../managers/userProfileManager.js"
import { useNavigate, useParams } from "react-router-dom"
import PageContainer from "../PageContainer.jsx"
import { Button, ButtonToolbar, Form, FormGroup } from "reactstrap"

export default function UserProfileTypeChange({loggedInUser})
{
    const [profile,setProfile]=useState({})

    const {id} = useParams()
    
    const navigate = useNavigate()

    useEffect(() => {
        getProfileWithRolesById(id).then(setProfile)
    },[])

    const promoteClicked = (userId) => {
        promoteUser(userId).then(() => {
            getProfileWithRolesById(id)
            .then(setProfile)
        })
    }

    const demoteClicked = (userId) => {
        demoteUser(userId).then(() => {
            getProfileWithRolesById(id)
            .then(setProfile)
        })
    }
    return(
        <PageContainer>
            <Form>
                <FormGroup>
                    <h3>{profile.fullName}'s Roles</h3>
                    {profile.roles?.map((p) => (
                        <div key={p}>
                        {p}
                        </div>
                    ))}
                <ButtonToolbar className="gap-2">
                    {loggedInUser.id != profile.id ? (
                        <>
                        {profile.roles?.includes("Admin") ? (
                        <Button 
                            onClick={() => {
                            demoteClicked(profile.identityUserId)
                            }}>
                            Demote
                        </Button>
                        ) : (
                        <Button 
                            onClick={() => {
                            promoteClicked(profile.identityUserId)
                            }}>
                            Promote
                        </Button>
                        )}
                        </>
                    ) : (null)}
                    <Button onClick={() => {navigate("/userprofiles")}}>Cancel</Button>
                </ButtonToolbar>
                </FormGroup>
            </Form>
        </PageContainer>
    )
}