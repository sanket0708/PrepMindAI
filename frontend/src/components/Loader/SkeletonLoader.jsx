import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex space-x-4 p-4 border rounded-lg bg-white shadow-sm w-full max-w-md">
      <div className="rounded-full bg-gray-200 h-12 w-12" />
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader