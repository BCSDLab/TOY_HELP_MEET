import KakaoAuthButton from '@/components/auth/KakaoAuthButton';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-center text-4xl font-bold text-[#3160D8]">HelpMeet</h1>
      <KakaoAuthButton />
    </div>
  );
}
