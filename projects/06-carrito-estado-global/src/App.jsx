import { Products } from "./components/Products"
import { Header } from "./components/Header"
import { useFilters } from "./hooks/useFilters"
import { useProducts } from "./hooks/useProducts"
import { Footer } from "./components/Footer"
import { IS_DEVELOPMENT } from "./config"
import { Cart } from "./components/Cart"
import { CartProvider } from "./contexts/cart"


function App() {
  const { products } = useProducts()
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <Header/>
      <Cart />
      <main>
        <Products products={filteredProducts}/>
      </main>
      { IS_DEVELOPMENT && <Footer />}
    </CartProvider>
    
  )
}

export default App
