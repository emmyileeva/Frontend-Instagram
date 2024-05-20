import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PostStats from "./PostStats";
import { useUserContext } from "@/context/authcontext";
import getTimeAgo from "@/lib/utils";

const PostCard = ({ post }) => {
  const { user } = useUserContext();

  if (!post.creator) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <Link to={`/profile/${post.creator.$id}`}>
          <img
            src={post.creator?.imageUrl || "/icons/profile.png"}
            alt="creator"
            className="w-12 h-12 rounded-full"
          />
        </Link>
        <div className="ml-4">
          <p className="font-bold text-lg text-gray-800">{post.creator.name}</p>
          <p className="text-gray-600 text-sm">{getTimeAgo(post.$createdAt)}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-800">{post.caption}</p>
        <ul className="flex gap-1 mt-2">
          {post.tags.map((tag, index) => (
            <li key={`${tag}${index}`} className="text-gray-500 text-sm">
              #{tag}
            </li>
          ))}
        </ul>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <img
          src={post.imageUrl || "/icons/profile.png"}
          alt="post image"
          className="w-full h-auto rounded-md"
        />
      </Link>
      {user.id === post.creator.$id && (
        <Link to={`/update-post/${post.$id}`} className="mt-2 text-blue-500">
          Edit Post
        </Link>
      )}
      <PostStats post={post} userId={user.id} />
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    creator: PropTypes.shape({
      $id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      name: PropTypes.string.isRequired,
    }),
    $id: PropTypes.string.isRequired,
    $createdAt: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default PostCard;
