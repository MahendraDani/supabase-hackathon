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
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const SignupForm = () => {
  const { toast } = useToast()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const hanldeSignup = async () => {
    if (!(email && password)) {
      toast({
        title: "Invalid Credentails",
        description: "Both email and password are required!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback"
      }
    })

    if (error) {
      alert(JSON.stringify(error, null, 2))
      if (error.name === "AuthWeakPasswordError") {
        toast({
          title: "Invalid Password",
          description: "Password should contain lowercase, uppercase letters, digits and special characters",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      } else if (error.name === "AuthApiError") {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }

    }
    else {
      // TODO : push to proctected route : home page of user
      router.push("/settings");
    }

  }

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create your Account</CardTitle>
          <CardDescription>Join the community, spread the word!</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <Button onClick={hanldeSignup}>Sign up</Button>
        </CardFooter>
      </Card>

    </div>
  )
}

export default SignupForm;