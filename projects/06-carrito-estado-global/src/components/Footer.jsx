import './Footer.css';
import { useFilters } from '../hooks/useFilters';
import { useCart } from '../hooks/useCart';

export function Footer () {
    const { filters } = useFilters()
    const { cart } = useCart()
    return (
      <footer className="footer">
        {/* {
            JSON.stringify(filters, null, 2)
        } */}
        {
            JSON.stringify(cart, null, 2)
        }
        {/* <h4>Prueba técnica React</h4>
        <span>denis</span>
        <h5>Shopping Cart con useContext y useReducer</h5> */}
      </footer>
    )
}