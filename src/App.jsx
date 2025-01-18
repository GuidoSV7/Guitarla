import { useEffect, useState } from "react"

import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"




function App() {
 
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  //state
  const [guitars, setGuitars] = useState([])
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    
  }, [cart])

  function addToCart(item){
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExist >= 0 ){
      if(cart[itemExist].quantity >= 5) return
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)

    }else{
      item.quantity = 1
      setCart([...cart, item])
    }

    
    
  }

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))


    
  }

  function increaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < 5){
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity > 1){
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart(){
    setCart([])
  }


  useEffect(() => {
    setGuitars(db)
  }, [])


  return (
    <>

    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}

     />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
        {guitars.map((guitar) => (
          <Guitar
            key={guitar.id}
            guitar={guitar}
            addToCart={addToCart}
            
           />
        ))}
          
       
        </div>
    </main>

    <Footer />

    </>
  )
}

export default App
