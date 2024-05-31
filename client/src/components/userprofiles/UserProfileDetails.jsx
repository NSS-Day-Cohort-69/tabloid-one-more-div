import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile, getProfileWithRolesById } from "../../managers/userProfileManager";
import { Card, CardBody, CardImg, CardText, Label } from "reactstrap";

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState();

  const { id } = useParams();

  useEffect(() => {
    getProfileWithRolesById(id).then(setUserProfile);
  }, [id]);

  if (!userProfile) {
    return null;
  }
  return (
    <Card className="w-50 m-auto mt-3">
       <div className="">
      <img alt="user profile image" className="w-50"
      src={userProfile.imageLocation} style={{height: 200, borderRadius: "50%"}}/>

      </div>
      <CardBody>
        <Label className="fw-bold">FullName:</Label>
        <CardText>
        {userProfile.fullName}
        </CardText>
        <Label className="fw-bold">UserName:</Label>
        <CardText>
          {userProfile.userName}
        </CardText>
        <Label className="fw-bold">Email:</Label>
        <CardText>
          {userProfile.email}
        </CardText>
        <Label className="fw-bold">Creation Date:</Label>
        <CardText>
          {userProfile.createdOnDate}
        </CardText>
        <Label className="fw-bold">Roles:</Label>
        <CardText>
          {userProfile.roles}
        </CardText>
      </CardBody>
    </Card>
  );
}
