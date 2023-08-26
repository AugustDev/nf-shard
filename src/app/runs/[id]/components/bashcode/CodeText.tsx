"use client";

import { Prism } from "@mantine/prism";

export function CodeText({ code }: { code: string }) {
  return <Prism language="bash">{code}</Prism>;
}
