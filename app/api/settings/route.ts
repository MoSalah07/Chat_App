import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { name, image } = await req.json();

    if (!currentUser?.id)
      return new NextResponse("Unauthorized", { status: 401 });

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image,
        name,
      },
    });

    return NextResponse.json(updateUser);
  } catch (err: any) {
    console.log(err, `Something went wrong`);
    return new NextResponse(`Internal Server Error`, { status: 500 });
  }
}
