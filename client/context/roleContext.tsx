"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { me } from "@/lib/api";

interface RoleGuardProps {
  children: React.ReactNode;
  allowed: string[]; // roles allowed for this page
}

export default function RoleGuard({ children, allowed }: RoleGuardProps) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await me();
        if (allowed.includes(res.data.role)) {
          setAuthorized(true);
          console.log(res)
        } else {
            toast.error("You do not have access to this page");
            console.log(res)
            // redirect back to previous page or fallback
            router.back(); // goes to the last page
        }
      } catch {
        toast.error("Please login to continue");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    checkRole();
  }, [allowed, router]);

  if (loading) return <div>Loading...</div>;
  if (!authorized) return null;

  return <>{children}</>;
}
