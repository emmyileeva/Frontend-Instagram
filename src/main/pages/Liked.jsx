import GridPostList from "@/components/shared/GridPostList";
import { useGetCurrentUser } from "@/lib/react-query/queries";

const Liked = () => {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <>
      {currentUser && currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      {currentUser && currentUser.liked.length > 0 && (
        <GridPostList posts={currentUser.liked} showStats={false} />
      )}
    </>
  );
};

export default Liked;
