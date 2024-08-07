import KakaoLogin from '@/components/auth/KakaoLogin';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center text-[#3160D8] mb-8">HelpMeet</h1>
      <KakaoLogin />
    </div>
  );
}
