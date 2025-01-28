"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect (() => {
        Crisp.configure("cbcd2d1a-7ee4-4676-b27d-cf0ebc32106a");
    }, []);
    return null;
}