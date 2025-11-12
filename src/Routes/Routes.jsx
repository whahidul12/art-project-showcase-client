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
        Component: AddArtwork,
      },
      {
        path: "/my-favorites",
        Component: MyFavorites,
      },
      {
        path: "/my-gallery",
        Component: MyGallery,
      },
      {
        path: "/artwork/:id",
        Component: ArtworkDetails,
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
