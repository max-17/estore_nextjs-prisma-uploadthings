// create a POST function to handle user signup

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  if (data.password !== data.passwordConfirm) return NextResponse.json({message: "Passwords do not match"}, {status: 400});
  console.log('request data:',data);
  //check if user already exists
  const userExists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (userExists) {
    console.log('user exists:',userExists);
    
    return NextResponse.json(
      { message: "User already exists", status: 400 }
    );
  }

  //hash password
  //   const hashedPassword = await bcrypt.hash(data.password, 10);
  //  data.password = hashedPassword;

  //create user
  // no validation for now
  try {
    const createUser = await prisma.user.create({data:{ email: data.email, password: data.password }})
    console.log('create user:',createUser);
    
    return NextResponse.json(createUser, { status: 201 });
    
  } catch (error) {
    
    console.log('create user error:',error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 400 }
    );
  }    

}
