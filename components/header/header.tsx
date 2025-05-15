"use client";

import { supabase } from "@/lib/supabase-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import HeaderMobile from "./header-mobile";
import HeaderPC from "./header-pc";

export default function Header() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };
    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    location.href = "/login";
  };

  return isMobile ? (
    <HeaderMobile />
  ) : (
    <HeaderPC isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
  );
}
