import React from "react";

export const MovieApp = () => {
  fetch(`http://localhost:8080`)
    .then(res => res.json())
    .then(resJsonified => console.log (resJsonified))
  return ( 
    <>

    </>
  )
}