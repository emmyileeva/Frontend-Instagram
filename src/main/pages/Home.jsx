import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";

const Home = () => {
  const { data, isError: isErrorPosts } = useGetRecentPosts();
  const posts = data?.posts;
  const { data: creatorsData, isError: isErrorCreators } = useGetUsers(10);
  const creators = creatorsData?.users;

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-col md:flex-row justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Something bad happened</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-stretch h-screen overflow-auto md:ml-64">
      <div className="w-full md:w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4">Home Feed</h2>
        <div className="grid grid-cols-1 gap-6">
          {posts?.map((post) => (
            <PostCard key={post.$id} post={post} />
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/3 p-4 border-l md:border-l-0 border-gray-200">
        <h3 className="text-xl font-bold mb-4">Top Creators</h3>
        <div className="grid grid-cols-2 gap-6">
          {creators?.map((creator) => (
            <UserCard key={creator?.$id} user={creator} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
