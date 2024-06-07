import { useEffect, useState } from "react"
import {  getProfileWithRolesById } from "../../managers/userProfileManager.js"
import { useParams } from "react-router-dom"
import PageContainer from "../PageContainer.jsx"
import { Button, ButtonToolbar, Form, FormGroup } from "reactstrap"

export default function UserProfileTypeChange()
{
    const [profile,setProfile]=useState({})
    const {id} = useParams()

    useEffect(() => {
        getProfileWithRolesById(id).then(setProfile)
    },[])
    return(
        <PageContainer>
            <Form>
                <FormGroup>
                    <h3>Current User Roles</h3>
                   {profile.roles?.map((p) => (
                    <div key={p}>
                    {p}
                <ButtonToolbar className="gap-2">
                    <Button>Promote</Button>
                    <Button>Demote</Button>
                </ButtonToolbar>
                    </div>
                   ))}
                </FormGroup>
            </Form>
        </PageContainer>
    )
}