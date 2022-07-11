import { createContext, useState } from "react";

export const SearchBarCtx = createContext();

export function SearchBarContextProvider({ children }) {
  // Example:
  const defaultParams = {
    query: "",
    fields: [],
    selectedField: "",
    extras: [["", ""]],
    order: "asc",
  };

  const [searchParams, setSearchParams] = useState(defaultParams);

  return (
    <SearchBarCtx.Provider value={[searchParams, setSearchParams]}>
      {children}
    </SearchBarCtx.Provider>
  );
}