import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";

const Home = () => {
  const { data: posts, isError: isErrorPosts } = useGetRecentPosts();
  const { data: creators, isError: isErrorCreators } = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          <ul className="flex flex-col flex-1 gap-9 w-full">
            {posts?.map((post) => (
              <li key={post.$id} className="w-full">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        <ul className="grid grid-cols-2 gap-6">
          {creators?.map((creator) => (
            <li key={creator?.$id}>
              <UserCard user={creator} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
