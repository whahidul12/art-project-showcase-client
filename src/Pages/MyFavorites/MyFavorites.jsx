import { useState, useEffect, useContext } from "react";
import { motion } from "motion/react";
import ArtworkCard from "../../Components/ArtworkCard/ArtworkCard";
// import toast from 'react-hot-toast';
import Swal from "sweetalert2";
import { FaRegBookmark } from "react-icons/fa6";
import { AuthContext } from "../../Context/AuthProvider";
import useAxios from "../../Hooks/useAxios";

const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const response = await axiosInstance.get(
        `/users/${user.email}/favorites`,
      );
      setFavorites(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
        await axiosInstance.delete(
          `/users/${user.email}/favorites/${artworkId}`,
        );
        setFavorites(favorites.filter((artwork) => artwork._id !== artworkId));
      } catch (error) {
        console.error(error);
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
                  <div className="stat-title">Total Favorites</div>
                  <div className="stat-value text-secondary flex items-center justify-center gap-2">
                    {favorites.length}
                    <FaRegBookmark />
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
                  <ArtworkCard artwork={artwork} id={artwork._id} />

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
