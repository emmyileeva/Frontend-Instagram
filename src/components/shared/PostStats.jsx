import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { checkIsLiked } from "@/lib/utils";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/lib/react-query/queries";

const PostStats = ({ post, userId }) => {
  const location = useLocation();
  const likesList = post.likes.map((user) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save?.find(
    (record) => record.post?.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser, savedPostRecord]);

  const handleLikePost = (e) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (e) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}
    >
      <div className="flex gap-2 mr-5">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={`${
              checkIsLiked(likes, userId)
                ? "/icons/liked.png"
                : "/icons/like.png"
            }`}
            alt="like"
            width={20}
            height={20}
            onClick={(e) => handleLikePost(e)}
            className="cursor-pointer"
          />
          <p className="small-medium lg:base-medium ml-1">{likes.length}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <div style={{ marginTop: "4px" }}>
          <img
            src={isSaved ? "/icons/saved.png" : "/icons/save.png"}
            alt="save"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={(e) => handleSavePost(e)}
          />
        </div>
      </div>
    </div>
  );
};

PostStats.propTypes = {
  post: PropTypes.shape({
    $id: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        $id: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

export default PostStats;
