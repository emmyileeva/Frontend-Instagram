import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";

const Home = () => {
  const { data: postsData, isError: isErrorPosts } = useGetRecentPosts();
  const posts = postsData?.documents;

  const { data: creatorsData, isError: isErrorCreators } = useGetUsers(10);
  const creators = creatorsData?.documents;

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1 justify-center items-center bg-gray-100">
        <p className="body-medium text-light-1">Something bad happened</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 md:pl-64">
        {" "}
        <h2 className="text-2xl font-bold mb-4">Home Feed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <PostCard key={post.$id} post={post} />
          ))}
        </div>
        <h3 className="text-2xl font-bold mt-8 mb-4">Top Creators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators?.map((creator) => (
            <UserCard key={creator?.$id} user={creator} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
