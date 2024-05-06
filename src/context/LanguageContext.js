import React, { createContext, useContext, useState } from "react";

export const LanguageContext = createContext();

const useLanguageContext = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("russian");

  const value = { language, setLanguage };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default useLanguageContext;
