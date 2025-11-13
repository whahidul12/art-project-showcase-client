import { motion } from "motion/react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="from-primary/20 via-base-100 to-secondary/20 flex min-h-screen items-center justify-center bg-linear-to-br">
      <div className="px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <h1 className="gradient-text text-[150px] leading-none font-bold md:text-[200px]">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Oops! Page Not Found
          </h2>
          <p className="text-base-content/70 mb-8 text-xl">
            The artwork you&apos;re looking for seems to have disappeared into
            the void
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-lg"
              >
                Go Home
              </motion.button>
            </Link>
            <Link to="/explore-artworks">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline btn-lg"
              >
                Explore Artworks
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <div className="animate-float text-8xl">🎨</div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
