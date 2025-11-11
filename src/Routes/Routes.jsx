import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home/Home";
import ExploreArtworks from "../Pages/ExploreArtworks/ExploreArtworks";
import AddArtwork from "../Pages/AddArtwork/AddArtwork";
import MyFavorites from "../Pages/MyFavorites/MyFavorites";
import MyGallery from "../Pages/MyGallery/MyGallery";

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
    ],
  },
]);

export default Routes;
