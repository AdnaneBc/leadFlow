import type { Metadata } from "next";
import Script from "next/script";
import "./index.css";
export const metadata: Metadata = {
  title: "LeadFlow",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KG9E52XW54"
          strategy="afterInteractive"
        ></Script>

        <Script id="ga4-consent" strategy="beforeInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      gtag("js", new Date());
      const isDev = location.hostname === "localhost";
      gtag("config", "G-KG9E52XW54", isDev ? { debug_mode: true } : {});`}
        </Script>
      </body>
    </html>
  );
}
