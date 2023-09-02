import { prisma } from "@/services/prisma/prisma";
import { NextResponse } from "next/server";
import { SearchRequest, SearchResponse } from "./types";

export async function POST(request: Request) {
  const searchRequest: SearchRequest = await request.json();

  // requested search conditions
  let conditions = [];

  if (searchRequest.term) {
    conditions.push({
      searchable: {
        contains: searchRequest.term?.toLowerCase(),
      },
    });
  }

  if (searchRequest.id) {
    conditions.push({
      id: {
        equals: searchRequest.id,
      },
    });
  }

  if (searchRequest.run_name) {
    conditions.push({
      runName: {
        equals: searchRequest.run_name,
      },
    });
  }

  if (searchRequest.project_name) {
    conditions.push({
      projectName: {
        equals: searchRequest.project_name,
      },
    });
  }

  if (searchRequest.user_name) {
    conditions.push({
      userName: {
        equals: searchRequest.user_name,
      },
    });
  }

  if (searchRequest.tags) {
    conditions.push({
      tags: {
        hasEvery: searchRequest.tags,
      },
    });
  }

  if (searchRequest.status) {
    conditions.push({
      status: {
        equals: searchRequest.status,
      },
    });
  }

  if (searchRequest.after) {
    conditions.push({
      updatedAt: {
        gte: searchRequest.after,
      },
    });
  }

  if (searchRequest.before) {
    conditions.push({
      updatedAt: {
        lte: searchRequest.before,
      },
    });
  }

  const workflows = await prisma.workflow.findMany({
    where: {
      AND: conditions,
    },
  });

  const res: SearchResponse = {
    workflows: workflows,
  };

  return NextResponse.json(res);
}
