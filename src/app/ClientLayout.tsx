"use client"

import SiteHeader from "../components/Guimel/SiteHeader";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import FooterNav from "@/components/Guimel/FooterNav";
import ApolloWrapper from "@/utils/apolloWrapper";
import { UserProvider } from "context/UserContext";
import Footer from "@/components/Guimel/Footer";
import { usePathname } from "next/navigation";
import { useLenis } from "@/hooks/useLenis";

export default function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {

  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");
  
  // Initialize Lenis smooth scrolling
  useLenis();

  return (
    <ApolloWrapper>
      <UserProvider>
        <ClientCommons />
        {!isAuthPage && <SiteHeader />}
        {children}
        {!isAuthPage && <>
        <FooterNav />
        <Footer />
      </>}
      </UserProvider>
    </ApolloWrapper>
  );
}
