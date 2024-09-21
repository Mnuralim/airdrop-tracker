'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Filtering = () => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleFilterChange = (status: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('status', status)
    if (status === 'all') {
      params.delete('status')
    }

    replace(`/airdrops?${params.toString()}`)
  }
  return (
    <div className="mb-6">
      <label className="mr-4">Filter by Check-in Status:</label>
      <select
        className="bg-darkAccent text-darkText p-2 rounded-md"
        value={searchParams.get('status') || 'all'}
        onChange={(e) => handleFilterChange(e.target.value)}
      >
        <option value="all">All Airdrops</option>
        <option value="checked-in">Checked-in</option>
        <option value="not-checked-in">Not Checked-in</option>
      </select>
    </div>
  )
}

export default Filtering
