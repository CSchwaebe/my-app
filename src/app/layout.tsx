// Imports
// ========================================================
import Providers from "./providers";
import './globals.css';
import Header from "./components/header";
import Container from "./components/mainContainer";
import '@rainbow-me/rainbowkit/styles.css';

// Layout
// ========================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body className="bg-zinc-900">
          <Providers>
          <Header />
          <Container>
            {children}
          </Container>
          </Providers>
      </body>
    </html>
  )
};

