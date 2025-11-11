import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";
import ArtworkCard from "../../Components/ArtworkCard/ArtworkCard";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

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
        {
          _id: "5",
          imageUrl:
            "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500&h=500&fit=crop",
          title: "Nature's Canvas",
          artistName: "Lisa Anderson",
          category: "Nature",
          likes: 276,
        },
        {
          _id: "6",
          imageUrl:
            "https://images.unsplash.com/photo-1549887534-1541e9326642?w=500&h=500&fit=crop",
          title: "Portrait of Light",
          artistName: "David Martinez",
          category: "Portrait",
          likes: 198,
        },
      ];
      setFeaturedArtworks(mockArtworks);
      setLoading(false);
    }, 1000);
  }, []);

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
                    <Link to="/explore">
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
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/explore">
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
    </div>
  );
};

export default Home;
