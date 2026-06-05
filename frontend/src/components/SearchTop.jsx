const SearchTop = ({setSearchQuery}) => {
    return (
        <div className="search-top">
            <input
                placeholder="Search hostname or IP..."
                className="w-[300px] border rounded-md px-3 py-1 text-sm"
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchTop;