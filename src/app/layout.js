import { Montserrat, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/sidebar";

export const montserrat = Montserrat({
  weight: ["800", "600", "500", "400"],
  subsets: ["latin"],
});

export const bricolage = Bricolage_Grotesque({
  weight: ["500"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div>
          <SideBar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
