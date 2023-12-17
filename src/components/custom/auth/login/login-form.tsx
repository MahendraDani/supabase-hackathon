"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod";
import Link from "next/link";

const LoginForm = () => {
  const { toast } = useToast()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordErrorMesage, setPasswordErrorMessage] = useState("");

  const loginFormSchema = z.object({
    email: z.string().email({ message: "Invalid or incorrect email address" }),
    password: z.string().min(9, { message: "Password must be atleast 9 characters long" })
  })

  const router = useRouter();
  const supabase = createClientComponentClient();
  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Invalid Credentails",
        description: "Both email and password are required!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    const parsedInput = loginFormSchema.safeParse({ email, password })
    if (!parsedInput.success) {
      // @ts-ignore
      const parseErrors = parsedInput.error.issues;
      parseErrors.forEach((e) => {
        if (e.path[0] === "email") {
          setIsEmailError(true);
          setEmailErrorMessage(e.message)
        } else if (e.path[0] === "password") {
          setIsPasswordError(true);
          setPasswordErrorMessage(e.message)
        }
      })
      return;
    }
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email: parsedInput.data.email,
      password: parsedInput.data.password,
    })

    if (error) {
      if (error.name === "AuthApiError") {
        toast({
          title: "Invalid login credentials",
          description: "Please enter a valid email address and password",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
      return;
    }
    //TODO: Redirects user feeds idoit!
    router.push(`/feeds/`);
  }

  const handleLoginWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `http://localhost:3000/auth/callback/`
      }
    })

    if (error) {
      alert(JSON.stringify(error, null, 2));
    }
  }

  const handleLoginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `http://localhost:3000/auth/callback/`
      }
    })

    if (error) {
      alert(JSON.stringify(error, null, 2));
    }
  }

  return (
    <div>
      <Card className="w-[350px] mb-24">
        <CardHeader className="text-center -mb-8">
          <CardTitle>Log into your Account</CardTitle>
          <CardDescription>Convert your ideas to amazing stories!</CardDescription>
        </CardHeader>
        <CardHeader className="flex gap-2">
          <Button variant={"outline"} onClick={handleLoginWithGithub} className="flex justify-center items-center gap-2">
            <Image src={"/icons/github.svg"} width={24} height={24} alt="Github Logo" />
            <span>Github</span>
          </Button>
          <Button variant={"outline"} onClick={handleLoginWithGoogle} className="flex justify-center items-center gap-2">
            <Image src={"/icons/google.svg"} width={24} height={24} alt="Google logo" />
            <span>Google</span>
          </Button>
        </CardHeader>
        <div className="flex justify-center items-center mb-2">
          <div className="text-sm text-slate-300">OR CONTINUE WITH</div>
        </div>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                {isEmailError && <span className="text-red-400 text-sm">{emailErrorMessage}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                {isPasswordError && <span className="text-red-400 text-sm">{passwordErrorMesage}</span>}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center items-center gap-3">
          <Button onClick={handleLogin}>Log in</Button>
          <p className="dark:text-slate-500">Dont have an account? <Link href={"/signup"}>Signup</Link></p>
        </CardFooter>
      </Card>

    </div>
  )
}

export default LoginForm;