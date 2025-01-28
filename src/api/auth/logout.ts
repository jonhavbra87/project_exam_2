import { remove } from "../../storage/remove";

export function logout() {
    
  remove("token");
  remove("profile");
  
  console.log("Logged out successfully");
}
