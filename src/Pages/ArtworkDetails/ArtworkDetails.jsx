import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { AuthContext } from "../../Context/AuthProvider";
import useAxios from "../../Hooks/useAxios";
// import { useAuth } from "../contexts/AuthContext";
// import toast from "react-hot-toast";

const ArtworkDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { loading } = useContext(AuthContext);
  //   const { currentUser } = useAuth();
  const { user } = useContext(AuthContext);
  const [artwork, setArtwork] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // Fetch artwork details
    // This will be replaced with actual API call
    axiosInstance.get(`/artwork/${id}`).then((response) => {
      console.log("create a user from google:", response.data);
      setArtwork(response.data);
    });
  }, [id]);

  useEffect(() => {
    if (user && artwork) {
      // Compare string values of IDs
      const isFav = user.user_fav_list?.some(
        (favId) => favId.toString() === artwork._id.toString(),
      );
      setIsFavorited(isFav);
    }
    if (user && artwork) {
      const likedBy = artwork.likedBy || [];
      setIsLiked(likedBy.includes(user.email));
    }
  }, [user, artwork]);

  const handleLike = async () => {
    if (!user) return;

    try {
      const res = await axiosInstance.post(`/artwork/${artwork._id}/like`, {
        userEmail: user.email,
      });

      setArtwork({
        ...artwork,
        likes: res.data.likes,
        likedBy: res.data.likedBy,
      });

      setIsLiked(res.data.likedBy.includes(user.email));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToFavorites = async () => {
    if (!user) {
      // toast.error("Please login to add favorites");
      return;
    }

    try {
      if (!isFavorited) {
        // Add favorite
        await axiosInstance.post(`/users/${user.email}/favorites`, {
          artworkId: artwork._id,
        });
      } else {
        // Remove favorite
        await axiosInstance.delete(
          `/users/${user.email}/favorites/${artwork._id}`,
        );
      }

      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error(error);
      // toast.error("Failed to update favorites");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold">Artwork Not Found</h2>
          <Link to="/explore">
            <button className="btn btn-primary">Explore Artworks</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2"
        >
          {/* Artwork Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="sticky top-24">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full rounded-2xl shadow-2xl"
              />
              {artwork.category && (
                <div className="badge badge-primary badge-lg absolute top-4 right-4 shadow-lg">
                  {artwork.category}
                </div>
              )}
            </div>
          </motion.div>

          {/* Artwork Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h1 className="mb-4 text-5xl font-bold">{artwork.title}</h1>
              <p className="text-base-content/70 text-xl">
                by{" "}
                <span className="text-primary font-semibold">
                  {artwork.artistName}
                </span>
              </p>
            </div>

            {/* Artist Info Card */}
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">Artist Information</h3>
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
                      <img
                        src={
                          artwork.artistPhoto ||
                          "https://ui-avatars.com/api/?name=" +
                            artwork.artistName
                        }
                        alt={artwork.artistName}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{artwork.artistName}</p>
                    <p className="text-base-content/70 text-sm">
                      {artwork.totalArtworks} Total Artworks
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Artwork Info */}
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">Artwork Details</h3>

                {artwork.medium && (
                  <div className="border-base-300 flex justify-between border-b py-2">
                    <span className="font-medium">Medium:</span>
                    <span>{artwork.medium}</span>
                  </div>
                )}

                {artwork.dimensions && (
                  <div className="border-base-300 flex justify-between border-b py-2">
                    <span className="font-medium">Dimensions:</span>
                    <span>{artwork.dimensions}</span>
                  </div>
                )}

                {artwork.price && (
                  <div className="border-base-300 flex justify-between border-b py-2">
                    <span className="font-medium">Price:</span>
                    <span className="text-primary font-bold">
                      ${artwork.price}
                    </span>
                  </div>
                )}

                <div className="flex justify-between py-2">
                  <span className="font-medium">Posted:</span>
                  <span>
                    {new Date(artwork.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            {artwork.description && (
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title">Description</h3>
                  <p className="text-base-content/80 leading-relaxed">
                    {artwork.description}
                  </p>
                </div>
              </div>
            )}

            {/* Like and Favorite Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`btn flex-1 ${
                  isLiked ? "btn-error" : "btn-outline btn-error"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={isLiked ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{artwork.likes} Likes</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToFavorites}
                className={`btn flex-1 ${
                  isFavorited ? "btn-secondary" : "btn-outline btn-secondary"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={isFavorited ? "currentColor" : "none"}
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
                {isFavorited ? "Favorited" : "Add to Favorites"}
              </motion.button>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-2">
              <span className="self-center text-sm font-medium">Share:</span>
              <button className="btn btn-sm btn-circle btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button className="btn btn-sm btn-circle btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </button>
              <button className="btn btn-sm btn-circle btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
