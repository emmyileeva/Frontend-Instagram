import GridPostList from "@/components/shared/GridPostList";
import { useGetCurrentUser } from "@/lib/react-query/queries";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savePosts = (currentUser?.save || [])
    .filter((savePost) => savePost.post !== null)
    .map((savePost) => ({
      ...savePost.post,
      $id: savePost.post.$id,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  return (
    <div className="saved-container flex flex-col items-center bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="flex items-center justify-center gap-2 w-full max-w-5xl mb-6">
        <img src="/icons/save.png" width={36} height={36} alt="save" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Saved Posts
        </h2>
      </div>

      <div className="w-full max-w-5xl">
        {savePosts?.length === 0 ? (
          <p className="text-center text-gray-500">No available posts</p>
        ) : (
          <GridPostList posts={savePosts} showStats={false} />
        )}
      </div>
    </div>
  );
};

export default Saved;
