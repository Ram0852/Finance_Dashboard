import { createContext, useState } from "react";
import { transactions as initialData } from "../data/Transactions";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialData);

  const [role, setRole] = useState("viewer");

  const [user,setUser] = useState("Sriram");

  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        user,
        darkMode, 
        setDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};