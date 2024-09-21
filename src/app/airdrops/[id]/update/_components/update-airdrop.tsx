'use client'

import { updateAirdrop } from '@/actions'
import { Airdrop } from '@prisma/client'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FiLoader } from 'react-icons/fi'

interface Props {
  airdrop: { addresses: { address: string; id: string; airdropId: string }[] } & Airdrop
}

const UpdateAirdrop = ({ airdrop }: Props) => {
  const [formData, setFormData] = useState({
    name: airdrop.name,
    result: airdrop.result || null,
    sourceLink: airdrop.sourceLink,
    airdropLink: airdrop.airdropLink,
    type: airdrop.type,
    addresses: airdrop.addresses.map((address) => address.address),
  })

  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    try {
      await updateAirdrop(airdrop.id, formData)

      toast.success('Airdrop updated successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Error updating the airdrop.')
    } finally {
      setIsLoading(false)
    }
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

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg flex justify-center items-center"
        disabled={isLoading}
      >
        {isLoading ? <FiLoader className="animate-spin h-5 w-5" /> : 'Update Airdrop'}
      </button>
    </form>
  )
}

export default UpdateAirdrop
