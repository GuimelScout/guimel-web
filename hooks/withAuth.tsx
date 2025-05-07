import { ComponentType, FC } from 'react';
import { useUser } from 'context/UserContext';
import { useRouter } from 'next/navigation';
import { RouteGuimel } from '@/routers/routes';

export function withAuth<P extends JSX.IntrinsicAttributes>(WrappedComponent: ComponentType<P>): FC<P> {
  return function WithAuthWrapper(props: P) {
    const { user, loading } = useUser();
    const router = useRouter();

    if (loading) return null;

    if (!user) {
      router.push(RouteGuimel.home);
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}