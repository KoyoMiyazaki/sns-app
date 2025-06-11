"use client";

import { supabase } from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import HeaderMobile from "./header-mobile";
import HeaderPC from "./header-pc";

export default function Header() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState<number>(0);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      setIsLoggedIn(!!session);

      if (session) {
        const res = await fetch("/api/notifications/unread-count", {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        const json = await res.json();
        setNotificationCount(json.count);
      }
    };
    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      if (session) {
        fetch("/api/notifications/unread-count", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        })
          .then((res) => res.json())
          .then((json) => setNotificationCount(json.count));
      } else {
        setNotificationCount(0);
      }
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
    <HeaderMobile
      isLoggedIn={isLoggedIn}
      notificationCount={notificationCount}
      handleLogout={handleLogout}
    />
  ) : (
    <HeaderPC
      isLoggedIn={isLoggedIn}
      notificationCount={notificationCount}
      handleLogout={handleLogout}
    />
  );
}
