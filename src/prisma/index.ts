import { PrismaClient, Workflow } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.workflow.findMany();
  console.log(allUsers);
  const x: Workflow = {};
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
