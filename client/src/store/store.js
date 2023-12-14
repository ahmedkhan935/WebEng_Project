import { create } from 'zustand';

const useStore = create(set => ({
  darkMode: false,
  setDarkMode: (darkMode) => set({ darkMode }),
}));

export default useStore;