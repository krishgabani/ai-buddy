"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("5993a0ff-50b9-409c-b861-fa481ff0da0b");
  }, []);
  return null;
};

export default CrispChat;
