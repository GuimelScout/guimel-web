import { Poppins } from "next/font/google";
import SiteHeader from "./template/(client-components)/(Header)/SiteHeader";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import ApolloWrapper from "@/utils/apolloWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {

  return (
    <html lang="es" className={poppins.className}>
      <head>
        <meta title="Guimel" />
      </head>
        <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          <ApolloWrapper>
              <ClientCommons />
              <SiteHeader />
              {children}
              <FooterNav />
              <Footer />
          </ApolloWrapper>
        </body>
    </html>
  );
}
