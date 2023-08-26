import "./App.css"

import React from "react"
import NavigationBar from "./components/NavigationBar"
import { Routes, Route, Navigate } from "react-router-dom"
import { ProductsProvider } from "./hooks/ProductsContext"

import Cart from "./pages/Cart"
import ProductDetails from "./pages/ProductDetails"
const LazyProducts = React.lazy(() => import("./pages/Products.jsx"))

function App() {
  return (
    <ProductsProvider>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/products/category/view-all" />}
        />
        <Route
          path="/products/category/:subCategory"
          element={
            <React.Suspense fallback="Loading Products...">
              <LazyProducts />
            </React.Suspense>
          }
        />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </ProductsProvider>
  )
}

export default App
