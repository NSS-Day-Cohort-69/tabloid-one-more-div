import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllReactions } from "../../managers/reactionManager";
import { Button, Card, CardBody, CardTitle } from "reactstrap";

export default function ReactionList() {
    const [reactions, setReactions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllReactions().then(setReactions);
    }, [])

    return (
        <>
            <h4 style={{display: 'flex', justifyContent: 'center'}}>Reactions</h4>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Button color="success" onClick={() => navigate("/reactions/create")}>Create a Reaction</Button>
                    </div>
                    {reactions.map((r) => (
                        <Card key={r.id} className="mt-3 m-auto" style={{width: '8rem'}}>
                            <CardBody className="d-flex align-items-center justify-content-center flex-direction-column">
                                <CardTitle className="d-flex mt-1 fw-bold">
                                    {r.name} {r.reactionImage}
                                </CardTitle>
                            </CardBody>
                        </Card>
                    ))}
                </div>
        </>
    )
}