import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import "../App.css"
import axios from "axios"
import { FaCartShopping } from "react-icons/fa6"

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
})

export default function Categories() {
  const [productsData, setProductsData] = useState("")

  useEffect(() => {
    axiosInstance
      .get("/products/categories")
      .then((response) => response.data)
      .then((data) => setProductsData(data))
      .catch((err) => console.error(err.response))
  }, [])

  const categories = productsData
  return (
    <div>
      <nav className="nav-bar">
        <h1>Fake Store</h1>
        <ul className="nav-list">
          {Array.isArray(categories)
            ? categories.map((category, index) => {
                return (
                  <NavLink
                    key={index}
                    className={"category"}
                    to={`/products/category/${category}`}
                  >
                    {category}
                  </NavLink>
                )
              })
            : null}
          <NavLink
            key={5}
            className={"category"}
            to="/products/category/view-all"
          >
            View All
          </NavLink>
        </ul>
        <div className="cart-container">
          <NavLink key={6} className={"cart"} to="/cart">
            Cart <FaCartShopping />
          </NavLink>
        </div>
      </nav>
    </div>
  )
}
