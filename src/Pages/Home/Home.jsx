import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";
import ArtworkCard from "../../Components/ArtworkCard/ArtworkCard";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Context/AuthProvider";

const Home = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredArtworks, setFeaturedArtworks] = useState([]);

  // Banner slides data
  const slides = [
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=600&fit=crop",
      title: "Connect With Artists",
      description: "Build relationships and grow together",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=600&fit=crop",
      title: "Share Your Masterpieces",
      description: "Join our community of talented artists",
    },
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop",
      title: "Discover Amazing Artworks",
      description: "Explore a world of creativity and inspiration",
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Fetch featured artworks
  useEffect(() => {
    axiosInstance.get("/artwork").then((response) => {
      console.log("create a user from google:", response.data);
      setFeaturedArtworks(response.data);
    });
  }, [user]);

  return (
    <div className="bg-primary-light dark:bg-primary-dark">
      {/* Hero Banner/Slider */}
      <div className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`absolute inset-0 ${index === currentSlide ? "z-10" : "z-0"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="flex h-full w-full items-center justify-center bg-black/50">
                <div className="px-4 text-center text-white">
                  <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 text-5xl font-bold md:text-7xl"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8 text-xl md:text-2xl"
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Link to="/explore-artworks">
                      <button className="btn btn-primary btn-lg">
                        Explore Gallery
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 transform gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Featured Artworks Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-primary-dark dark:text-primary-light mb-4 text-4xl font-bold md:text-5xl">
            <Typewriter
              words={["Featured Artworks", "Recent Creations", "Trending Art"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={3000}
            />
          </h2>
          <p className="text-primary-dark dark:text-primary-light text-xl">
            Discover the latest masterpieces from our talented community
          </p>
        </motion.div>

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork._id}
                artwork={artwork}
                id={artwork._id}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/explore-artworks">
            <button className="btn btn-primary btn-wide">
              View All Artworks
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Top Artists Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-primary-dark dark:text-primary-light mb-4 text-4xl font-bold md:text-5xl">
              Top Artists of the Week
            </h2>
            <p className="text-primary-dark dark:text-primary-light text-xl">
              Meet the creative minds behind stunning artworks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((artist, index) => (
              <motion.div
                key={artist}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="card bg-base-100 shadow-xl transition-all hover:shadow-2xl"
              >
                <div className="card-body bg-card-light dark:bg-card-dark items-center text-center">
                  <div className="avatar mb-4">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                      <img
                        src={`https://i.pravatar.cc/150?img=${artist + 10}`}
                        alt={`Artist ${artist}`}
                      />
                    </div>
                  </div>
                  <h3 className="card-title">Artist Name {artist}</h3>
                  <p className="text-base-content/70">
                    {50 + artist * 10} Artworks
                  </p>
                  <div className="rating rating-sm">
                    {[...Array(5)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        name={`rating-${artist}`}
                        className="mask mask-star-2 bg-warning"
                        defaultChecked={i === 4}
                        readOnly
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Community Highlights */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Community Highlights
          </h2>
          <p className="text-base-content/70 text-xl">
            Join our vibrant community of artists and art enthusiasts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "🎨", count: "10,000+", label: "Artworks" },
            { icon: "👥", count: "5,000+", label: "Artists" },
            { icon: "❤️", count: "100K+", label: "Likes" },
            { icon: "🌟", count: "4.8/5", label: "Rating" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card from-primary/10 to-secondary/10 bg-gradient-to-br shadow-xl"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4 text-5xl">{stat.icon}</div>
                <h3 className="text-primary text-3xl font-bold">
                  {stat.count}
                </h3>
                <p className="text-lg">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
