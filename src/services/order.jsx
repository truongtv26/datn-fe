import instance from "../core/api"

export const createOrder = async (order) => {
     try {
          const response = await instance.post(`/order`, order)
          return response
     } catch (err) {
          return err.response
     }
}

export const getOrderProduct = async (query) => {
     try {
          const response = await instance.get(`admin/order-product`, {
               params: {
                    query,
               }
          })
          return response;
     } catch (err) {
          return err.response
     }
}