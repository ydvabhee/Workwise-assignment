// redirect to signin page
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function Auth() {
  const router = useRouter();

  // Use useEffect to perform the redirect after component mount
  useEffect(() => {
    router.push('/auth/signin');
  }, [router]);

  // Return null or a loading indicator while redirecting
  return null;
}
