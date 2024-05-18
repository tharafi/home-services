// import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "@/utils/newRequest";

function Header() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const handleLogout = async () => {
    try {
      await newRequest.post('/auth/logout');
      localStorage.setItem('currentUser', null);
      navigate('/')
    }catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="border-b-2">
      <div className="container mx-auto px-auto">
        <div className="p-2 flex justify-between items-center ">
          <Link to="/">
            <img
              src="/logo.svg"
              alt="logo"
              sizes="100vh"
              width={120}
              height={70}
            />
          </Link>

          <div>
            <div className="md:flex items-center gap-5 hidden">
              <Link to="/services">
                <h2 className="hover:scale-105 hover:text-primary cursor-pointer  text-lg	">
                  Services
                </h2>
              </Link>
                {!currentUser ? <h2 className="hover:scale-105 hover:text-primary cursor-pointer  text-lg">
              <Link to='/login'>
                  Sing up / Log in
              </Link>
                </h2>: <Link to='/orders' className="hover:scale-105 hover:text-primary cursor-pointer  text-lg">
                        Orders
                      </Link>}
              {!currentUser?.isSeller && <Link to='/register'><Button>Become a Tasker</Button></Link> }
              {currentUser && (
                <div
                  className="user flex items-center gap-2 cursor-pointer relative "
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <img
                    className=" w-[32px] h-[32px] rounded-full object-cover"
                    src={currentUser.img || '/img/noavatar.jpg'}
                    alt=""
                  />
                  <span className="">{currentUser?.username}</span>
                  {open && (
                    <div className=" options	flex flex-col absolute right-0 top-[50px] p-[20px] rounded-md gap-2 text-gray-700 w-[200px] font-light border-2 border-solid bg-white z-10">
                      {currentUser?.isSeller && (
                        <>
                          <Link to='/myservices/' className="hover:scale-105 hover:text-primary cursor-pointer ">
                            Services
                          </Link>
                          <Link to='/add' className="hover:scale-105 hover:text-primary cursor-pointer ">
                            Add New Service
                          </Link>
                        </>
                      )}
                      <Link to='/orders' className="hover:scale-105 hover:text-primary cursor-pointer ">
                        Orders
                      </Link>
                      <Link to='/messages' className="hover:scale-105 hover:text-primary cursor-pointer ">
                        Messages
                      </Link>
                      <Link className="hover:scale-105 hover:text-primary cursor-pointer " onClick={ handleLogout}>
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
