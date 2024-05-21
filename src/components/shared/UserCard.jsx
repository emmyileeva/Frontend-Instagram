import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserCard = ({ user }) => {
  return (
    <Link to={`/profile/${user.$id}`}>
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center hover:bg-gray-100 transition duration-300">
        <img
          src={user.imageUrl || "/icons/profile.png"}
          alt="creator"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <div>
            <p className="font-bold text-lg text-gray-800">{user.name}</p>
            <p className="text-gray-600 text-sm">@{user.username}</p>
          </div>
          <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition duration-300">
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
