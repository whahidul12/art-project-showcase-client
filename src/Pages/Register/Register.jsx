import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { AuthContext } from "../../Context/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import useAxios from "../../Hooks/useAxios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const axiosInstance = useAxios();
  const [errorMsg, setErrorMsg] = useState("");
  const { createUser, setUser, updateUser, SingUpWithGoogleFromProvider } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const validatePassword = (password) => {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const isLongEnough = password.length >= 6;

      if (!hasUpperCase) {
        toast.error(
          <div>Password must contain at least one uppercase letter</div>,
        );
        return "Password must contain at least one uppercase letter";
      }
      if (!hasLowerCase) {
        toast.error(
          <div>Password must contain at least one lowercase letter</div>,
        );
        return "Password must contain at least one lowercase letter";
      }
      if (!isLongEnough) {
        toast.error(<div>Password must be at least 6 characters long</div>);
        return "Password must be at least 6 characters long";
      }
      return null;
    };
    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMsg(passwordError);
      return;
    }

    // console.log(createUser);
    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        updateUser({ displayName: name, photoURL: photoUrl })
          .then(() => {
            // Profile updated!
            // ...
            setUser({ ...user, displayName: name, photoURL: photoUrl });
          })
          .catch((error) => {
            // An error occurred
            // ...
            console.log(error);
            setUser(user);
          });

        // Signed up
        const newUser = {
          name: name,
          email: user.email,
          photoURL: photoUrl,
          firebaseUID: user.uid,
        };

        //create user into database
        axiosInstance
          .post("/users", newUser)
          .then((response) =>
            console.log("create a user from google:", response.data),
          );

        e.target.reset();
        navigate(location.state ? location.state : "/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        console.error("error Code:", errorCode);
        // console.error("error Message:", errorMessage);
        // ..
      });
  };

  const signUpWithGoogle = (e) => {
    e.preventDefault();
    SingUpWithGoogleFromProvider()
      .then((result) => {
        const user = result.user;
        setUser(user);
        const newUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          firebaseUID: user.uid,
        };

        //create user into database
        axiosInstance
          .post("/users", newUser)
          .then((data) =>
            console.log(`create a user from google: ${data.data}`),
          );
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(">>>", error);
      });
  };

  return (
    <div className="from-secondary/10 via-base-100 to-accent/10 flex min-h-screen items-center justify-center bg-linear-to-br px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card bg-base-100 w-full max-w-md shadow-2xl"
      >
        <div className="card-body">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="gradient-text mb-6 text-center text-3xl font-bold"
          >
            Create Account
          </motion.h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name *</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email *</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Photo URL</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="url"
                name="photoURL"
                placeholder="Enter photo URL (optional)"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password *</span>
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full pr-10"
                  required
                />
                {errorMsg ? (
                  <p className="font-semibold text-red-500">{errorMsg}</p>
                ) : (
                  ""
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 z-1 -translate-y-1/2 transform hover:cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <label className="label">
                <span className="label-text-alt text-xs">
                  Must contain uppercase, lowercase & min 6 characters
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Confirm Password *
                </span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                className="input input-bordered w-full"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`btn btn-primary w-full`}
            >
              Register
            </motion.button>
          </form>

          <div className="divider">OR</div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={signUpWithGoogle}
            className="btn btn-outline w-full"
            // disabled={loading}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </motion.button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-primary font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Register;
