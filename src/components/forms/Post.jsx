import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostValidation } from "@/lib/validation/index";
import { useUserContext } from "@/context/authcontext";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";
import PropTypes from "prop-types";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormField, FormItem } from "../ui/form";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";

const Post = ({ post, action, headerText, iconSrc }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();

  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  Post.propTypes = {
    post: PropTypes.object,
    action: PropTypes.oneOf(["Create", "Update"]).isRequired,
    headerText: PropTypes.string.isRequired,
    iconSrc: PropTypes.string.isRequired,
  };

  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: updatePost } = useUpdatePost();

  const handleSubmit = async (value) => {
    try {
      if (post && action === "Update") {
        const updatedPost = await updatePost({
          ...value,
          postId: post.$id,
          imageId: post.imageId,
          imageUrl: post.imageUrl,
        });

        if (!updatedPost) {
          toast({
            title: `${action} post failed. Please try again.`,
          });
        } else {
          navigate(`/posts/${post.$id}`);
          return;
        }
      } else {
        const newPost = await createPost({
          ...value,
          userId: user.id,
        });

        if (!newPost) {
          toast({
            title: `${action} post failed. Please try again.`,
          });
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="flex flex-col h-screen justify-start items-center pt-16 md:pt-8">
        <div className="flex items-center">
          <img src={iconSrc} width={36} height={36} alt={headerText} />
          <h2 className="text-2xl md:text-3xl font-bold ml-4 text-gray-800">
            {headerText}
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(form.getValues());
            }}
            className="flex flex-col gap-6 w-full max-w-2xl md:max-w-4xl p-4 md:p-8 mx-auto"
          >
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <Textarea
                    className="border rounded-md p-2 w-full"
                    placeholder="Write a caption..."
                    rows={4}
                    {...field}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FileUploader
                    fieldChange={(files) => {
                      field.onChange(files);
                    }}
                    mediaUrl={post?.imageUrl}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <Input
                    className="border rounded-md p-2 w-full"
                    placeholder="Location"
                    {...field}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <Input
                    className="border rounded-md p-2 w-full"
                    placeholder="Add tags (separated by commas)"
                    {...field}
                  />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white mr-4"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                {`${action} Post`}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Post;
