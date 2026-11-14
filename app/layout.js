import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex",
});

const TITLE = "Shaimaa Kanj – AI Engineer";
const DESCRIPTION =
  "Portfolio of Shaimaa Kanj, AI Engineer: LLM applications, RAG pipelines, AI agents and fine-tuning, backed by solid backend engineering.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A1128",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={plex.variable}>{children}</body>
    </html>
  );
}
