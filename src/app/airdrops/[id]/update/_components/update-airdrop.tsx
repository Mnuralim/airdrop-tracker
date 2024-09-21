'use client'
import { updateAirdrop } from '@/actions'
import { Airdrop } from '@prisma/client'
import React, { useState } from 'react'

interface Props {
  airdrop: { addresses: { address: string; id: string; airdropId: string }[] } & Airdrop
}

const UpdateAirdrop = ({ airdrop }: Props) => {
  const [formData, setFormData] = useState({
    name: airdrop.name,
    date: new Date(airdrop.date).toISOString().slice(0, 10),
    result: airdrop.result || null,
    sourceLink: airdrop.sourceLink,
    airdropLink: airdrop.airdropLink,
    type: airdrop.type,
    addresses: airdrop.addresses.map((address) => address.address),
  })

  const handleAddressChange = (index: number, value: string) => {
    const updatedAddresses = [...formData.addresses]
    updatedAddresses[index] = value
    setFormData({ ...formData, addresses: updatedAddresses })
  }

  const handleAddAddress = () => {
    setFormData({ ...formData, addresses: [...formData.addresses, ''] })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateAirdrop(airdrop.id, formData)
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2">Airdrop Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-4"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Date Completed</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-4"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Result</label>
        <input
          type="number"
          value={formData.result || ''}
          onChange={(e) => setFormData({ ...formData, result: parseFloat(e.target.value) || null })}
          placeholder="Result (optional)"
          className="w-full p-4"
        />
      </div>
      <div>
        <label className="block mb-2">Source Link</label>
        <input
          type="url"
          value={formData.sourceLink}
          onChange={(e) => setFormData({ ...formData, sourceLink: e.target.value })}
          className="w-full p-4"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Airdrop Link</label>
        <input
          type="url"
          value={formData.airdropLink}
          onChange={(e) => setFormData({ ...formData, airdropLink: e.target.value })}
          className="w-full p-4"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Airdrop Type</label>
        <input
          type="text"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-4"
          required
        />
      </div>

      {/* Address Section */}
      <div>
        <label className="block mb-2">Addresses Used</label>
        {formData.addresses.map((address, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={address}
              onChange={(e) => handleAddressChange(index, e.target.value)}
              placeholder={`Address ${index + 1}`}
              className="w-full p-4"
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddAddress} className="bg-primary text-white py-2 px-4 rounded">
          Add Another Address
        </button>
      </div>

      <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg">
        Update Airdrop
      </button>
    </form>
  )
}

export default UpdateAirdrop
