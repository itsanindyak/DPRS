import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { UserProvider } from "@/context/authContext";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DisasterEd Pro",
  description:
    "National Disaster Management Authority - Education Division Admin Portal",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={`${inter.className} bg-[#0F0E17] text-white flex justify-center`}
        >
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </body>
      </UserProvider>
    </html>
  );
}

