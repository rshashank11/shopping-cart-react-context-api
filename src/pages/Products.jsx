import React, { useContext, useEffect } from "react"
import "../App.css"
import { ProductsContext } from "../hooks/ProductsContext"
import { NavLink, useParams } from "react-router-dom"
import { FaCartShopping } from "react-icons/fa6"

function Products() {
  const { fetchData, productsData, setCart } = useContext(ProductsContext)
  let search = "products"
  let option = "category"
  let subOption = useParams().subCategory
  if (subOption === "view-all") {
    subOption = null
    option = null
  }
  useEffect(() => {
    fetchData(search, option, subOption)
  }, [subOption])

  function addToCart(id, title, price, image) {
    setCart((cart) => [...cart, { id, title, price, image }])
  }

  const products = productsData
  return (
    <div className="products-container">
      <ul className="products-list">
        {Array.isArray(products) ? (
          products.map(({ id, title, price, description, image }, index) => {
            return (
              <li className="product-card" key={index}>
                <NavLink
                  className={"nav-link"}
                  key={index}
                  to={`/products/${id}`}
                >
                  <div className="product">
                    <div className="container-img">
                      <img src={image} alt={title} />
                    </div>
                    <div className="container-info">
                      <h4>{title}</h4>
                      <h5>$ {price}</h5>
                    </div>
                  </div>
                </NavLink>
                <button
                  className="cart-button"
                  type="button"
                  onClick={() => addToCart(id, title, price, image)}
                >
                  <FaCartShopping />
                </button>
              </li>
            )
          })
        ) : (
          <li>No Data</li>
        )}
      </ul>
    </div>
  )
}

export default Products
