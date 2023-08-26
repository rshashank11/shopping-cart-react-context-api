import React, { useContext } from "react"
import { ProductsContext } from "../hooks/ProductsContext"
import { NavLink } from "react-router-dom"
import { FaTrash } from "react-icons/fa6"
import "../App.css"

function Cart() {
  const { cart, setCart, isEmpty, setIsEmpty } = useContext(ProductsContext)

  if (cart.length === 0) {
    setIsEmpty(true)
  } else {
    setIsEmpty(false)
  }

  function removeProduct(index) {
    setCart([...cart.slice(0, index), ...cart.slice(index + 1, cart.length)])
  }

  if (isEmpty) {
    return <h1 className="cart-empty">Cart Empty</h1>
  } else {
    return (
      <div>
        <ul className="products-list">
          {cart.map(({ id, title, image, price }, index) => {
            return (
              <li className="product-card" key={id}>
                <NavLink className={"nav-link"} key={id} to={`/products/${id}`}>
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
                  type="button"
                  className="trash-button"
                  onClick={() => removeProduct(index)}
                >
                  <FaTrash />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Cart
