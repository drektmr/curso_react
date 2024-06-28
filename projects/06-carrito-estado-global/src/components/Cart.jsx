import { useId } from "react";
import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from "./Icons";
import './Cart.css'
import { useCart } from "../hooks/useCart";
import { CartItem } from "./CartItem";

export function Cart () {
    const cartCheckboxId = useId()
    const { cart, addToCart, clearCart } = useCart()

    const handleShowCart = () => {
        const cart = document.querySelector(cartCheckboxId)
        cart.click()
    }

    return (
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon/>
            </label>
            <input type="checkbox" id={cartCheckboxId} hidden />

            <aside className="cart">
                <ul>
                    {cart.map( product => (
                        <CartItem
                            key={ product.id }
                            {...product}
                            addToCart={()=>addToCart(product)}
                        />
                    ))}
                </ul>
                <button onClick={clearCart}>
                    <ClearCartIcon/>
                </button>
            </aside>
        </>    
    )
}