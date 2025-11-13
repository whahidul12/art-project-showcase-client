import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
const Home = lazy(() => import("../Pages/Home/Home"));
const ExploreArtworks = lazy(
  () => import("../Pages/ExploreArtworks/ExploreArtworks"),
);
const AddArtwork = lazy(() => import("../Pages/AddArtwork/AddArtwork"));
const MyFavorites = lazy(() => import("../Pages/MyFavorites/MyFavorites"));
const MyGallery = lazy(() => import("../Pages/MyGallery/MyGallery"));
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
const ArtworkDetails = lazy(
  () => import("../Pages/ArtworkDetails/ArtworkDetails"),
);
import PrivetRoutes from "./PrivetRoutes";
import NotFound from "../Pages/NotFound/NotFound";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

const Routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
            <Home></Home>
          </Suspense>
        ),
      },
      {
        path: "/explore-artworks",
        element: (
          <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
            <ExploreArtworks></ExploreArtworks>
          </Suspense>
        ),
      },
      {
        path: "/add-artwork",
        element: (
          <PrivetRoutes>
            <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
              <AddArtwork></AddArtwork>
            </Suspense>
          </PrivetRoutes>
        ),
      },
      {
        path: "/my-favorites",
        element: (
          <PrivetRoutes>
            <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
              <MyFavorites></MyFavorites>
            </Suspense>
          </PrivetRoutes>
        ),
      },
      {
        path: "/my-gallery",
        element: (
          <PrivetRoutes>
            <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
              <MyGallery></MyGallery>
            </Suspense>
          </PrivetRoutes>
        ),
      },
      {
        path: "/artwork/:id",
        element: (
          <PrivetRoutes>
            <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
              <ArtworkDetails></ArtworkDetails>
            </Suspense>
          </PrivetRoutes>
        ),
      },
    ],
  },
  {
    path: "/auth/login",
    Component: Login,
  },
  {
    path: "/auth/register",
    Component: Register,
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);

export default Routes;
