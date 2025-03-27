"use client";

import { CredentialResponse } from "@react-oauth/google"; // if available
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import { loginSchema } from "@/modules/auth/validation-schema";
import { useApi } from "@/hooks/useApi";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type LoginSuccessResponse = {
  message: string;
};

export function SignInForm() {
  const router = useRouter();
  const { post } = useApi(); //when user logs in using email, password -> signInForm calls the post function from useApi hook

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { data, error } = await post<LoginSuccessResponse>(
      "/authentication/login", //user submits the login form and this sends the post request with the payload values
      values //value is email and password, collected from the form
    );
    //this hits the NestJS backend (POST('login'))

    if (error) {
      alert("Login failed. Please check your credentials.");
      return;
    }
//login successful (the backend sends)
    if (data?.message === "Login successful") {
      console.log("Login successful!");
      router.push("/dashboard");
    } else {
      alert("Login failed.");
    }
  };

  const handleGoogleSuccess = async (
    //CredentialResponse is returned from the GoogleLogin component
    //it contains a JWT-style Google token.
    credentialResponse: CredentialResponse
  ) => {
    try {
      const token = credentialResponse.credential;
      if (!token) throw new Error("Google token is missing.");

      //apiEndpoint is the NESTJS backend route to handle Google login
      const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const apiEndpoint = `${backendURL}/api/v1/authentication/google-redirect`;

      //sends the token to /google-redirect as JSON
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        credentials: "include", //ensures cookies can be received from backend.
      });

      //if there is no response from the backend, it throws an error
      if (!res.ok) {
        //res.text reads the error body from the response and throws an error
        const errorText = await res.text();
        throw new Error(`Backend error: ${res.status} - ${errorText}`);
      }

      //if the response was correct, it reads the JSON response
      const data: { message: string } = await res.json();

      if (data?.message === "Login successful") {
        alert("Google Login successful!");
        router.push("/dashboard");
      } else {
        throw new Error("Unexpected response from backend.");
      }
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Unknown login error";
      console.error("Google Login Error:", error);
      alert(`Google login failed: ${errMsg}`);
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <Form {...form}>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>
                Login with your Apple or Google account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="w-full">
                    Login with Apple
                  </Button>

                  <GoogleLogin
                  //renders a "Login with Google" button
                  //when clicked, Google's OAuth pops up
                  //if success, it triggers the handleGoogleSuccess
                    onSuccess={handleGoogleSuccess}
                    onError={() => alert("Google login failed")}
                  />
                </div>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>

                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                  noValidate
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full pb-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full pb-4">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input id="password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </Form>
    </GoogleOAuthProvider>
  );
}
