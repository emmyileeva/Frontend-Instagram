import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queries";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import GridPostList from "@/components/shared/GridPostList";

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue, fetchNextPage]);

  if (!posts) return null;

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen md:ml-64">
      <div className="max-w-6xl w-full py-8">
        <h1 className="text-3xl font-bold mb-8">Explore</h1>
        <div className="w-full max-w-md mx-auto mb-8">
          <Input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 border border-gray-300 focus:outline-none focus:border-gray-500 rounded-md px-4 py-2"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">Trending</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shouldShowSearchResults ? (
            <SearchResults
              isSearchFetching={isSearchFetching}
              searchedPosts={searchedPosts}
            />
          ) : shouldShowPosts ? (
            <p className="text-gray-500 text-center w-full">No posts found</p>
          ) : (
            posts.pages.map((item, index) => (
              <GridPostList key={`page-${index}`} posts={item.documents} />
            ))
          )}
        </div>

        {hasNextPage && !searchValue && (
          <div ref={ref} className="mt-10">
            <p className="text-center text-gray-500">Loading more posts...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
