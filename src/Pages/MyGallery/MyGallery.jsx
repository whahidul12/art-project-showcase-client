import { useState, useEffect, useContext } from "react";
import { motion } from "motion/react";
// import { useAuth } from "../contexts/AuthContext";
import ArtworkCard from "../../Components/ArtworkCard/ArtworkCard";
// import toast from 'react-hot-toast';
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";

const MyGallery = () => {
  const { user } = useContext(AuthContext);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const categories = [
    "Abstract",
    "Landscape",
    "Portrait",
    "Digital Art",
    "Street Art",
    "Nature",
    "Photography",
    "Sculpture",
    "Mixed Media",
  ];

  useEffect(() => {
    fetchMyArtworks();
  }, []);

  const fetchMyArtworks = async () => {
    // This will be replaced with actual API call
    // Fetch artworks for current user
    setTimeout(() => {
      const mockArtworks = [
        {
          _id: "1",
          imageUrl:
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop",
          title: "My Abstract Dreams",
          artistName: user.displayName,
          category: "Abstract",
          likes: 245,
          visibility: "Public",
          medium: "Acrylic on canvas",
          description: "A personal exploration of abstract forms",
          dimensions: "24x36 inches",
          price: "599.99",
        },
        {
          _id: "2",
          imageUrl:
            "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=500&h=500&fit=crop",
          title: "Mountain Peace",
          artistName: user.displayName,
          category: "Landscape",
          likes: 189,
          visibility: "Private",
          medium: "Oil on canvas",
          description: "A serene mountain landscape",
          dimensions: "30x40 inches",
          price: "799.99",
        },
      ];
      setArtworks(mockArtworks);
      setLoading(false);
    }, 1000);
  };

  const handleDelete = async (artworkId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // This will be replaced with actual API call
        console.log("Deleting artwork:", artworkId);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        setArtworks(artworks.filter((artwork) => artwork._id !== artworkId));

        Swal.fire("Deleted!", "Your artwork has been deleted.", "success");
      } catch (error) {
        console.error(error);
        // toast.error('Failed to delete artwork');
      }
    }
  };

  const handleUpdate = (artwork) => {
    setSelectedArtwork(artwork);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      // This will be replaced with actual API call
      console.log("Updating artwork:", selectedArtwork);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setArtworks(
        artworks.map((artwork) =>
          artwork._id === selectedArtwork._id ? selectedArtwork : artwork,
        ),
      );

      setShowUpdateModal(false);
      // toast.success('Artwork updated successfully!');
    } catch (error) {
      console.error(error);
      // toast.error('Failed to update artwork');
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
          <h1 className="gradient-text mb-4 text-5xl font-bold">My Gallery</h1>
          <p className="text-base-content/70 text-xl">
            Manage your artworks collection
          </p>
        </motion.div>

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : artworks.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ArtworkCard
                  artwork={artwork}
                  showActions={true}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
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
            <h3 className="mb-2 text-2xl font-bold">No Artworks Yet</h3>
            <p className="text-base-content/70 mb-6">
              Start adding artworks to build your gallery
            </p>
            <a href="/add-artwork">
              <button className="btn btn-primary">
                Add Your First Artwork
              </button>
            </a>
          </motion.div>
        )}
      </div>

      {/* Update Modal */}
      {showUpdateModal && selectedArtwork && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="mb-6 text-2xl font-bold">Update Artwork</h3>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Image URL</span>
                </label>
                <input
                  type="url"
                  className="input input-bordered"
                  value={selectedArtwork.imageUrl}
                  onChange={(e) =>
                    setSelectedArtwork({
                      ...selectedArtwork,
                      imageUrl: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={selectedArtwork.title}
                  onChange={(e) =>
                    setSelectedArtwork({
                      ...selectedArtwork,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Category</span>
                </label>
                <select
                  className="select select-bordered"
                  value={selectedArtwork.category}
                  onChange={(e) =>
                    setSelectedArtwork({
                      ...selectedArtwork,
                      category: e.target.value,
                    })
                  }
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Medium/Tools</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={selectedArtwork.medium}
                  onChange={(e) =>
                    setSelectedArtwork({
                      ...selectedArtwork,
                      medium: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  value={selectedArtwork.description}
                  onChange={(e) =>
                    setSelectedArtwork({
                      ...selectedArtwork,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Dimensions</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={selectedArtwork.dimensions}
                    onChange={(e) =>
                      setSelectedArtwork({
                        ...selectedArtwork,
                        dimensions: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Price</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={selectedArtwork.price}
                    onChange={(e) =>
                      setSelectedArtwork({
                        ...selectedArtwork,
                        price: e.target.value,
                      })
                    }
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Visibility</span>
                </label>
                <select
                  className="select select-bordered"
                  value={selectedArtwork.visibility}
                  onChange={(e) =>
                    setSelectedArtwork({
                      ...selectedArtwork,
                      visibility: e.target.value,
                    })
                  }
                  required
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Artwork
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGallery;
