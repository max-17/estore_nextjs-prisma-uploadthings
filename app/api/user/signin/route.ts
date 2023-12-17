
// create a POST function to handle user signup

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);
  //check if user already exists
  const userExists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (userExists) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 400 }
    );
  }

  //hash password
//   const hashedPassword = await bcrypt.hash(data.password, 10);
//  data.password = hashedPassword;
 
//create user
// no validation for now
 const createUser = await prisma.user.create({
   data,
 }).catch((error) => {  
   console.log(error);
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 400 }
    )});

 return NextResponse.json(createUser, { status: 201 });
 
}
