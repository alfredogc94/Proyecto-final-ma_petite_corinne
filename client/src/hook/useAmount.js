import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/ContextProvider';

export const useAmount = () => {
  const [amount, setAmount] = useState(0);
  const { addToCart, cartItems } = useContext(AppContext);
  const handleAmount =(type) =>{
    if(type == "add"){
      if(amount ==""){
      setAmount(1)  
      }else{
        setAmount(amount + 1)
      }
    }
    if(type == "less" && amount > 0){
      setAmount(amount - 1)

    }
  }
  // precio total
  const totalAmount = Array.isArray(cartItems) 
    ? cartItems.reduce((total, item) => {
        return total + (item.price * (item.amount || 1)); // Usa 1 como cantidad por defecto si no existe
      }, 0)
    : 0; // Retorna 0 si cartItems no es un array
  
  const handleChange = (e) =>{
    const regex = /^(0|[1-9][0-9]*)$/;
    const inputValue = e.target.value;
    if(regex.test(inputValue) || inputValue === ""){
      if(inputValue !== "" ){
      setAmount(Number(inputValue))
    }else{
      
      setAmount(inputValue)
    }
    }
  }
  return {
    handleChange, amount, handleAmount, setAmount, totalAmount
  }
}
