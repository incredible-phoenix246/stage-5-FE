import { LoginSchema, RegisterSchema } from "@/schemas";
import prisma from "utils/prisma";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { generateNumericOTP } from "@/utils";

const CreateNewUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Login Failed. Please check your email and password.",
    };
  }

  const { email, password, passwordConfirm, name } = validatedFields.data;

  if (password !== passwordConfirm) {
    return {
      error: "Password and Confirm Password do not match.",
    };
  }
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return {
        error: "Email already exists.",
        success: false,
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateNumericOTP(6);
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        otp,
        otpExpires,
      },
    });
    return {
      success: true,
      message: "User created successfully. Please check your email for OTP.",
      user_id: newUser.id,
    };
  } catch (e: any) {
    return {
      error: e.message,
      success: false,
    };
  }
};

const Login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Login Failed. Please check your email and password.",
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user.password) {
      return {
        error: "User not found.",
        success: false,
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        error: "Email or Password is not correct.",
        success: false,
      };
    }

    return {
      success: true,
      message: "Login successful.",
      user_id: user.id,
    };
  } catch (e: any) {
    return {
      error: e.message || "An unexpected error occurred.",
      success: false,
    };
  }
};
export { CreateNewUser };
