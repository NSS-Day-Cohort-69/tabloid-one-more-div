import { useEffect, useState } from "react";
import { changeIsActiveStatus, getProfiles } from "../../managers/userProfileManager";
import { Button, ButtonToolbar, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

export default function UserProfileList() {
  const [userprofiles, setUserProfiles] = useState([]);

  const getUserProfiles = () => {
    getProfiles().then(setUserProfiles);
  };
  useEffect(() => {
    getUserProfiles();
  }, []);

  const handleIsActiveChange = (id) => {
    changeIsActiveStatus(id).then(() =>{getProfiles().then(setUserProfiles)})
  }
  return (
    <>
      <h1 className="text-center mt-3 mb-3">User Profiles</h1>
      <div className="d-flex justify-content-end" style={{ width: "90%" }}>
        <Button>View Deactivated</Button>
      </div>

      {userprofiles.filter(p => p.isActive).map((p) => (
        <Card className="w-50 mx-auto md-2 mt-2 " key={p.id}>
          <CardBody className="d-flex align-items-center justify-content-around flex-column">
            {p.userName}
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/userprofiles/${p.id}`}
            >
              <CardTitle className="m-0" style={{ fontSize: "25px" }}>
                {p.fullName}{" "}
              </CardTitle>
            </Link>
            {p.roles.map((p) => p)}
            <div className="d-flex gap-2">
              <Button style={{ paddingLeft: "37px", paddingRight: "37px" }}>
                Edit
              </Button>
              <Button onClick={() => {handleIsActiveChange(p.id)}}>Deactivate</Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
