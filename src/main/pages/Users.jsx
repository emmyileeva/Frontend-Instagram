import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queries";

const AllUsers = () => {
  const { toast } = useToast();

  const { data: creators, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return null;
  }

  return (
    <div className="common-container px-4 md:px-0 md:ml-64 mt-4">
      <h2 className="h3-bold md:h2-bold text-center w-full py-4">All Users</h2>
      <div className="user-container grid grid-cols-2 md:grid-cols-4 gap-4">
        {creators?.documents.map((creator) => (
          <div key={creator?.$id} className="flex flex-col items-center">
            <UserCard user={creator} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
