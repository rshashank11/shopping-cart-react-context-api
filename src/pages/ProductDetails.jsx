import React, { useContext, useEffect } from "react"
import { ProductsContext } from "../hooks/ProductsContext"
import { useParams } from "react-router-dom"
import { FaCartShopping } from "react-icons/fa6"
import "../App.css"

const ProductDetails = () => {
  const { fetchData, productsData, setCart } = useContext(ProductsContext)
  let search = "products"
  let option = useParams().id
  let subOption = null
  useEffect(() => {
    fetchData(search, option, subOption)
  }, [option])

  const { id, title, price, description, image } = productsData

  function addToCart(id, title, price, image) {
    setCart((cart) => [...cart, { id, title, price, image }])
  }
  return (
    <div>
      <ul className="details">
        <li className="detail-card" key={id}>
          <div className="detail-container">
            <div className="detail-img">
              <img src={image} alt={title} />
            </div>
            <div className="detail-info">
              <h4>{title}</h4>
              <h5>$ {price}</h5>
              <p>{description}</p>
              <button
                className="cart-button"
                type="button"
                onClick={() => addToCart(id, title, price, image)}
              >
                <FaCartShopping />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default ProductDetails
