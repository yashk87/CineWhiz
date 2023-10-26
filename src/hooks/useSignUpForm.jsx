import { create } from "zustand";

const useSignupFormStore = create((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  passwordMatchError: "",

  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setPasswordMatchError: (error) => set({ passwordMatchError: error }),
}));

export default useSignupFormStore;
