"use client";

import { clsx } from "clsx";
import dynamic from "next/dynamic";
import { Data, Layout } from "plotly.js";
import Plot from "react-plotly.js";

const DynamicPlot = dynamic(() => import("react-plotly.js"), { ssr: false });

type PlotBoxProps = {
  className?: string;
  data: Data[];
  layout: Partial<Layout>;
};

export const PlotBox = (props: PlotBoxProps) => {
  return (
    <div>
      <DynamicPlot data={props.data} layout={props.layout} className="w-full" />
    </div>
  );
};
