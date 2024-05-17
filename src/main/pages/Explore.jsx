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
    <div className="flex flex-col items-center bg-gray-100 min-h-screen md:w-3/4 md:ml-96">
      <div className="max-w-5xl w-full">
        <div className="py-4">
          <h2 className="text-2xl font-semibold">Search Posts</h2>
          <div className="flex items-center bg-white rounded-lg mt-2">
            <img
              src="/icons/search.png"
              width={24}
              height={24}
              alt="search"
              className="mx-2"
            />
            <Input
              type="text"
              placeholder="Search"
              className="w-full focus:outline-none"
              value={searchValue}
              onChange={(e) => {
                const { value } = e.target;
                setSearchValue(value);
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Popular Today</h3>
          <div className="flex items-center gap-3 bg-gray-200 rounded-xl px-4 py-2 cursor-pointer">
            <p className="text-sm font-medium text-gray-500">All</p>
            <img src="/icons/filter.png" width={20} height={20} alt="filter" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shouldShowSearchResults ? (
            <SearchResults
              isSearchFetching={isSearchFetching}
              searchedPosts={searchedPosts}
            />
          ) : shouldShowPosts ? (
            <p className="text-light-4 text-center w-full">End of posts</p>
          ) : (
            posts.pages.map((item, index) => (
              <GridPostList key={`page-${index}`} posts={item.documents} />
            ))
          )}
        </div>

        {hasNextPage && !searchValue && (
          <div ref={ref} className="mt-10">
            <div>Loading more posts...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
