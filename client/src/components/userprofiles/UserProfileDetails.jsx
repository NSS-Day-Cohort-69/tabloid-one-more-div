import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfileWithRolesById } from "../../managers/userProfileManager";
import { Card, CardBody, CardText, Label } from "reactstrap";
import defaultPic from "../../resources/defaultPic.png";
export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    getProfileWithRolesById(id).then(setUserProfile);
  }, [id]);

  if (!userProfile) {
    return null;
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
      src={userProfile.imageLocation||defaultPic} style={{ borderRadius: "50%"}}/>
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
        {userProfile.roles.length > 0 ? (
          <>
        <Label className="fw-bold fs-3">Roles:</Label>
        <CardText className="fs-3">
          {userProfile.roles}
        </CardText>
          </>

        ) : (null)}
      </CardBody>
    </Card>
  );
}
