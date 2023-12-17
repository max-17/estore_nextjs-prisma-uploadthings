import { signIn, signOut } from "next-auth/react";
import { PropsWithChildren, ReactNode } from "react";

type Props = {className:string, children:PropsWithChildren<ReactNode>}

export const SignoutBtn =({className, children}:Props)=> <button className={className} onClick={()=>signOut()}>{children}</button>

export const SignInBtn =({className, children}:Props)=> <button className={className} onClick={()=>signIn()}>{children}</button>
