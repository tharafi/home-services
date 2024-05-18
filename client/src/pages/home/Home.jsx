import CategoryList from "@/_components/category/CategoryList";
import Hero from "@/_components/featured/Hero";
import BusinessList from "@/_components/popular project/BusinessList";
import { cards, projects } from "@/data";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

function Home() {
  const navigate = useNavigate();
  
  const handleCategorySelect = (category) => {
    navigate(`/services?cat=${category}`);
  };
  


  return (
    <div>
      <Hero />
      <CategoryList categoryList={cards} onSelect={handleCategorySelect} />
      <BusinessList businessList={projects} title={"Popular Project"} />
      <div className="features  bg-purple-50">
        <div className=" container mx-auto px-4">
          <div className="image">
            <img
              src="https://images.unsplash.com/photo-1581578731256-de834a1fc8af?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="box bg-white">
            <h2>How it Works</h2>
            <div className="info">
              <div className="number bg-purple-200">
                <span>1</span>
              </div>
              <p>Choose a Tasker by price, skills, and reviews.</p>
            </div>
            <div className="info">
              <div className="number bg-orange-100">
                <span>2</span>
              </div>
              <p>Schedule a Tasker as early as today.</p>
            </div>
            <div className="info">
              <div className="number bg-green-100">
                <span>3</span>
              </div>
              <p>Chat, pay, tip, and review all in one place.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="about">
        <div className="title">
          <h2>Everyday life made easier</h2>
          <p>
            When life gets busy, you don't have to tackle it alone. Get time
            back for what you love without breaking the
          </p>
        </div>
        <div className="container mx-auto px-4">
          <div className="text">
            <div className="test bg-purple-100">
              <p>24H TURNAROUND TIME</p>
            </div>
            <h1>
              <span>Schedule when it works </span>for you - as early as today
            </h1>
            <p>
              Now is the time to find a schedule that fits your lifestyle! Get
              started today and make sure you stay on track
            </p>
          </div>
          <div className="box bg-purple-100 rounded-xl">
            <div className="image ">
              <img
                src="https://plus.unsplash.com/premium_photo-1683140920401-36b43c727bb5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="shadow-xl"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
