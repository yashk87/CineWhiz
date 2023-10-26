import { create } from "zustand";

const useSignupFormStore = create((set) => ({
  firstName: "",
  middalName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  passwordMatchError: "",

  setFirstName: (firstName) => set({ firstName }),
  setMiddalName: (middalName) => set({ middalName }),
  setLastName: (lastName) => set({ lastName }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setPasswordMatchError: (error) => set({ passwordMatchError: error }),
}));

export default useSignupFormStore;
