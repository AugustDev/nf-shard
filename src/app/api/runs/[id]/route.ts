import { NextResponse } from "next/server";
import { prisma } from "@/services/prisma/prisma";
import { revalidatePath } from "next/cache";

interface BigInt {
  /** Convert to BigInt to string form in JSON.stringify */
  toJSON: () => string;
}

// @ts-ignore: Unreachable code error
BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

export async function GET(request: Request, { params }: any) {
  const id = params.id as string;
  try {
    const workflow = await prisma.workflow.findUnique({
      where: {
        id: id,
      },
      include: {
        tasks: true,
        progress: true,
      },
    });

    revalidatePath(request.url);

    return NextResponse.json({
      workflow: workflow,
      tasks: workflow?.tasks ?? [],
      progress: workflow?.progress,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
