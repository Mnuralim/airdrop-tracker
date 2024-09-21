'use client'
import { checkInAirdrop, deleteAirdrop } from '@/actions'
import { Airdrop } from '@prisma/client'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { FiLoader } from 'react-icons/fi'

interface AirdropWithCheckIns extends Airdrop {
  checkIns: {
    date: Date
  }[]
}

interface Props {
  airdrops: AirdropWithCheckIns[]
}

const AirdropList = ({ airdrops }: Props) => {
  const today = new Date().toISOString().split('T')[0]
  const [loadingCheckIn, setLoadingCheckIn] = useState<string | null>(null)
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null)

  const handleCheckIn = async (airdropId: string) => {
    setLoadingCheckIn(airdropId)
    try {
      const checkIn = await checkInAirdrop(airdropId)
      if (checkIn.message) {
        toast.success(checkIn.message)
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('Error during check-in.')
    } finally {
      setLoadingCheckIn(null)
    }
  }

  const handleDeleteAirdrop = async (airdropId: string) => {
    if (!confirm('Are you sure you want to delete this airdrop?')) return

    setLoadingDelete(airdropId)
    try {
      const deleted = await deleteAirdrop(airdropId)
      if (deleted.message) {
        toast.success(deleted.message)
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('Error deleting airdrop.')
    } finally {
      setLoadingDelete(null)
    }
  }

  const hasCheckedInToday = (checkIns: { date: Date }[]) => {
    return checkIns.some((checkIn) => new Date(checkIn.date).toISOString().split('T')[0] === today)
  }

  if (airdrops.length === 0) {
    return (
      <div className="container mx-auto mt-12 px-5">
        <p className="text-center text-gray-500">No airdrops available.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-darkAccent rounded-lg overflow-hidden">
        <thead className="bg-darkBg">
          <tr className="text-left text-darkText uppercase tracking-wider text-sm">
            <th className="py-3 px-6">Airdrop Name</th>
            <th className="py-3 px-6">Type</th>
            <th className="py-3 px-6">Date Completed</th>
            <th className="py-3 px-6">Source Link</th>
            <th className="py-3 px-6">Airdrop Link</th>
            <th className="py-3 px-6">Check-in Status</th>
            <th className="py-3 px-6">Result</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {airdrops.map((airdrop) => (
            <tr key={airdrop.id} className="border-b border-darkCard text-darkText">
              <td className="py-4 px-6">
                <Link href={`/airdrops/${airdrop.id}`} className="text-blue-500 hover:underline">
                  {airdrop.name}
                </Link>
              </td>
              <td className="py-4 px-6">{airdrop.type}</td>
              <td className="py-4 px-6">{new Date(airdrop.date).toLocaleDateString()}</td>
              <td className="py-4 px-6">
                <Link href={airdrop.sourceLink} target="_blank" className="text-blue-500 hover:underline">
                  Source
                </Link>
              </td>
              <td className="py-4 px-6">
                <Link href={airdrop.airdropLink} target="_blank" className="text-blue-500 hover:underline">
                  Airdrop
                </Link>
              </td>
              <td className="py-4 px-6">
                {hasCheckedInToday(airdrop.checkIns) ? (
                  <span className="text-green-500">Checked In</span>
                ) : (
                  <span className="text-red-500">Not Checked In</span>
                )}
              </td>
              <td className="py-4 px-6">{airdrop.result ? `${airdrop.result} (sold)` : 'Not listed yet'}</td>
              <td className="py-4 px-6 flex flex-col gap-y-2">
                {!hasCheckedInToday(airdrop.checkIns) && (
                  <button
                    onClick={() => handleCheckIn(airdrop.id)}
                    className="bg-primary py-1 px-3 rounded-md text-darkText hover:bg-blue-600 transition flex justify-center items-center"
                    disabled={loadingCheckIn === airdrop.id}
                  >
                    {loadingCheckIn === airdrop.id ? <FiLoader className="animate-spin h-5 w-5" /> : 'Check In'}
                  </button>
                )}
                <Link
                  href={`/airdrops/${airdrop.id}/update`}
                  className="bg-secondary py-1 px-3 rounded-md text-darkText text-center"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDeleteAirdrop(airdrop.id)}
                  className="bg-red-500 py-1 px-3 rounded-md text-darkText flex justify-center items-center"
                  disabled={loadingDelete === airdrop.id}
                >
                  {loadingDelete === airdrop.id ? <FiLoader className="animate-spin h-5 w-5" /> : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AirdropList
