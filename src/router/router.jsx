import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllFacilities from "../pages/AllFacilities";
import FacilityDetails from "../pages/FacilityDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyBookings from "../pages/MyBookings";
import AddFacility from "../pages/AddFacility";
import ManageFacilities from "../pages/ManageFacilities";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../routes/PrivateRoute";
import UpdateFacility from "../pages/UpdateFacility";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "facilities", element: <AllFacilities /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      {
        path: "facility/:id",
        element: (
          <PrivateRoute>
            <FacilityDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "add-facility",
        element: (
          <PrivateRoute>
            <AddFacility />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-facilities",
        element: (
          <PrivateRoute>
            <ManageFacilities />
          </PrivateRoute>
        ),
      },
      {
        path: "update-facility/:id",
        element: (
          <PrivateRoute>
            <UpdateFacility />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
