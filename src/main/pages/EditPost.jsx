import { useParams } from "react-router-dom";
import Post from "@/components/forms/Post";
import { useGetPostById } from "@/lib/react-query/queries";

const EditPost = () => {
  const { id } = useParams();
  const { data: post } = useGetPostById(id);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen md:ml-64">
      <div className="common-container max-w-5xl w-full p-4">
        {post && (
          <Post
            action="Update"
            post={post}
            headerText="Edit Post"
            iconSrc="/icons/edit.png"
          />
        )}
      </div>
    </div>
  );
};

export default EditPost;
