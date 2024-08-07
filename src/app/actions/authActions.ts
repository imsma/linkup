"use server";

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/schemas/loginSchmea";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
import { user } from "@nextui-org/react";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    const validatedData = registerSchema.safeParse(data);

    if (!validatedData.success) {
      return { status: "error", error: validatedData.error.errors };
    }

    const { name, email, password } = validatedData.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) return { status: "error", error: "User already exists." };

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });

    return { status: "success", data: user };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return { status: "success", data: "Logged In" };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.cause.err.code === "credentials") {
        return { status: "error", error: "Invalid Credentials" };
      }
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid Credentials" };
        default:
          return { status: "error", error: ">>>>Something went wrong" };
      }
    } else {
      return { status: "error", error: "Something else went wrong" };
    }
  }
}

export async function signoutUser() {
  await signOut({ redirectTo: "/" });
}

export async function getAuthUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("Authorized");

  return userId;
}
