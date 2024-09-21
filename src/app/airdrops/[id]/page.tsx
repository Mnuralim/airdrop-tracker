import { getAirdropById } from '@/actions'
import Link from 'next/link'
import React from 'react'

interface Props {
  params: {
    id: string
  }
}

const Page = async ({ params }: Props) => {
  const airdrop = await getAirdropById(params.id)
  if (!airdrop) {
    return (
      <div className="container mx-auto mt-12">
        <p className="text-center text-gray-500">Airdrop with id {params.id} not found.</p>
      </div>
    )
  }
  return (
    <div className="container mx-auto mt-12">
      <div className="bg-darkBg p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-primary">{airdrop.name}</h1>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-secondary">Type:</span>
            <span className="text-lg text-darkText">{airdrop.type}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-secondary">Date Completed:</span>
            <span className="text-lg text-darkText">{new Date(airdrop.date).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-secondary">Result:</span>
            <span className="text-lg text-darkText">
              {airdrop.result ? `${airdrop.result} (sold)` : 'Not sold yet'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-secondary">Source Link:</span>
            <a href={airdrop.sourceLink} target="_blank" className="text-lg text-blue-500 hover:underline">
              Visit Source
            </a>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-secondary">Airdrop Link:</span>
            <a href={airdrop.airdropLink} target="_blank" className="text-lg text-blue-500 hover:underline">
              Visit Airdrop
            </a>
          </div>

          <div className="mt-6">
            <span className="text-lg font-semibold text-secondary">Addresses Used:</span>
            <ul className="list-disc list-inside text-darkText mt-2">
              {airdrop.addresses.map((address) => (
                <li key={address.id}>{address.address}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <Link href={`/airdrops/${params.id}/check-in`}>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              View Check-in History
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
