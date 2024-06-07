import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfileWithRolesById, updateImg } from "../../managers/userProfileManager";
import { Button, Card, CardBody, CardText, Input, Label } from "reactstrap";
import defaultPic from "../../resources/defaultPic.png";
export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState(null);
  const [image, setImage] = useState()

  const { id } = useParams();
  useEffect(() => {
    getProfileWithRolesById(id).then(setUserProfile);
  }, [id]);

  if (!userProfile) {
    return null;
  }

  const saveImgClicked = () => {
    updateImg(userProfile.id, image).then(() => {getProfileWithRolesById(id).then(setUserProfile)})
  }

  return (
    <Card className="w-25 m-auto mt-3 shadow">
      <CardText className="fs-3 m-auto fw-bold">
          {userProfile.userName}
        </CardText>
        <div className="d-flex flex-row-reverse me-2">
          <div className="d-flex">
            <Label className="me-1 fw-bold" >User Since:</Label>
            <CardText className="fst-italic">
              {userProfile.formattedCreateDateTime}
            </CardText>
          </div>
        </div>
      <div className="ms-1">
        <img alt="user profile image" className="w-25 m-auto"
          src={userProfile.imageBlob ? `data:image/jpeg;base64,${userProfile.imageBlob}` : (userProfile.imageLocation || defaultPic)} style={{ borderRadius: "50%"}}
        />
        <Input type="file" className="w-50 mt-2" onChange={(e) => {setImage(e.target.files[0])}}/>
        <Button onClick={saveImgClicked}>Save Image</Button>
      </div>
      <CardBody className="m-auto ">
        <Label className="fw-bold fs-3">FullName:</Label>
    <CardText className="fs-3  ">
          {userProfile.fullName}
        </CardText>
        <Label className="fw-bold fs-3">Email:</Label>
        <CardText className="fs-3">
          {userProfile.email}
        </CardText>
        {userProfile.roles.length > 0 && (
          <>
            <Label className="fw-bold fs-3">Roles:</Label>
            <CardText className="fs-3">
              {userProfile.roles}
            </CardText>
          </>
        )}
      </CardBody>
    </Card>
  );
}
