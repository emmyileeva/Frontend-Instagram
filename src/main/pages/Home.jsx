import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";

const Home = () => {
  const { data: postsData, isError: isErrorPosts } = useGetRecentPosts();
  const posts = postsData?.documents;
  console.log("Posts data in Home component:", posts);

  const { data: creatorsData, isError: isErrorCreators } = useGetUsers(10);
  const creators = creatorsData?.documents;
  console.log("Creators data in Home component:", creators);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1 justify-center items-center bg-gray-100">
        <p className="body-medium text-light-1">Something bad happened</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row md:flex-row justify-center bg-gray-100 min-h-screen overflow-hidden mt-14 md:mt-0">
      <div className="flex-1 h-full md:ml-64">
        <div className="p-4 md:p-8">
          <h2 className="text-2xl font-bold mb-4">Home Feed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post) => (
              <PostCard key={post.$id} post={post} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 h-full md:ml-64 p-4 md:p-8">
        <h3 className="text-xl font-bold mb-4">Top Creators</h3>
        <div className="overflow-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creators?.map((creator) => (
              <UserCard key={creator?.$id} user={creator} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
