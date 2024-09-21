import { getCheckInsByAirdropId } from '@/actions'
import React from 'react'

interface CheckInHistoryProps {
  params: {
    id: string
  }
}

const Page = async ({ params }: CheckInHistoryProps) => {
  const checkIns = await getCheckInsByAirdropId(params.id)

  if (!checkIns || checkIns.length === 0) {
    return (
      <div className="container mx-auto mt-12">
        <p className="text-center text-gray-500">No check-ins available for this airdrop.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto mt-12 px-5">
      <h1 className="text-3xl font-bold mb-6 text-primary">Check-in History</h1>

      <div className="bg-darkBg p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <ul className="space-y-4">
          {checkIns.map((checkIn) => (
            <li key={checkIn.id} className="bg-darkAccent p-4 rounded-lg">
              <span className="block text-lg text-darkText">
                {new Date(checkIn.date).toLocaleDateString()} - Checked In
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Page
