import create from "zustand";

const useSignupFormStore = create((set) => ({
  firstName: "",
  setFirstName: (value) => set({ firstName: value }),
  lastName: "",
  setLastName: (value) => set({ lastName: value }),
  email: "",
  setEmail: (value) => set({ email: value }),
  password: "",
  setPassword: (value) => set({ password: value }),
  confirmPassword: "",
  setConfirmPassword: (value) => set({ confirmPassword: value }),
}));

export default useSignupFormStore;
