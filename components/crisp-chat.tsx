"use client";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("7ac8c07c-ee4d-41cf-a4c7-9fce9ace207e");
  }, []);
  return null;
};
