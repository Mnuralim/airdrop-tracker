import React from 'react'
import UpdateAirdrop from './_components/update-airdrop'
import { getAirdropById } from '@/actions'

interface Props {
  params: {
    id: string
  }
}

const Page = async ({ params }: Props) => {
  const airdrop = await getAirdropById(params.id)
  if (!airdrop) {
    return <div>Invalid Airdrop</div>
  }
  return (
    <section className="container mx-auto mt-12">
      <div className="bg-darkBg p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-primary">Update Airdrop</h1>
        <UpdateAirdrop airdrop={airdrop} />
      </div>
    </section>
  )
}

export default Page
