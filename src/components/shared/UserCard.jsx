import { Link } from "react-router-dom";
import Button from "../ui/button";
import propTypes from "prop-types";

const UserCard = ({ user }) => {
  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        src={user.imageUrl || "/icons/profile.png"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

UserCard.propTypes = {
  user: propTypes.shape({
    $id: propTypes.string.isRequired,
    imageUrl: propTypes.string,
    name: propTypes.string.isRequired,
    username: propTypes.string.isRequired,
  }),
};

export default UserCard;