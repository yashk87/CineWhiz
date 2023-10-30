import { create } from "zustand";

const useSignupFormStore = create((set) => ({
  firstName: "",
  middalName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  passwordMatchError: "",
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  passwordError: "",
  orgnizationName: "",

  setFirstName: (firstName) => set({ firstName }),
  setMiddalName: (middalName) => set({ middalName }),
  setLastName: (lastName) => set({ lastName }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setOrganizationName: (orgnizationName) => set({ orgnizationName }),
  setPasswordMatchError: (error) => set({ passwordMatchError: error }),
  setFirstNameError: (error) => set({ firstNameError: error }),
  setLastNameError: (error) => set({ lastNameError: error }),
  setEmailError: (error) => set({ emailError: error }),
  setPasswordError: (error) => set({ passwordError: error }),
}));

export default useSignupFormStore;
