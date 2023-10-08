import React from "react";

import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ShoppingCartProvider } from "./context/shoppingCartContext";

// Import Pages
// import HomePage from "./pages/home";
// import CollectionsPage from "./pages/collections";
// import ArchivePage from "./pages/archive";
// import CataloguePage from "./pages/catalogue";
// import CatalogueItemPage from "./pages/catalogueItem";
// import PageNotFound from "./pages/404";
// import CartPage from "./pages/cart";
// import CheckoutPage from "./pages/checkout";
// import CompletionPage from "./pages/completion";
// import SearchPage from "./pages/search";

const HomePage = React.lazy(() => import("./pages/home"));
const CollectionsPage = React.lazy(() => import("./pages/collections"));
const ArchivePage = React.lazy(() => import("./pages/archive"));
const CataloguePage = React.lazy(() => import("./pages/catalogue"));
const CatalogueItemPage = React.lazy(() => import("./pages/catalogueItem"));
const PageNotFound = React.lazy(() => import("./pages/404"));
const CartPage = React.lazy(() => import("./pages/cart"));
const CheckoutPage = React.lazy(() => import("./pages/checkout"));
const CompletionPage = React.lazy(() => import("./pages/completion"));
const SearchPage = React.lazy(() => import("./pages/search"));

const App = () => {
  const location = useLocation();

  return (
    <>
      <ShoppingCartProvider>
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/catalogue/item" element={<CatalogueItemPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/completion" element={<CompletionPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </AnimatePresence>
      </ShoppingCartProvider>
    </>
  );
};

export default App;
