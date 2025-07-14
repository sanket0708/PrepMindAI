import React from 'react'

const SpinnerLoader = () => {
  return (
    <span className="inline-block align-middle w-6 h-6 mr-2 border-4 border-t-4 border-white border-t-cyan-500 rounded-full animate-spin bg-white" style={{boxShadow: '0 0 0 2px #bae6fd'}}></span>
  )
}

export default SpinnerLoader