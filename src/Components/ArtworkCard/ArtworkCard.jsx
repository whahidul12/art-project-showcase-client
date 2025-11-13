import { motion } from "motion/react";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";

const ArtworkCard = ({
  artwork,
  id,
  showActions = false,
  onDelete,
  onUpdate,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="card bg-card-light dark:bg-card-dark group overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl"
    >
      <figure className="relative h-64 overflow-hidden">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-sm font-medium">View Details</p>
          </div>
        </div>
        {artwork.category && (
          <div className="badge badge-primary absolute top-4 left-4 shadow-lg">
            {artwork.category}
          </div>
        )}
      </figure>

      <div className="card-body">
        <h2 className="card-title text-primary-dark dark:text-primary-light">
          {artwork.title}
          {artwork.visibility === "Private" && (
            <div
              className="badge badge-secondary badge-sm"
              data-tooltip-id="private-tooltip"
              data-tooltip-content="This artwork is private"
            >
              Private
            </div>
          )}
        </h2>

        <p className="text-primary-dark dark:text-primary-light text-sm">
          by{" "}
          <span className="text-primary font-semibold">
            {artwork.artistName}
          </span>
        </p>

        {artwork.likes !== undefined && (
          <div className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-error h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="text-primary-dark dark:text-primary-light font-medium">
              {artwork.likes || 0} likes
            </span>
          </div>
        )}

        <div className="card-actions mt-4 justify-end">
          {showActions ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onUpdate(artwork)}
                className="btn btn-sm btn-outline btn-primary"
              >
                Update
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(artwork._id)}
                className="btn btn-sm btn-outline btn-error"
              >
                Delete
              </motion.button>
            </>
          ) : (
            <Link to={`/artwork/${id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-sm btn-primary"
              >
                View Details
              </motion.button>
            </Link>
          )}
        </div>
      </div>

      <Tooltip id="private-tooltip" />
    </motion.div>
  );
};

export default ArtworkCard;
