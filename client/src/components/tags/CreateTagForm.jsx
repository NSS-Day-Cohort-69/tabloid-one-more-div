import { useEffect, useState } from "react";
import { Button, ButtonToolbar, Form, FormGroup, Input, Label } from "reactstrap";
import { createTag, getTagById, updateTag } from "../../managers/tagManager.js";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateTagForm()
{
    const [tagName, setTagName] = useState("")
    const [editTag, setEditTag] = useState({})
    const navigate = useNavigate()
    const {tagid} = useParams()

    useEffect(() => {
        if(tagid)
            {
                getTagById(tagid).then((tagObj) => {
                    setEditTag(tagObj)
                    setTagName(tagObj.name)
                })
            }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        const tag = {
            name: tagName
        };
        const tagToUpdate = {
           
            name: tagName
        }
        if(tagid)
            {
                updateTag(editTag.id,tagToUpdate).then(() => {navigate("/tags")})
            }
            else
            {

                createTag(tag).then(() => {navigate("/tags")})
            }
    }
    return(
        <div>
            {tagid ? (
            <h4 className="mt-2" style={{display: 'flex', justifyContent: 'center'}}>Edit a Tag</h4>    
            ) : (
            <h4 className="mt-2" style={{display: 'flex', justifyContent: 'center'}}>Create a New Tag</h4>
            )}
        <Form className="w-50 m-auto" 
        style={{maxWidth: "20rem"}}
        onSubmit={handleSubmit}>
            <FormGroup>
                <Label>
                    Tag Name
                </Label>
                <Input 
                name="Name"
                value={tagName}
                placeholder="Enter a Tag name"
                onChange={(e) => {setTagName(e.target.value)}}/>
            </FormGroup>
            <FormGroup>
              <ButtonToolbar  className="gap-2 "style={{float: "right"}}>
              <Button type="submit" color="primary" style={{float: "right"}}>
                    Save
                </Button>
                {tagid ? (

                    <Button color="danger" onClick={() => {navigate("/tags")}}>Cancel</Button>
                ) : (null)}
              </ButtonToolbar>
            </FormGroup>
        </Form>
        
            
        </div>
    )
}
