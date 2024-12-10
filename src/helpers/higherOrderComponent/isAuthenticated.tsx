/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/cookie.utility";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const router = useRouter();
    const token = getCookie("token") !== undefined;

    useEffect(() => {
      if (!token) {
        return router.push("/auth/login");
      }
    }, [token, router]);


    if (!token) {
      return null;
    }

    return <Component {...props} />;
  };
}