"use client";

import { Prism } from "@mantine/prism";

export function CodeText({ code }: { code: string }) {
  const sampleCode = `nextflow run 'https://github.com/nf-core/scrnaseq' 
  -name amazing_kalman 
  -params-file 'https://api.tower.nf/ephemeral/B7LJylcCXDucRf7-7RYMgQ.json' 
  -with-tower 
  -r 2.3.2 
  -profile test`;
  return <Prism language="bash">{sampleCode}</Prism>;
}
