"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signupSchema } from "@/modules/auth/validation-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Checkbox } from "../../components/ui/checkbox";
import Link from "next/link";

export function SignUpForm() {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create an account</CardTitle>
            <CardDescription>
              Lets get started. Fill in the details below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="w-full pb-4">
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <FormControl>
                          <Input
                            id="username"
                            type="text"
                            autoCorrect="off"
                            placeholder="Choose a username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full pb-4">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            autoCorrect="off"
                            placeholder="name@example.com"
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
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Must be at least 6 characters long"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="w-full pb-4">
                        <FormLabel htmlFor="confirmPassword">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Enter the same password again"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center gap-2 my-2">
                  <Checkbox className="rounded-md" />
                  <span className="text-sm text-muted-foreground">
                    I accept the{" "}
                    <a
                      href="#"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Terms and Conditions
                    </a>
                  </span>
                </div>
                <Button type="submit" className="mt-4 w-full">
                  Sign Up
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/" className="underline underline-offset-4">
            Sign In
          </Link>
        </div>
      </div>
    </Form>
  );
}
