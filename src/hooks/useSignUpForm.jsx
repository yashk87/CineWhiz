import create from "zustand";

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

  validatePasswordMatch: (password, confirmPassword) => {
    if (password !== confirmPassword) {
      set({ passwordMatchError: "Passwords do not match" });
      return false;
    }
    set({ passwordMatchError: "" });
    return true;
  },
}));

export default useSignupFormStore;
