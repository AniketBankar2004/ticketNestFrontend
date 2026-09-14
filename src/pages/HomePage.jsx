import React from 'react'

const HomePage = () => {
  return (
    <div>
      Hello {localStorage.getItem("username")}
    </div>
  )
}

export default HomePage
