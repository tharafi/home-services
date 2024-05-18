import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import newRequest from "@/utils/newRequest";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await newRequest.post('auth/login', {username, password});
      localStorage.setItem('currentUser', JSON.stringify(res.data))
      navigate('/')
    } catch(err) {
      setError(err.response.data);
      console.log(err.response.data)
    }
  }
  return (
    <div className="login flex justify-center pb-[80px]">
      <form onSubmit={handleSubmit} className="container mx-auto px-auto w-[500px]">
        <h1 className="text-gray-600 text-[24px] font-[300] my-[30px]">
          Sign in
        </h1>
        <div className="section flex flex-1 flex-col justify-between gap-3">
          <label className='text-gray-600 text-[18px]'>Username</label>
          <Input name="username" type="text" placeholder="johndoe" onChange={(e) => {setUsername(e.target.value)}} />

          <label className='text-gray-600 text-[18px]'>Password</label>
          <Input
            name="password"
            type="password"
            onChange={(e) => {setPassword(e.target.value)}}
          />

          <Button type="submit">Login</Button>
          {error && error}
        </div>
      </form>
    </div>
  );
}

export default Login;
