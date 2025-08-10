import { useEffect, type JSX } from "react";
import { useLocation, useNavigate, type Location } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta: () => void = () => {
    [
        {
            title: 'Resumind | Auth'
        },
        {
            name: 'description',
            content: 'Log into your Resumind account or create a new one.'
        }
    ]
}

const Auth: () => JSX.Element = () => {
    const { isLoading, auth } = usePuterStore();
    const location: Location<any> = useLocation();
    const next: string = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(next);
        }
    }, [auth.isAuthenticated, next]);
    
    return (
        <main className="bg-[url('images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gridient-border shadow-lg">
                <section className="fle flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>
                            Welcome to Resumind
                        </h1>
                        <h2>
                            Please login to continue your journey.
                        </h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in...</p>
                            </button>) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={auth.signOut}>
                                        <p>
                                            Logout
                                        </p>
                                    </button>
                                ) : (
                                    <button className="auth-button" onClick={auth.signIn}>
                                        <p>
                                            Login in
                                        </p>
                                    </button>
                                )}
                            </>)
                        }
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Auth;