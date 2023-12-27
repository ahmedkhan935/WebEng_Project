import { create } from 'zustand';

const useStore = create(set => ({
  darkMode: false,
  setDarkMode: (darkMode) => set({ darkMode }),
  userRole: (localStorage.getItem('role')) || null,
  setUserRole: (userRole) => set({ userRole }), //role of currently logged in person e.g. "teacher", "student", "admin"
}));

export default useStore;