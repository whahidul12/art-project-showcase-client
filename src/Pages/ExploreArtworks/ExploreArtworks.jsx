import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ArtworkCard from "../../Components/ArtworkCard/ArtworkCard";

const ExploreArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
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
  ];

  // Fetch artworks
  useEffect(() => {
    // This will be replaced with actual API call
    // For now, using mock data
    setTimeout(() => {
      const mockArtworks = [
        {
          _id: "1",
          imageUrl:
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop",
          title: "Abstract Dreams",
          artistName: "Sarah Johnson",
          category: "Abstract",
          likes: 245,
          visibility: "Public",
        },
        {
          _id: "2",
          imageUrl:
            "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=500&h=500&fit=crop",
          title: "Mountain Serenity",
          artistName: "Michael Chen",
          category: "Landscape",
          likes: 189,
          visibility: "Public",
        },
        {
          _id: "3",
          imageUrl:
            "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500&h=500&fit=crop",
          title: "Urban Poetry",
          artistName: "Emma Davis",
          category: "Street Art",
          likes: 312,
          visibility: "Public",
        },
        {
          _id: "4",
          imageUrl:
            "https://images.unsplash.com/photo-1582561833449-3a9dd1a4a5ec?w=500&h=500&fit=crop",
          title: "Digital Harmony",
          artistName: "James Wilson",
          category: "Digital Art",
          likes: 428,
          visibility: "Public",
        },
        {
          _id: "5",
          imageUrl:
            "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500&h=500&fit=crop",
          title: "Nature's Canvas",
          artistName: "Lisa Anderson",
          category: "Nature",
          likes: 276,
          visibility: "Public",
        },
        {
          _id: "6",
          imageUrl:
            "https://images.unsplash.com/photo-1549887534-1541e9326642?w=500&h=500&fit=crop",
          title: "Portrait of Light",
          artistName: "David Martinez",
          category: "Portrait",
          likes: 198,
          visibility: "Public",
        },
        {
          _id: "7",
          imageUrl:
            "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=500&h=500&fit=crop",
          title: "Cosmic Journey",
          artistName: "Sophie Turner",
          category: "Abstract",
          likes: 356,
          visibility: "Public",
        },
        {
          _id: "8",
          imageUrl:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
          title: "Ocean Waves",
          artistName: "Ryan Cooper",
          category: "Landscape",
          likes: 421,
          visibility: "Public",
        },
        {
          _id: "9",
          imageUrl:
            "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=500&h=500&fit=crop",
          title: "City Lights",
          artistName: "Alex Morgan",
          category: "Street Art",
          likes: 287,
          visibility: "Public",
        },
      ];
      setArtworks(mockArtworks);
      setFilteredArtworks(mockArtworks);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter artworks based on search and category
  useEffect(() => {
    let filtered = artworks;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (artwork) => artwork.category === selectedCategory,
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artwork.artistName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredArtworks(filtered);
  }, [searchQuery, selectedCategory, artworks]);

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="gradient-text mb-4 text-5xl font-bold">
            Explore Artworks
          </h1>
          <p className="text-base-content/70 text-xl">
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
                className="input input-bordered w-full"
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
                className={`btn btn-sm ${
                  selectedCategory === category ? "btn-primary" : "btn-outline"
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
          <p className="text-base-content/70">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ArtworkCard artwork={artwork} />
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
