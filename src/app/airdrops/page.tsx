import { getUserAirdrops } from '@/actions'
import AirdropList from './_components/list'
import { auth } from '@/auth'
import Filtering from './_components/filtering'

interface Props {
  searchParams?: {
    status?: string
    name?: string
    type?: string
  }
}

const AirdropPage = async ({ searchParams }: Props) => {
  const session = await auth()

  const airdrops = await getUserAirdrops(session!.user.id, {
    status: searchParams?.status,
    name: searchParams?.name,
    type: searchParams?.type,
  })

  return (
    <section>
      <div className="container mx-auto mt-12 px-5">
        <h1 className="text-3xl font-bold mb-6">Airdrop List</h1>
        <Filtering />
        <AirdropList airdrops={airdrops} />
      </div>
    </section>
  )
}

export default AirdropPage
