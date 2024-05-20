import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserCard = ({ user }) => {
  return (
    <Link to={`/profile/${user.$id}`}>
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
        <img
          src={user.imageUrl || "/icons/profile.png"}
          alt="creator"
          className="w-14 h-14 rounded-full"
        />
        <div className="ml-4 flex-grow">
          {" "}
          <div>
            <p className="font-bold text-lg text-gray-800">{user.name}</p>
            <p className="text-gray-600 text-sm">@{user.username}</p>
          </div>
          <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md">
            Follow
          </button>
        </div>
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
