import Post from "@/components/forms/Post";

const CreatePost = () => {
  return (
    <div className="flex flex-1 mt-20">
      <div className="common-container">
        <Post action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;
