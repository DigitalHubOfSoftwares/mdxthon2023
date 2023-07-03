import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuthProtection = (WrappedComponent, redirectTo = "/auth/signin") => {
	const WithAuthProtection = (props) => {
	  const { status, data: session } = useSession();
	  const isUser = !!session?.user;
	  const isLoading = status === "loading";
	  const router = useRouter();
  
	  useEffect(() => {
		if (!redirectTo || isLoading) return;
		if (!isUser) router.push(redirectTo);
	  }, [isUser, isLoading, router]);
  
	  return <WrappedComponent {...props} />;
	};
  
	WithAuthProtection.displayName = `WithAuthProtection(${getDisplayName(WrappedComponent)})`;
  
	return WithAuthProtection;
};
  
function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuthProtection;