import { useContext, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import useAxios from "../../Hooks/useAxios";

const AddArtwork = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let artistUserID = null;
  axiosInstance.get(`/users/${user?.email}`).then((response) => {
    console.log("create a user from google:", response.data);
    artistUserID = response.data._id;
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const artistName = user?.name;
    const artistEmail = user?.email;
    const artistPhoto = user?.photoURL;
    const likes = 0;
    const title = e.target.title.value;
    const imageUrl = e.target.imageUrl.value;
    const category = e.target.category.value;
    const medium = e.target.medium.value;
    const description = e.target.description.value;
    const dimensions = e.target.dimensions.value;
    const price = e.target.price.value;
    const visibility = e.target.visibility.value;

    const newArt = {
      artistName,
      artistUserID,
      artistEmail,
      artistPhoto,
      likes,
      title,
      imageUrl,
      category,
      medium,
      description,
      dimensions,
      price,
      visibility,
    };

    if (!imageUrl || !title || !category) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please fill in all required fields",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    setLoading(true);

    try {
      // This will be replaced with actual API call
      axiosInstance
        .post("/add-artwork", newArt)
        .then((response) =>
          console.log("create a user from google:", response.data),
        );

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Artwork added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/my-gallery");
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to add artwork. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="from-primary/5 via-base-100 to-secondary/5 min-h-screen bg-linear-to-br px-4 py-12">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="gradient-text mb-4 text-5xl font-bold">
            Add New Artwork
          </h1>
          <p className="text-base-content/70 text-xl">
            Share your masterpiece with the world
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-base-100 shadow-2xl"
        >
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Image URL *</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="url"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  // value={formData.imageUrl}
                  // onChange={handleChange}
                  required
                />
                {/* {imageUrl && (
                  <div className="mt-4">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="h-64 w-full rounded-lg object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )} */}
              </div>

              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Title *</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="title"
                  placeholder="Enter artwork title"
                  className="input input-bordered w-full"
                  // value={formData.title}
                  // onChange={handleChange}
                  required
                />
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Category *</span>
                </label>
                <motion.select
                  whileFocus={{ scale: 1.01 }}
                  name="category"
                  className="select select-bordered w-full"
                  // value={formData.category}
                  // onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </motion.select>
              </div>

              {/* Medium/Tools */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Medium/Tools</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="medium"
                  placeholder="e.g., Oil on canvas, Digital, Watercolor"
                  className="input input-bordered w-full"
                  // value={formData.medium}
                  // onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  name="description"
                  placeholder="Describe your artwork..."
                  className="textarea textarea-bordered h-32 w-full"
                  // value={formData.description}
                  // onChange={handleChange}
                />
              </div>

              {/* Dimensions and Price */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Dimensions</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="dimensions"
                    placeholder="e.g., 24x36 inches"
                    className="input input-bordered w-full"
                    // value={formData.dimensions}
                    // onChange={handleChange}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Price (USD)</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="number"
                    name="price"
                    placeholder="0.00"
                    className="input input-bordered w-full"
                    // value={formData.price}
                    // onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Visibility */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Visibility *</span>
                </label>
                <motion.select
                  whileFocus={{ scale: 1.01 }}
                  name="visibility"
                  className="select select-bordered w-full"
                  // value={formData.visibility}
                  // onChange={handleChange}
                  required
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </motion.select>
                <label className="label">
                  <span className="label-text-alt">
                    Private artworks will only be visible in your gallery
                  </span>
                </label>
              </div>

              {/* Artist Info (Read-only) */}
              <div className="divider">Artist Information</div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Artist Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={user?.name || ""}
                    readOnly
                    disabled
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Artist Email</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    value={user?.email || ""}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Adding Artwork..." : "Add Artwork"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddArtwork;
