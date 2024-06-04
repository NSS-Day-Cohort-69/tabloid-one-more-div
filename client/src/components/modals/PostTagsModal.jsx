import { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";

const PostTagsModal = ({isModalOpen, toggleModal, allTags, postTags, post}) => {
    const [selectedTagIds, setSelectedTagIds] = useState([])

    const postTagIds = post.tags.map(tag => tag.id);
    useEffect(() => {
        if(isModalOpen)
            {
                
                setSelectedTagIds(postTagIds);
                
            }
    },[isModalOpen])
   
    const handleCheckboxChange = (tagId) => {
        const newSelectedTagIds = [...selectedTagIds];
        const index = newSelectedTagIds.indexOf(tagId)
        if(index === -1)
            {
                newSelectedTagIds.push(tagId)
            }
            else{
                newSelectedTagIds.splice(index, 1)
            }

            setSelectedTagIds(newSelectedTagIds);

    }

    return(
        <Modal isOpen={isModalOpen}>
        <ModalHeader toggle={toggleModal}>
            Associated Tags
        </ModalHeader>
        <ModalBody>
            {allTags.map(t =>( 
                <FormGroup check key={t.id}>
                    <Input
                    type="checkbox"
                    value={t.id}
                    checked={selectedTagIds.includes(t.id)}
                    onChange={() => handleCheckboxChange(t.id)}/>
                    <Label>
                        {t.name}
                    </Label>
                </FormGroup>
                
            ))}
            <Button color="primary" style={{float: "right"}}>Save</Button>
        </ModalBody>
  </Modal>
    )

    
 
}
export default PostTagsModal
