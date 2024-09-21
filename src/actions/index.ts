'use server'

import { db } from '@/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getUserAirdrops(userId: string, filter: { type?: string; status?: string; name?: string } = {}) {
  const airdropFilter: {
    type?: string
    name?: { contains: string }
    checkIns?: {
      some?: {
        date: {
          gte: Date
          lt: Date
        }
      }
      none?: {
        date: {
          gte: Date
          lt: Date
        }
      }
    }
  } = {}

  const today = new Date().toISOString().slice(0, 10)

  if (filter.status === 'checked-in') {
    airdropFilter.checkIns = {
      some: {
        date: {
          gte: new Date(`${today}T00:00:00.000Z`),
          lt: new Date(`${today}T23:59:59.999Z`),
        },
      },
    }
  } else if (filter.status === 'not-checked-in') {
    airdropFilter.checkIns = {
      none: {
        date: {
          gte: new Date(`${today}T00:00:00.000Z`),
          lt: new Date(`${today}T23:59:59.999Z`),
        },
      },
    }
  }

  if (filter.type) {
    airdropFilter.type = filter.type
  }

  if (filter.name) {
    airdropFilter.name = { contains: filter.name }
  }

  const user = await db.user.findFirst({
    where: {
      id: userId,
      airdrops: {
        some: airdropFilter,
      },
    },
    include: {
      airdrops: {
        include: {
          addresses: true,
          checkIns: true,
        },
      },
    },
  })

  return user?.airdrops || []
}
export async function addAirdrop(
  userId: string,
  data: { name: string; sourceLink: string; airdropLink: string; type: string },
  addresses: string[]
) {
  await db.airdrop.create({
    data: {
      ...data,
      userId,
      addresses: {
        create: addresses.map((address) => ({
          address,
        })),
      },
    },
  })
  revalidatePath('/airdrops', 'page')
  redirect('/airdrops')
}

export async function checkInAirdrop(airdropId: string) {
  const today = new Date().toISOString().split('T')[0]
  const existingCheckIn = await db.checkIn.findFirst({
    where: {
      airdropId,
      date: {
        gte: new Date(today + 'T00:00:00.000Z'),
        lt: new Date(today + 'T23:59:59.999Z'),
      },
    },
  })

  if (existingCheckIn) {
    return { message: 'Already checked in today' }
  }

  await db.checkIn.create({
    data: {
      airdropId,
      date: new Date(),
    },
  })

  revalidatePath('/airdrops', 'page')

  return { message: 'Checked in successfully' }
}

export async function getCheckInsByAirdropId(airdropId: string) {
  return await db.checkIn.findMany({
    where: { airdropId },
    orderBy: {
      date: 'desc',
    },
  })
}

export async function deleteAirdrop(airdropId: string): Promise<{ message: string }> {
  const airdrop = await db.airdrop.findUnique({
    where: { id: airdropId },
  })

  if (!airdrop) {
    return {
      message: 'Airdrop not found',
    }
  }

  await db.address.deleteMany({
    where: { airdropId },
  })

  await db.checkIn.deleteMany({
    where: { airdropId },
  })

  await db.airdrop.delete({
    where: { id: airdropId },
  })

  revalidatePath('/airdrops', 'page')

  return {
    message: 'Airdrop deleted successfully',
  }
}

export async function updateAirdrop(
  id: string,
  updatedData: {
    name: string
    sourceLink: string
    airdropLink: string
    result?: number | null
    type: string
    addresses: string[]
  }
) {
  const existingAirdrop = await db.airdrop.findUnique({
    where: { id },
  })
  if (!existingAirdrop) {
    return
  }
  await db.airdrop.update({
    where: { id },
    data: {
      ...updatedData,
      addresses: {
        deleteMany: {},
        create: updatedData.addresses.map((address: string) => ({ address })),
      },
    },
  })
  revalidatePath('/airdrops', 'page')
  redirect('/airdrops')
}

export async function register(name: string, email: string) {
  const user = await db.user.findFirst({
    where: { email },
  })

  if (!user) {
    const username = email.split('@')[0]
    return db.user.create({
      data: {
        name,
        username,
        email,
      },
    })
  }

  return user
}

export async function getAirdropById(id: string) {
  return await db.airdrop.findUnique({
    where: { id },
    include: { addresses: true },
  })
}
