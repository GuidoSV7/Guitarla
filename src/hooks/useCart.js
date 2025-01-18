import { useEffect, useState, useMemo } from "react"
import { db } from "../data/db"

export const useCart = () => {

    
      const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
    
      //state
      const [data, setData] = useState([])
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
        setData(db)
      }, [])
      

      
    //State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]); 
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);
    

    return{
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal

    }

}

