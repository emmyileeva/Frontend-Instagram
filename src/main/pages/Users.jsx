import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queries";

const Users = () => {
  const { toast } = useToast();

  const { data: creators, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">All Users</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {creators?.documents.map((creator) => (
            <div key={creator?.$id}>
              <UserCard user={creator} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
