import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queries";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "@/context/authcontext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ProfileUploader from "@/components/shared/ProfileUploader";
import { ProfileValidation } from "@/lib/validation";

const UpdateProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUserContext();
  const { data: currentUser } = useGetUserById(id || "");
  const { mutateAsync: updateUser } = useUpdateUser();
  const form = useForm({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  const handleUpdate = async (value) => {
    try {
      const updatedUser = await updateUser({
        userId: currentUser.$id,
        name: value.name,
        bio: value.bio,
        file: value.file,
        imageUrl: currentUser.imageUrl,
        imageId: currentUser.imageId,
      });

      setUser({
        ...user,
        name: updatedUser?.name,
        bio: updatedUser?.bio,
        imageUrl: updatedUser?.imageUrl,
      });
      navigate(`/profile/${id}`);
    } catch (error) {
      toast({
        title: `Update user failed. Please try again.`,
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <img src="/icons/edit.png" alt="edit" className="w-8 h-8 mr-2" />
          <h2 className="text-xl font-semibold">Edit Profile</h2>
        </div>

        <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-6">
          <ProfileUploader
            fieldChange={form.setValue}
            mediaUrl={currentUser.imageUrl}
          />

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Input
              id="name"
              type="text"
              {...form.register("name")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <Textarea
              id="bio"
              {...form.register("bio")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white"
            />
          </div>

          <div className="flex justify-end">
            <Button type="button" onClick={() => navigate(-1)} className="mr-2">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
