import { Geist, Geist_Mono } from "next/font/google";
import { auth, signOut } from "../../auth";
import ErrorBoundary from "../../components/ErrorBoundary";
import TopBar from "../../components/TopBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next Task Manager",
  description: "Generated by github.com/muhamash",
};

export default async function RootLayout ( { children } )
{
  const session = await auth();
  if (session?.error === "RefreshAccessTokenError") {
    await signOut({ redirect: false });
    // Redirect to login with error message
    redirect("/login?error=SessionExpired");
  }

  return (
    <html lang="en">
      <body
        className={ `${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white` }
      >
        <ErrorBoundary>
          <TopBar session={ session } />
          { children }
          {/* { inProgress }
        { pending }
        { complete } */}
        </ErrorBoundary>
      </body>
    </html>
  );
}
