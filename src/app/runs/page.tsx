import { prisma } from "@services/postgres/prisma";
import { Workflow } from "@prisma/client";
import { SearchBar } from "@/app/components/index";
import { RunsTable } from "./components";

export default async function Page() {
  const props = await getData();

  return (
    <>
      <SearchBar value="" />
      <RunsTable runs={props.runs} className="mt-8" />
    </>
  );
}

type TRunsPageProps = {
  isLoading: boolean;
  runs: Workflow[];
};

const getData = async (): Promise<TRunsPageProps> => {
  let workflows: Workflow[] = [];
  try {
    workflows = await prisma.workflow.findMany({
      take: 20,
      orderBy: {
        updatedAt: "desc",
      },
    });
  } catch (e) {
    console.error(e);
  }

  return {
    isLoading: false,
    runs: workflows,
  };
};
