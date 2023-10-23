import create from "zustand";

const useLoginFormStore = create((set) => ({
  email: "",
  password: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
}));

export default useLoginFormStore;
