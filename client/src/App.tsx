// src/App.tsx
import React, { ReactNode, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AdminPage } from "./component/AdminPage";
import UserPage from "./component/UserPage";
import LoginPage from "./component/Loginpage";
import RootLayout from "./layouts/RootLayout";
import AdminLayout from "./layouts/AdminLayout";
import CreateProduct from "./component/CreateProduct";
import EditProduct from "./component/EditProduct";
import { AuthProvider } from "./AuthContext"; // Ensure this path is correct
import ProtectedRoute from "./ProtectedRoute";
import AllProducts from "./component/AllProducts";
import Electronics from "./component/Electronics";
import FootWear from "./component/FootWear";
import Clothing from "./component/Clothing";
import useProgressBar from "./hooks/useProgressBar";
import "nprogress/nprogress.css";
interface ProgressBarHandlerProps {
  children: ReactNode;
}

const ProgressBarHandler: React.FC<ProgressBarHandlerProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Simulate a delay for loading
    const timer = setTimeout(handleComplete, 500); // Adjust timing as needed

    return () => {
      clearTimeout(timer);
      handleComplete();
    };
  }, [location]);

  useProgressBar(isLoading);

  return <>{children}</>;
};
const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ProgressBarHandler>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<UserPage />} />
              <Route path="all-products" element={<AllProducts />} />
              <Route path="electronics" element={<Electronics />}></Route>
              <Route path="footwear" element={<FootWear />}></Route>
              <Route path="clothing" element={<Clothing />}></Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/admin"
              element={<ProtectedRoute element={<AdminLayout />} />}
            >
              <Route index element={<AdminPage />} />
              <Route
                path="create-product"
                element={<ProtectedRoute element={<CreateProduct />} />}
              />
              <Route
                path="edit-product"
                element={<ProtectedRoute element={<EditProduct />} />}
              />
            </Route>
          </Routes>
        </ProgressBarHandler>
      </AuthProvider>
    </Router>
  );
};

export default App;
