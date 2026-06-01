import { Column } from "@once-ui-system/core";
import { Footer, Header } from "@/components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Column fillWidth horizontal="center" style={{minHeight: "100vh"}}>
      <Header />
      <Column fillWidth flex={1}>
        {children}
      </Column>
      <Footer />
    </Column>
  );
}