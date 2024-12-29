import { Navbar } from "@/components/Navbar/navbar";
import './global.css'
import { AuthContextProvider } from "@/utils/AuthContext";
import { AlertProvider } from "@/utils/AlertContext";
import { Alerta } from "@/components/alerta/alerta";

export const metadata = {
  title: "Warrior Esports",
  description: "Warrior Esports",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthContextProvider>
          <AlertProvider>
            <link rel="icon" type="image/x-icon" href="/Logo-Warriors.ico"></link>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
            <Navbar />
            <Alerta/>
            {children}
          </AlertProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
