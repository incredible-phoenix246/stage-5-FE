"use server";

import { LoginSchema, OtpSchema, RegisterSchema } from "@/schemas";
import prisma from "utils/prisma";
import * as z from "zod";
import { generateNumericOTP } from "@/utils";
import axios from "axios";

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
    const otp = generateNumericOTP(6);
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: password,
        otp,
        otpExpires,
      },
    });

    const sendmail = await axios.post(
      "https://mail-service-1omd.onrender.com/api/devlink/sendotp",
      {
        name,
        email,
        otp,
      }
    );

    if (sendmail.status !== 200) {
      return {
        error: "Error while creating account.",
        success: false,
      };
    }

    return {
      success: true,
      message: "User created successfully. Please check your email for OTP.",
      user_id: newUser.id,
      email: newUser.email,
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

    if (!user) {
      return {
        error: "User not found.",
        success: false,
      };
    }

    if (user.crearedWith === "google") {
      return {
        error: "Account was created by Google",
        success: false,
      };
    }

    const isMatch = user.password === password;

    if (!isMatch) {
      return {
        error: "Email or Password is not correct.",
        success: false,
      };
    }
    const { password: _, ...rest } = user;

    return {
      success: true,
      message: "Login successful.",
      user_id: rest.id,
    };
  } catch (e: any) {
    return {
      error: e.message || "An unexpected error occurred.",
      success: false,
    };
  }
};

const getuserbyemaail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (e: any) {
    return null;
  }
};

const verifyOtp = async (values: z.infer<typeof OtpSchema>, userId: string) => {
  const validatedFields = OtpSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "OTP is invalid.",
      success: false,
    };
  }

  const { otp } = validatedFields.data;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || user.otp !== otp) {
      return {
        error: "OTP is invalid.",
        success: false,
      };
    }

    if (user.otpExpires && user.otpExpires.getTime() < Date.now()) {
      return {
        error: "OTP has expired.",
        success: false,
      };
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        otp: null,
        otpExpires: null,
        isVerified: true,
        emailVerified: new Date(),
      },
    });

    return {
      success: true,
    };
  } catch (e: any) {
    return {
      error: e.message || "An unexpected error occurred.",
      success: false,
    };
  }
};

const GOOGLE_SIGN_IN = async (profile: any) => {
  try {
    const { name, email } = profile;
    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: "",
          crearedWith: "google",
          isVerified: true,
          emailVerified: new Date(),
        },
      });
    }
    const { password: _, ...rest } = user;
    return {
      user: rest,
    };
  } catch (e: any) {
    return {
      error: e.message || "An unexpected error occurred.",
      success: false,
    };
  }
};
export { CreateNewUser, Login, getuserbyemaail, verifyOtp, GOOGLE_SIGN_IN };
