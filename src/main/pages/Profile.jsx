import {
  Link,
  Route,
  Routes,
  useParams,
  useLocation,
  Outlet,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/authcontext";
import {
  useGetUserById,
  useFollowUser,
  useIsFollowing,
} from "@/lib/react-query/queries";
import GridPostList from "@/components/shared/GridPostList";
import Liked from "@/main/pages/Liked";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentUser } = useGetUserById(id || "");
  const { mutate: followUser } = useFollowUser();
  const { data: isFollowing } = useIsFollowing(user.id, id);

  if (!currentUser) return null;

  const handleFollowClick = () => {
    followUser({ followerId: user.id, followingId: id });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img
              src={currentUser.imageUrl || "/icons/profile.png"}
              alt="profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full"
            />
            <div className="ml-6">
              <h1 className="text-2xl font-semibold">{currentUser.name}</h1>
              <p className="text-gray-600">@{currentUser.username}</p>
              <p className="text-sm text-gray-800 mt-2">{currentUser.bio}</p>
            </div>
          </div>
          <div className="flex gap-8 mx-4 items-center">
            {user.id === currentUser.$id && (
              <Link
                to={`/update/${currentUser.$id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Edit Profile
              </Link>
            )}
            {user.id !== currentUser.$id && (
              <Button
                type="button"
                className="bg-blue-500 text-white px-8 py-2 rounded-md  hover:bg-blue-600"
                onClick={handleFollowClick}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-center space-x-8 mb-8 items-end">
          <div className="text-center">
            <div>
              <p className="font-bold text-lg">{currentUser.posts.length}</p>
            </div>
            <p className="text-gray-600">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg">{currentUser.followersCount}</p>
            <p className="text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg">{currentUser.followingCount}</p>
            <p className="text-gray-600">Following</p>
          </div>
        </div>
        <div className="flex mb-8">
          <Link
            to={`/profile/${id}`}
            className={`flex-1 py-2 text-center rounded-l-lg ${
              pathname === `/profile/${id}` && "bg-blue-200"
            }`}
          >
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked`}
            className={`flex-1 py-2 text-center rounded-r-lg ${
              pathname === `/profile/${id}/liked` && "bg-blue-200"
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
