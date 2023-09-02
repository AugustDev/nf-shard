"use client";

import React, { useEffect, useState } from "react";
import { SearchBar } from "@/app/components";
import { Workflow } from "@prisma/client";
import { RunsTable } from "../RunsTable";

type TMainProps = {
  runs: Workflow[];
};

export const Main = (props: TMainProps) => {
  const [search, setSearch] = useState("");
  const [workflows, setWorkflows] = useState<Workflow[]>(props.runs);

  const executeSearch = () => {};

  return (
    <>
      <SearchBar onChange={setSearch} />
      <RunsTable runs={workflows} className="mt-8" />
    </>
  );
};
