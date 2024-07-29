import BottomNavigation from '@/components/Layout/BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full max-w-md min-h-screen flex flex-col bg-[#f6f6f6] shadow-lg overflow-auto">
      <main className="flex-grow pb-14">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
}
