import { useState, useEffect, useContext } from "react";
import { motion } from "motion/react";
import ArtworkCard from "../../Components/ArtworkCard/ArtworkCard";
import { AuthContext } from "../../Context/AuthProvider";
import useAxios from "../../Hooks/useAxios";

const ExploreArtworks = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Abstract",
    "Landscape",
    "Portrait",
    "Digital Art",
    "Street Art",
    "Nature",
    "Photography",
    "Mixed Media",
    "Sculpture",
  ];

  // Fetch artworks
  useEffect(() => {
    axiosInstance.get("/artwork").then((response) => {
      // console.log("create a user from google:", response.data);
      setArtworks(response.data);
      setFilteredArtworks(response.data);
    });
  }, [user]);

  useEffect(() => {
    if (!artworks.length) return;

    let filtered = artworks;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (artwork) =>
          artwork.category?.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artwork.artistName?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredArtworks(filtered);
  }, [artworks, searchQuery, selectedCategory]);

  return (
    <div className="from-primary/10 to-secondary/10 min-h-screen bg-linear-to-br px-4 py-12">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="gradient-text text-primary-dark dark:text-primary-light mb-4 text-5xl font-bold">
            Explore Artworks
          </h1>
          <p className="text-primary-dark dark:text-primary-light text-xl">
            Discover amazing artworks from talented artists around the world
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="form-control mx-auto max-w-md">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search by title or artist..."
                className="input input-bordered bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light w-full outline-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`btn ${
                  selectedCategory === category
                    ? "bg-blue"
                    : "bg-card-light dark:bg-card-dark text-primary-dark dark:text-primary-light"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 text-center"
        >
          <p className="text-primary-dark dark:text-primary-light">
            Found {filteredArtworks.length} artwork
            {filteredArtworks.length !== 1 ? "s" : ""}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </motion.div>

        {/* Artworks Grid */}
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : filteredArtworks.length > 0 ? (
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredArtworks.map((artwork) => (
              <motion.div
                key={artwork._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                layout={false} // 🔥 prevents layout animation bugs
              >
                <ArtworkCard artwork={artwork} id={artwork._id} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <div className="mb-4 text-6xl">🎨</div>
            <h3 className="mb-2 text-2xl font-bold">No Artworks Found</h3>
            <p className="text-base-content/70">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExploreArtworks;
