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
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="flex flex-col h-screen justify-start items-center pt-16 md:pt-8">
        <div className="flex items-center">
          <h2 className="text-2xl md:text-3xl font-bold ml-4 text-gray-800">
            All Users
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl md:max-w-4xl p-4 md:p-8 mx-auto">
          {creators?.documents.map((creator) => (
            <div key={creator?.$id} className="flex flex-col items-center">
              <UserCard user={creator} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
