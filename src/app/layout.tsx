import LayoutProvider from "@/components/LayoutProvider";
import ReduxProvider from "@/components/ReduxProvider";
import "./globals.css";
import "./../stylesheets/commonClasses.css";
import "./../stylesheets/antdOverride.css";
import "./../stylesheets/layout.css";
import "./../stylesheets/loader.css";

export const metadata = {
  title: "Job Application",
  description: "Job Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <LayoutProvider>{children}</LayoutProvider>
      {/* {children} */}
    </ReduxProvider>
  );
}
