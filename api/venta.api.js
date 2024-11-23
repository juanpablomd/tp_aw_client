import { API } from "./api.js";

export const saleProduct =  async(userId, date, total, email, products, token) =>{
    try {
       
        const res = await fetch(`${API}/sale/newSales/`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId,date,total,email,products, token}) // Enviar cuerpo de la solicitud en formato JSON
        })
        
        const data = await res.json()
        return data
} catch (error) {
    console.log(error)
    return {status:false}
}
}