import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import PostList from "./posts/PostList.jsx";
import CategoryList from "./categories/CategoryList";
import TagList from "./tags/TagList.jsx";
import CreateTagForm from "./tags/CreateTagForm.jsx";
import CreateCategoryForm from "./categories/CreateCategoryForm.jsx";
import PostDetails from "./posts/PostDetails.jsx";
import { CommentList } from "./comments/CommentList.jsx";
import PostForm from "./posts/PostForm.jsx";
import ApprovePost from "./posts/ApprovePost.jsx";
import HomePagePosts from "./posts/HomePagePostList.jsx";
import ReactionList from "./reactions/ReactionList.jsx";
import CreateReaction from "./reactions/CreateReaction.jsx";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <HomePagePosts loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />
        <Route path="/userprofiles">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileList />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileDetails />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route path="posts">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <PostList loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
          <Route path=":id">
            <Route
              index
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <PostDetails loggedInUser={loggedInUser} />
                </AuthorizedRoute>
              }
            />
            <Route path="comments">
              <Route
                index
                element={
                  <AuthorizedRoute loggedInUser={loggedInUser}>
                    <CommentList loggedInUser={loggedInUser} />
                  </AuthorizedRoute>
                }
              />
            </Route>
            <Route 
              path="edit"
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <PostForm loggedInUser={loggedInUser}/>
                </AuthorizedRoute>
              }
            />
          </Route>
          <Route path="unapproved">
            <Route
              index
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <ApprovePost loggedInUser={loggedInUser} />
                </AuthorizedRoute>
              }
            />
          </Route>
          <Route
            path="new"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <PostForm loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route path="/categories">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <CategoryList />
              </AuthorizedRoute>
            }
          />
          <Route
            path="create"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <CreateCategoryForm />
              </AuthorizedRoute>
            }
          />
          <Route path=":categoryid">
            <Route
              path="edit"
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <CreateCategoryForm />
                </AuthorizedRoute>
              }
            />
          </Route>
        </Route>
        <Route path="tags">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <TagList />
              </AuthorizedRoute>
            }
          />
          <Route
            path="create"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <CreateTagForm />
              </AuthorizedRoute>
            }
          />
          <Route path=":tagid">
            <Route
              path="edit"
              element={
                <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                  <CreateTagForm />
                </AuthorizedRoute>
              }
            />
          </Route>
        </Route>
        <Route path="reactions">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <ReactionList/>
              </AuthorizedRoute>
            }
          />
          <Route
            path="create"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <CreateReaction/>
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
