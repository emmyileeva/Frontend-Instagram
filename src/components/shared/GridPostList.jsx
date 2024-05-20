import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const GridPostList = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <Link to={`/posts/${post.$id}`} key={post.$id}>
          <div className="group relative">
            <img
              src={post.imageUrl || "/placeholder.jpg"}
              alt="Post"
              className="w-full h-64 object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
              <p className="text-white font-bold text-lg">View Post</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

GridPostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      $id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
    })
  ).isRequired,
};

export default GridPostList;
