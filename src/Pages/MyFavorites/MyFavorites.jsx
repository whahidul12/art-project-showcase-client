import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ArtworkCard from "../../Components/ArtworkCard/ArtworkCard";
// import toast from 'react-hot-toast';
import Swal from "sweetalert2";

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    // This will be replaced with actual API call
    setTimeout(() => {
      const mockFavorites = [
        {
          _id: "1",
          imageUrl:
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop",
          title: "Abstract Dreams",
          artistName: "Sarah Johnson",
          category: "Abstract",
          likes: 245,
        },
        {
          _id: "2",
          imageUrl:
            "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=500&h=500&fit=crop",
          title: "Mountain Serenity",
          artistName: "Michael Chen",
          category: "Landscape",
          likes: 189,
        },
        {
          _id: "3",
          imageUrl:
            "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500&h=500&fit=crop",
          title: "Urban Poetry",
          artistName: "Emma Davis",
          category: "Street Art",
          likes: 312,
        },
        {
          _id: "4",
          imageUrl:
            "https://images.unsplash.com/photo-1582561833449-3a9dd1a4a5ec?w=500&h=500&fit=crop",
          title: "Digital Harmony",
          artistName: "James Wilson",
          category: "Digital Art",
          likes: 428,
        },
      ];
      setFavorites(mockFavorites);
      setLoading(false);
    }, 1000);
  };

  const handleRemoveFavorite = async (artworkId) => {
    const result = await Swal.fire({
      title: "Remove from favorites?",
      text: "This artwork will be removed from your favorites",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      try {
        // This will be replaced with actual API call
        console.log("Removing favorite:", artworkId);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        setFavorites(favorites.filter((artwork) => artwork._id !== artworkId));

        // toast.success('Removed from favorites!');
      } catch (error) {
        console.error(error);
        // toast.error('Failed to remove favorite');
      }
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="gradient-text mb-4 text-5xl font-bold">
            My Favorites
          </h1>
          <p className="text-base-content/70 text-xl">
            Your curated collection of inspiring artworks
          </p>
        </motion.div>

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : favorites.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 text-center"
            >
              <div className="stats shadow-lg">
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </div>
                  <div className="stat-title">Total Favorites</div>
                  <div className="stat-value text-secondary">
                    {favorites.length}
                  </div>
                  <div className="stat-desc">Keep discovering amazing art!</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {favorites.map((artwork, index) => (
                <motion.div
                  key={artwork._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <ArtworkCard artwork={artwork} />

                  {/* Remove Button Overlay */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveFavorite(artwork._id)}
                    className="btn btn-sm btn-circle btn-error absolute top-4 right-4 z-10 shadow-lg"
                    title="Remove from favorites"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <div className="mb-4 text-6xl">❤️</div>
            <h3 className="mb-2 text-2xl font-bold">No Favorites Yet</h3>
            <p className="text-base-content/70 mb-6">
              Start exploring artworks and add your favorites
            </p>
            <a href="/explore">
              <button className="btn btn-primary">Explore Artworks</button>
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
