import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
function List() {

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
    list && <>
      <div className='list add flex-col'>
        <p>All Foods list</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Category</b>
            <b>Name</b>
            <b>Price</b>
            <b>Active</b>
          </div>
          {list.map((item, index) => {
            return (
              <div key={index} className='list-table-format'>
                <img src={`http://localhost:4000/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p className='cursor' onClick={() => remove(item._id)}>X</p>
              </div>
            )
          })}
        </div>
      </div>
    </>

  )
}

export default List