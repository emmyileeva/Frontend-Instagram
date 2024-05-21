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
    <div className="flex justify-center bg-gray-100 min-h-screen m-0 p-0">
      <div className="container mx-auto py-8 md:pl-8 md:pr-8 lg:pr-16 lg:pl-64">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold mb-4">Home Feed</h2>
            {posts?.map((post, index) => (
              <div key={post.$id} className={index !== 0 ? "mt-8" : ""}>
                <PostCard post={post} bigSize={true} />
              </div>
            ))}
          </div>
          <div className="md:col-span-1 hidden md:block">
            <h3 className="text-2xl font-bold mb-4">Top Creators</h3>
            <div className="space-y-4">
              {creators?.map((creator) => (
                <div key={creator?.$id} className="mb-4">
                  <UserCard user={creator} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
