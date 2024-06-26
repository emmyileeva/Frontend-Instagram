import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useUserContext } from "@/context/authcontext";
import { useFollowUser, useIsFollowing } from "@/lib/react-query/queries";

const UserCard = ({ user }) => {
  const { user: currentUser } = useUserContext();
  const { mutate: followUser } = useFollowUser();
  console.log(followUser);

  const { data: isFollowing } = useIsFollowing(currentUser.id, user.$id);

  const handleFollowClick = (event) => {
    event.preventDefault();
    console.log("Follow button clicked");
    if (currentUser.id !== user.$id) {
      console.log("Sending follow request...");
      followUser(
        { followerId: currentUser.id, followingIds: [user.$id] },
        {
          onSuccess: () => {
            console.log("Follow request successful");
          },
          onError: (error) => {
            console.error("Error sending follow request", error);
          },
        }
      );
    } else {
      console.log("User cannot follow themselves");
    }
  };

  console.log("currentUser.id:", currentUser.id);
  console.log("user.$id:", user.$id);
  console.log("isFollowing:", isFollowing);

  return (
    <Link to={`/profile/${user.$id}`}>
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:bg-gray-100 transition duration-300">
        <img
          src={user.imageUrl || "/icons/profile.png"}
          alt="creator"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="mt-4 text-center">
          <p className="font-bold text-lg text-gray-800 truncate">
            {user.name}
          </p>
          <p className="text-gray-600 text-sm truncate">@{user.username}</p>
        </div>
        {currentUser.id !== user.$id ? (
          <button
            onClick={handleFollowClick}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-300"
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        ) : (
          <div className="mt-4 px-4 py-2 h-10"></div>
        )}
      </div>
    </Link>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    $id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};

export default UserCard;
