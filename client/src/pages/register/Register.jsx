import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Checkbox } from "@/components/ui/checkbox"
import upload from '@/utils/upload';
import newRequest from '@/utils/newRequest';

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register flex items-center justify-center">
    <form className='w-[960px] py-[50px] flex gap-[120px]' onSubmit={handleSubmit}>
      <div className="left flex-1 flex flex-col gap-[10px] justify-between">
        <h1 className='text-gray-600 mb-[24px] text-2xl font-medium'>Create a new account</h1>
        <label className=' text-gray-600 text-lg'>Username</label>
        <Input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={handleChange}
        />
        <label className='text-gray-600 text-lg'>Email</label>
        <Input
          name="email"
          type="email"
          placeholder="email"
          onChange={handleChange}
        />
        <label htmlFor="" className='text-gray-600 text-lg'>Password</label>
        <Input name="password" type="password" onChange={handleChange} />
        <label htmlFor="" className='text-gray-600 text-lg'>Profile Picture</label>
        <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <label htmlFor="" className='text-gray-600 text-lg'>Country</label>
        <Input
          name="country"
          type="text"
          placeholder="Algeria"
          onChange={handleChange}
        />
        <Button type="submit">Register</Button>
      </div>
      <div className="right flex-1 flex flex-col gap-[10px] justify-between">
        <h1 className='text-gray-600 mb-[24px] text-2xl font-medium'>I want to become a seller</h1>
        <div className="toggle flex items-center gap-[10px]">
          <label className='text-gray-600 text-lg'>Activate the seller account</label>
          <label className='switch text-gray-600 text-lg relative inline-block w-[50px] h-[24px]' >
            {/* <Checkbox   type="checkbox" onChange={handleSeller} /> */}
            <input type="checkbox" className='border-primary border rounded-sm shrink-0 w-4 h-4 button ring-offset-background ' onChange={handleSeller} />
            <span className="slider round"></span>
          </label>
        </div>
        <label className='text-gray-600 text-lg' htmlFor="">Phone Number</label>
        <Input
          name="phone"
          type="text"
          placeholder="+213 655 678 632"
          onChange={handleChange}
        />
        <label className='text-gray-600 text-lg' htmlFor="">Description</label>
        <Textarea
          placeholder="A short description of yourself"
          name="desc"
          id=""
          cols="30"
          rows="10"
          onChange={handleChange}
        ></Textarea>
      </div>
    </form>
  </div>  )
}

export default Register