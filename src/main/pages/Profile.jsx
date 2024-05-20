import GridPostList from "@/components/shared/GridPostList";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/authcontext";
import { useGetUserById } from "@/lib/react-query/queries";
import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { Liked } from "@/main/pages";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentUser } = useGetUserById(id || "");

  if (!currentUser) return null;

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={
                currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full"
            />
            <div className="ml-6">
              <h1 className="text-2xl font-semibold">{currentUser.name}</h1>
              <p className="text-gray-600">@{currentUser.username}</p>
            </div>
          </div>
          <div className="flex gap-8">
            {user.id === currentUser.$id && (
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Edit Profile
              </Link>
            )}
            {user.id !== currentUser.$id && (
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            )}
          </div>
        </div>
        <div className="mt-8">
          <p className="text-sm text-gray-800">{currentUser.bio}</p>
        </div>
        <div className="flex mt-8">
          <Link
            to={`/profile/${id}`}
            className={`flex-1 py-2 text-center rounded-l-lg ${
              pathname === `/profile/${id}` && "bg-blue-200"
            }`}
          >
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`flex-1 py-2 text-center rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "bg-blue-200"
            }`}
          >
            Liked Posts
          </Link>
        </div>
        <Routes>
          <Route
            index
            element={
              <GridPostList posts={currentUser.posts} showUser={false} />
            }
          />
          {currentUser.$id === user.id && (
            <Route path="/liked" element={<Liked />} />
          )}
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
