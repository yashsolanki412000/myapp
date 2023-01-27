import React, { useState } from 'react'
function Test() {
  const [data,setData] = useState("")
  const [number,setNumber] = useState("")

  const handelClick = (number) => {
    setNumber(number)
  }
  if(data == ""){
    setTimeout(()=>{
      setData(1)
    },number)
  }else if(data == 1){
    setTimeout(()=>{
      setData(2)
    },number)
  }else if(data == 2){
    setTimeout(()=>{
      setData(3)
    },number)
  }else if(data ==3){
    setTimeout(()=>{
      setData("")
    },2000)
  }
 return(
  <>
  {data}
  </>
 )
}

export default Test
