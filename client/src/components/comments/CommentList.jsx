import { useEffect, useState } from "react";
import { deleteComment, getAllComments } from "../../managers/commentManager";
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

export const CommentList = ({ loggedInUser }) => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getApprovedAndPublishedPostById(parseInt(id)).then(setPost);
  }, [id]);

  useEffect(() => {
    getAllComments(parseInt(id)).then(setComments);
  }, [id]);

  const removeComment = (postId) => {
    deleteComment(postId).then(() => {
      getAllComments(parseInt(id)).then(setComments);
    });
  };

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
          {c.userProfileId === loggedInUser.id && (
            <CardFooter>
              <ButtonToolbar className="gap-2">
                <Button>Edit</Button>
                <Button onClick={() => removeComment(c.id)}>Delete</Button>
              </ButtonToolbar>
            </CardFooter>
          )}
        </Card>
      ))}
    </PageContainer>
  );
};
