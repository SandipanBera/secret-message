"use client"
import React, { useEffect, useRef, useState } from 'react'
function page() {
  const render = useRef(0);

    console.log(render.current + 1);
    useEffect(() => {
      console.log("render");
     
       
    }, [])
    
    
  return (
    <div>demo page
      
    </div>
  )
}

export default page