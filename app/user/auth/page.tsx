
import { getSession } from "@/app/page";
import { redirect } from "next/navigation";
import {SignupForm} from "./signupForm";

export default async function SignupPage() {
  const session = await getSession()  
  if (session) {
    return redirect('/')
  }
  return <div className="flex items-center"><SignupForm/></div>
};


