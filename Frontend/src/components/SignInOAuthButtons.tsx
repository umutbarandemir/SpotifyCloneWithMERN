import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
	const { signIn, isLoaded } = useSignIn();

	if (!isLoaded) {
		return null;
	}

	const signInWithGoogle = () => { // Redirect to Google OAuth
		signIn.authenticateWithRedirect({
			strategy: "oauth_google", // The OAuth strategy to use
			redirectUrl: "/sso-callback", // This is the URL where the user will be redirected after authentication
			redirectUrlComplete: "/auth-callback", // This is the URL where the user will be redirected after authentication
		});
	};

	return (
		<Button onClick={signInWithGoogle} variant={"secondary"} className='w-full text-white border-zinc-200 h-11 hover:cursor-pointer'>
			<img src='/google.png' alt='Google' className='size-5' />
			Continue with Google
		</Button>
	);
};
export default SignInOAuthButtons;