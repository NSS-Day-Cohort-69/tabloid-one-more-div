import { useEffect, useState } from "react";
import { getAllComments } from "../../managers/commentManager";
import { useParams } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { getApprovedAndPublishedPostById } from "../../managers/postManager";
import PageContainer from "../PageContainer";

export const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getApprovedAndPublishedPostById(parseInt(id)).then((p) => setPost(p));
  }, [id]);

  useEffect(() => {
    getAllComments(parseInt(id)).then((c) => setComments(c));
  }, [id]);
  return (
    <PageContainer>
      <h1>{post.title}</h1>
      {comments.map((c) => (
        <Card key={c.id}>
          <CardHeader key={c.id}>
            {c.userProfile.userName} - DateCreated/Posted
          </CardHeader>
          <CardBody>
            {/* <p>{c.subject}</p> */}
            <p>{c.content}</p>
          </CardBody>
          {c.userProfileId === post.userProfileId ? (
            <CardFooter>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </CardFooter>
          ) : null}
        </Card>
      ))}
    </PageContainer>
  );
};
