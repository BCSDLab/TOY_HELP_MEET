import { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLoadingComponent } from '@/hooks/useLoading';
import { useAuthStore } from '@/store/authStore';
import { UserDTO } from '@/types';

function getDisplayName<P>(WrappedComponent: ComponentType<P>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

type WithAuthProps = {
  user: UserDTO;
};

// 인증이 필요한 페이지에 사용
// withAuth(Profile)
export default function withAuth<P extends object>(
  WrappedComponent: ComponentType<P & WithAuthProps>
) {
  const WithAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const { user, isAuthenticated, isLoading } = useAuthStore();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.replace('/auth/login');
      }
    }, [isAuthenticated, isLoading, router]);

    useLoadingComponent(isLoading);

    if (!isAuthenticated || !user) {
      return null;
    }

    return <WrappedComponent {...props} user={user} />;
  };

  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuth;
}
