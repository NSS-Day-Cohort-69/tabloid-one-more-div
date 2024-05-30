import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createTag } from "../managers/tagManager.js";
import { useNavigate } from "react-router-dom";

export default function CreateTagForm()
{
    const [tagName, setTagName] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const tag = {
            name: tagName
        };
        createTag(tag).then(() => {navigate("/tags")})
    }
    return(
        <div>
            <h4 className="mt-2" style={{display: 'flex', justifyContent: 'center'}}>Create a New Tag</h4>
        <Form className="w-50 m-auto" 
        onSubmit={handleSubmit}>
            <FormGroup>
                <Label>
                    Tag Name
                </Label>
                <Input 
                name="Name"
                placeholder="Enter a name for your tag"
                onChange={(e) => {setTagName(e.target.value)}}/>
            </FormGroup>
            <FormGroup>
                <Button type="submit" color="success" style={{float: "right"}}>
                    Save
                </Button>
            </FormGroup>
        </Form>
        
            
        </div>
    )
}