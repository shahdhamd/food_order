import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
function Orders() {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get('http://localhost:4000/api/v1/food/');
    if (response.data.success) {
      setList(response.data.data);
      console.log(response.data.data)

      toast.success(response.data.message)
      console.log(response.data)
    } else {
      toast.error(response.data.message)
      console.log(response.data)
    }
  }

  const remove = async (id) => {
    console.log(id);
    const response = await axios.delete(`http://localhost:4000/api/v1/food/remove/${id}`);
    console.log(response)
    await fetchList();  /// روح اعمل رن للفنكشن كمان مرة

    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)

    }
  }
  useEffect(() => {
    fetchList()
    console.log(list)
  }, [])
  return (
    <div>
        
    </div>
  )
}

export default Orders