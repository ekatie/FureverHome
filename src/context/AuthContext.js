import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const login = (email, password) => {

}

export const useAuth = () => {
  return useContext(AuthContext);
}