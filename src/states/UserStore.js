import { create } from "zustand";

const useUserStore = create((set) => ({
  isVerifyLogin: false,
  changeIsVerifyLogin: (x) => set(() => ({ isVerifyLogin: x })),
}));

export default useUserStore;
