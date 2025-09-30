import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { GameProvider } from "@/contexts/GameContext";

export const metadata: Metadata = {
  title: "Escape do Vício - Jogo Educativo Interativo",
  description: "Um site educativo interativo para conscientizar sobre os perigos dos cigarros eletrônicos, direcionado a adolescentes e crianças.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased font-sans">
        <LanguageProvider>
          <GameProvider>
            {children}
          </GameProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
