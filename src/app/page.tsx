import { auth } from '@/auth'
import AddAirdrop from './_components/add-airdrop'

const homePage = async () => {
  const session = await auth()
  return (
    <section>
      <div className="container mx-auto mt-12 px-5">
        <h1 className="text-3xl font-bold mb-8">Add New Airdrop</h1>
        <AddAirdrop userId={session!.user.id} />
      </div>
    </section>
  )
}

export default homePage
