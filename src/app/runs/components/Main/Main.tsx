"use client";

import React, { useEffect, useState } from "react";
import { clsx } from "clsx";
import { SearchBar } from "@/app/components";
import { Workflow } from "@prisma/client";
import { RunsTable } from "../RunsTable";
import { SearchResponse } from "@/app/api/search/types";
import styles from "./Main.module.scss";

type TMainProps = {
  runs: Workflow[];
};

export const Main = (props: TMainProps) => {
  const [search, setSearch] = useState("");
  const [workflows, setWorkflows] = useState<Workflow[]>(props.runs);

  const executeSearch = async () => {
    if (search.length < 3) {
      setWorkflows(props.runs);
      return;
    }

    const response = await fetch(`http://localhost:3000/api/search`, {
      body: JSON.stringify({ term: search }),
      method: "POST",
      cache: "no-store",
    });

    const results: SearchResponse = await response.json();
    setWorkflows(results.workflows);
  };

  return (
    <>
      <SearchBar onChange={setSearch} onSubmit={executeSearch} />
      {workflows.length > 0 && (
        <RunsTable
          runs={workflows}
          className={clsx(styles.fadeInBottom, "mt-8")}
        />
      )}
    </>
  );
};
