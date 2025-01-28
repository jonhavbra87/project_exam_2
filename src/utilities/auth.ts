// import { useEffect, useState } from "react";
import { load } from "../storage/load";
import { save } from "../storage/save";
import { remove } from "../storage/remove";

/**
 * Returns the current authenticated user's profile.
 */
export function getProfile() {
  return load("profile");
}

/**
 * Saves user data on login.
 */
export function loginUser(token: string, profile: { name: string; email: string }) {
  const expiresIn = 60 * 60 * 1000; // 1 hour
  const expiryTime = Date.now() + expiresIn;

  save("token", { accessToken: token, expiresAt: expiryTime });
  save("profile", { ...profile, expiresAt: expiryTime });
}

/**
 * Logs out the user by removing stored data.
 */
export function logoutUser() {
  remove("token");
  remove("profile");
}
