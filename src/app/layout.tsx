import { Poppins } from "next/font/google";
import SiteHeader from "./template/(client-components)/(Header)/SiteHeader";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import FooterNav from "@/components/Guimel/FooterNav";
import ApolloWrapper from "@/utils/apolloWrapper";
import { UserProvider } from "context/UserContext";
import Footer from "@/components/Guimel/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Guimel Community",
  description: "Sitio oficial de Guimel para reservas, actividades y más",
  keywords: ["Guimel", "Reservas", "Servicios"],
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {

  return (
    <html lang="es" className={poppins.className}>
        <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          <ApolloWrapper>
            <UserProvider>
              <ClientCommons />
              <SiteHeader />
              {children}
              <FooterNav />
              <Footer />
            </UserProvider>
          </ApolloWrapper>
        </body>
    </html>
  );
}
