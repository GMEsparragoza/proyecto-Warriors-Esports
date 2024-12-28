import { Navbar } from "@/components/Navbar/navbar";
import './global.css'
import { AuthContextProvider } from "@/utils/AuthContext";

export const metadata = {
  title: "Warrior Esports",
  description: "Warrior Esports",
};

export default function RootLayout({children}) {
  return (
    <html lang="es">
      <body>
        <AuthContextProvider>
          <link rel="icon" type="image/x-icon" href="/Logo-Warriors.ico"></link>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
