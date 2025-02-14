"use server";

import { signIn } from "../../auth";

export const credentialsLogin = async (email, password) => {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: error.message || "An error occurred during login" };
  }
};

export const loginAction = async (prevState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

    console.log( email, password );
  try {
    const { success, error } = await credentialsLogin(email, password);

    if (success) {
      return { success: true, error: null };
    } else {
      return { success: false, error };
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};