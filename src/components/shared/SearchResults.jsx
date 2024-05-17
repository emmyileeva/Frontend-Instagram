import PropTypes from "prop-types";
import GridPostList from "./GridPostList";

const SearchResults = ({ isSearchFetching, searchedPosts }) => {
  if (isSearchFetching) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-gray-500 mt-10 text-center w-full">No results found</p>
    );
  }
};

SearchResults.propTypes = {
  isSearchFetching: PropTypes.bool.isRequired,
  searchedPosts: PropTypes.shape({
    documents: PropTypes.arrayOf(
      PropTypes.shape({
        $id: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        caption: PropTypes.string,
        creator: PropTypes.shape({
          imageUrl: PropTypes.string,
          name: PropTypes.string,
        }),
      })
    ),
  }),
};

SearchResults.defaultProps = {
  searchedPosts: null,
};

export default SearchResults;
