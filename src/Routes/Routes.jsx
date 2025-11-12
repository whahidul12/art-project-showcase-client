import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home/Home";
import ExploreArtworks from "../Pages/ExploreArtworks/ExploreArtworks";
import AddArtwork from "../Pages/AddArtwork/AddArtwork";
import MyFavorites from "../Pages/MyFavorites/MyFavorites";
import MyGallery from "../Pages/MyGallery/MyGallery";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ArtworkDetails from "../Pages/ArtworkDetails/ArtworkDetails";
import PrivetRoutes from "./PrivetRoutes";

const Routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/explore-artworks",
        Component: ExploreArtworks,
      },
      {
        path: "/add-artwork",
        element: (
          <PrivetRoutes>
            <AddArtwork></AddArtwork>
          </PrivetRoutes>
        ),
      },
      {
        path: "/my-favorites",
        element: (
          <PrivetRoutes>
            <MyFavorites></MyFavorites>
          </PrivetRoutes>
        ),
      },
      {
        path: "/my-gallery",
        element: (
          <PrivetRoutes>
            <MyGallery></MyGallery>
          </PrivetRoutes>
        ),
      },
      {
        path: "/artwork/:id",
        element: (
          <PrivetRoutes>
            <ArtworkDetails></ArtworkDetails>
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
]);

export default Routes;
