import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  const user = await prisma.user.create({
	data: {
		firstName: 'Alice',
		lastName: 'Somehumanman',
		email: 'alice@prisma.io',
	},
  })
}

async function findUsers() {
  // Find all existing users
  const users = await prisma.user.findMany();
  console.log(users);
}

/* findUsers()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }) */