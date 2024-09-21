'use client'

import { addAirdrop } from '@/actions'
import React, { useState } from 'react'
import { FiLoader } from 'react-icons/fi'
import { toast } from 'react-toastify'

const predefinedTypes = ['testnet', 'bot', 'mini app telegram', 'gleam', 'form']

interface Props {
  userId: string
}

const AddAirdrop = ({ userId }: Props) => {
  const [form, setForm] = useState({
    name: '',
    sourceLink: '',
    airdropLink: '',
    type: '',
    customType: '',
    addresses: [''],
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleAddressChange = (index: number, value: string) => {
    const updatedAddresses = [...form.addresses]
    updatedAddresses[index] = value
    setForm({ ...form, addresses: updatedAddresses })
  }

  const handleAddAddress = () => {
    setForm({ ...form, addresses: [...form.addresses, ''] })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const selectedType = form.customType || form.type
    setIsLoading(true)

    try {
      await addAirdrop(
        userId,
        {
          name: form.name,
          sourceLink: form.sourceLink,
          airdropLink: form.airdropLink,
          type: selectedType,
        },
        form.addresses
      )

      setForm({
        name: '',
        sourceLink: '',
        airdropLink: '',
        type: '',
        customType: '',
        addresses: [''],
      })

      toast.success('Airdrop added successfully!')
    } catch (err) {
      console.error(err)

      toast.error('An error occurred while adding the airdrop.')
    } finally {
      setIsLoading(false) // Stop loading state
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div>
        <label className="block mb-2">Airdrop Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-4"
          required
        />
      </div>
      <div></div>
      <div>
        <label className="block mb-2">Source Link</label>
        <input
          type="url"
          value={form.sourceLink}
          onChange={(e) => setForm({ ...form, sourceLink: e.target.value })}
          className="w-full p-4"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Airdrop Link</label>
        <input
          type="url"
          value={form.airdropLink}
          onChange={(e) => setForm({ ...form, airdropLink: e.target.value })}
          className="w-full p-4"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Airdrop Type</label>
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full p-4">
          <option value="">Select a type</option>
          {predefinedTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className="mt-4">
          <label className="block mb-2">Or enter custom type</label>
          <input
            type="text"
            value={form.customType}
            onChange={(e) => setForm({ ...form, customType: e.target.value })}
            placeholder="Enter custom type"
            className="w-full p-4"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2">Addresses Used</label>
        {form.addresses.map((address, index) => (
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
        className="w-full bg-primary text-darkText py-3 rounded-lg flex justify-center items-center"
        disabled={isLoading}
      >
        {isLoading ? <FiLoader className="animate-spin h-5 w-5 text-darkText" /> : 'Add Airdrop'}
      </button>
    </form>
  )
}

export default AddAirdrop
