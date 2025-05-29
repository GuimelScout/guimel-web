
import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import ClientLayout from "./ClientLayout";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Scouteando México",
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
          <ClientLayout children={children} params={params} />
        </body>
    </html>
  );
}
