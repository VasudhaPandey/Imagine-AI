import React from "react"; import "./Hero.css";
 function Hero() {
   return ( 
   <section className="hero">
     <h1> Your Ultimate AI Image <br /> Generation Platform </h1>
      <p> Generate amazing AI images instantly. Simple, <br /> fast, and professional. </p> 

<button
  className="get-started-btn"
  onClick={() => window.location.href = "/login"}
>
  <span>➜</span>
  Get Started
</button>

</section> 

);

 }
 export default Hero;
