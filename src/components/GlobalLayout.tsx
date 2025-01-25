import Footer from './Footer';
import NavigationBar from './Navigation';

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
}
