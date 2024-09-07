interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen w-full max-w-md flex-col overflow-auto bg-[#f7f7f7] shadow-lg">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
