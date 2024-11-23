
import { API } from "./api.js"

export const AllProducts = async() =>{

  try {
      const res = await fetch(`${API}/product/allproducts`,{
          method:'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      if(!res.ok){
        throw new Error(`Error: ${res.status}`)
      }
      const data = await res.json()
      return data
  } catch (error) {
      console.error("Error al traer productos", error)
      return {status:false}
  }
}


export const ProductsByCategory = async(name) =>{
    try {
        const res = await fetch(`${API}/product/ProductsByCategory`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name }) // Enviar cuerpo de la solicitud en formato JSON
        })
        const data = await res.json()
        if(data){
            return data
        }else{
            return{status: false} 
        }
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        return []; // Devuelve un arreglo vacío en caso de error
    }
}