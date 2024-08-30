import {
    useGoogleLogin,
    CodeResponse as GoogleCodeResponse,
} from '@react-oauth/google';

import {
    User,

    environment,
} from '@/data';

import {
    googleIcon,
} from '@/data/icons';

import LinkButton from '@/components/LinkButton';

import useStore, {
    useVolatileStore,
} from '@/store';



export default function LoginScreen({
    atLoginSuccess,
} : {
    atLoginSuccess: (data: any) => void;
}) {
    // #region state
    const {
        setUser,
    } = useStore();

    const {
        setShowLoading,
    } = useVolatileStore();
    // #endregion state


    // #region handlers
    const loginSuccess = (
        data: User,
    ) => {
        setUser(data);

        atLoginSuccess(data);
    }

    const googleSuccessLogin = (
        codeResponse: Omit<GoogleCodeResponse, 'error' | 'error_description' | 'error_uri'>,
    ) => {
        setShowLoading(true);

        fetch(environment.API + '/google-login', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(codeResponse),
        })
            .then(async (response) => {
                const request = await response.json();
                setShowLoading(false);

                if (!request || !request.status) {
                    return;
                }

                loginSuccess(request.data);
            })
            .catch((error) => {
                setShowLoading(false);

                console.log('error', error);
            });
    }
    const googleErrorLogin = () => {
        console.log('Login Failed');
    }
    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: (codeResponse) => googleSuccessLogin(codeResponse),
        onError: () => googleErrorLogin(),
    });


    // const appleSuccessLogin = () => {
    //     atLoginSuccess();
    // }
    // const appleErrorLogin = () => {
    //     console.log('Login Failed');
    // }
    // #endregion handlers


    // #region render
    return (
        <>
            <div
                className="m-auto"
            >
                <h1
                    className="text-xl text-center"
                >
                    login
                </h1>
            </div>

            <LinkButton
                text={'with Google'}
                onClick={() => {
                    googleLogin();
                }}
                icon={googleIcon}
            />

            {/* <LinkButton
                text="with Apple"
                onClick={() => {
                    appleSuccessLogin();
                }}
                icon={appleIcon}
            /> */}
        </>
    );
    // #endregion render
}
