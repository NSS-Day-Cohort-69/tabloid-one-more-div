import { useEffect, useState } from "react";
import { getAllComments } from "../../managers/commentManager";
import { useParams } from "react-router-dom";
import {
  Button,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";
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
        <Card key={c.id} className="w-50">
          <CardHeader key={c.id}>
            {c.userProfile.userName} - {c.formattedDateCreated}
          </CardHeader>
          <CardBody>
            <p>{c.subject}</p>
            <p>{c.content}</p>
          </CardBody>
          {c.userProfileId === post.userProfileId ? (
            <CardFooter>
              <ButtonToolbar className="gap-2">
                <Button>Edit</Button>
                <Button>Delete</Button>
              </ButtonToolbar>
            </CardFooter>
          ) : null}
        </Card>
      ))}
    </PageContainer>
  );
};
