import Cookies from "js-cookie";



export const add_new_order = async (formData: any) => {
    try {
        const res = await fetch(`/api/Admin/orders/add-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Error in Add New order (service) =>', error);
    }
  }
  

  export const get_pending_orders = async () => {
    try {
      const res = await fetch('/api/Admin/orders/getPendingOrders', {
        method: 'GET',
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log('Error in getting all orders (service) =>', error)
    }
  }
  
  export const get_completed_orders = async () => {
    try {
      const res = await fetch('/api/Admin/orders/getCompletedOrders', {
        method: 'GET',
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log('Error in getting all orders (service) =>', error)
    }
  }

  export const get_rejected_orders = async () => {
    try {
      const res = await fetch('/api/Admin/orders/getRejectedOrders', {
        method: 'GET',
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log('Error in getting all orders (service) =>', error)
    }
  }

  export const delete_order = async (id:string) => {
    try {
      const res = await fetch(`/api/Admin/orders/delete-order?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
      })
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.log('Error in deleting order (service) =>', error)
    }
  }


  export const update_order = async (formData : any) => {
    try {
      const res = await fetch(`/api/Admin/orders/updateOrderStatus`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.log('Error in updating order (service) =>', error)
    }
  }


//   export const get_product_by_id = async (id:string) => {
//     try {
//       const res = await fetch(`/api/common/orders/get-order-by-id?id=${id}`, {
//         method: 'GET',
//       })
  
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       console.log('Error in getting product by ID (service) =>', error)
//     }
//   }


  
//   export const get_product_by_category_id = async (id:string) => {
//     try {
//       const res = await fetch(`/api/common/product/get-product-by-category-id?id=${id}`, {
//         method: 'GET',
//       })
  
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       console.log('Error in getting product by category ID (service) =>', error)
//     }
//   }