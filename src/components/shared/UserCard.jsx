import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserCard = ({ user }) => {
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
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-300">
          Follow
        </button>
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
