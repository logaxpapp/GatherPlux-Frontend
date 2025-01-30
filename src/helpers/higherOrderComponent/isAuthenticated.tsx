/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Loader from "@/components/Loader";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const token = useSelector((state: RootState) => state.user.accessToken);
    const role = useSelector((state: RootState) => state.user.role);
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
      if (!token && !pathname.includes("auth")) {
        router.replace("/auth/login");
        return;
      }

      if (pathname.includes("auth") && role === "user" && token) {
        router.replace("/profile");
        return;
      }

      if (pathname.includes("admin") && role !== "superadin") {
        router.replace("/");
        return;
      }

      if (pathname.includes("auth") && role === "superadin") {
        router.replace("/admin/messages");
        return;
      }

      setIsLoading(false);
    }, [router, pathname, token, role]);

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader height={10} width={10} />
        </div>
      );
    }

    return <Component {...props} />;
  };
}
