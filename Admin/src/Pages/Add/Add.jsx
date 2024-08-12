import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
function Add() {

  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    price: '',
    description: '',
    name: '',
    category: 'Salad'
  })

  const getFormData = (e) => {
    const myData = { ...data };
    myData[e.target.name] = e.target.value;
    setData(myData)
    console.log(data)
  }

  const getSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', Number(data.price));
    formData.append('image', image);

    const response = await axios.post('http://localhost:4000/api/v1/food/add', formData);
    if (response.data.success) {
      setData({
        price: '',
        description: '',
        name: '',
        category: 'Salad'
      })
      setImage(false)
      console.log(response.data.message)

      toast.success(response.data.message)
      // toast.success('add')
    } else {
      toast.error(response.data.message)
    }
  }


  //   useEffect(()=>{   ///ونفذ الكونولد دوت لوغ render اعمل  data لما تتغير قيمة ال 
  // console.log(data) 
  //   },[data])
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={getSubmit}>
        <div className="add-image flex-col">
          <p>upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
          <div className='add-product-name flex-col'>
            <p>product name </p>
            <input onChange={getFormData} type="text" name='name' placeholder='Type here' />
          </div>
          <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={getFormData} name="description" id="" rows="6" placeholder='Write content here' required></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select name="category" id="" onChange={getFormData}>
                <option value="Rolls">Rolls</option>
                <option value="Salad">Salad</option>
                <option value="Deserts">Deserts</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
                <option value="Cake">Cake</option>
                <option value="Sandwich">Sandwich</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product price</p>
              <input type="number" onChange={getFormData} name="price" id="" placeholder='$20' />
            </div>
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD </button>
      </form>
    </div>
  )
}

export default Add