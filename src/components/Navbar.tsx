"use client";
import Link from "next/link"; // Correct import for Link component
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { ComponentProps, ReactNode } from "react";

export function Navbar() {
  return (
    <ul className="flex justify-center gap-2">
      <li>
        <Link href="/admin">Dashboard</Link>
      </li>
      <li>
        <Link href="/admin/products">products</Link>
      </li>
      <li>
        <Link href="/admin/customers">customers</Link>
      </li>
      <li>
        <Link href="/sales">sales </Link>
      </li>
    </ul>
  );
}
