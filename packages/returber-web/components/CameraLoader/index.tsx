'use client';

import {
    useContext,
    useState,
    useEffect,
} from 'react';

import type { Tensor } from 'onnxruntime-web';

import {
    LanguageContext,
} from '@/app/context';

import {
    localization,
} from '@/data/index';

import Camera from '@/components/Camera';



export default function CameraLoader({
    image,
    setImage,
    setLocation,
    handleImageAnalysis,
} : {
    image: string | null;
    setImage: React.Dispatch<React.SetStateAction<string | null>>;
    setLocation: React.Dispatch<React.SetStateAction<GeolocationCoordinates | null>>;
    handleImageAnalysis?: (tensor: Tensor) => void;
}) {
    const {
        language,
    } = useContext(LanguageContext);


    const [
        showCamera,
        setShowCamera,
    ] = useState(false);

    // Only wait for camera loading once.
    const [
        cameraLoaded,
        setCameraLoaded,
    ] = useState(false);

    const [
        showLoadingCamera,
        setShowLoadingCamera,
    ] = useState(false);


    useEffect(() => {
        if (!image) {
            return;
        }

        const loadLocation = async () => {
            window.navigator.geolocation.getCurrentPosition((data) => {
                setLocation(data.coords);
            });
        }

        loadLocation();
    }, [
        image,
        setLocation,
    ]);


    return (
        <>
            {!image
            && !showLoadingCamera
            && (
                <div
                    className="grid place-content-center h-dvh"
                >
                    <button
                        className="min-w-[310px] lg:min-w-[400px] lg:text-3xl font-bold select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                        onClick={() => {
                            setShowLoadingCamera(true);
                            setShowCamera(true);
                        }}
                    >
                        {localization[language].callPictureReturnables}
                    </button>
                </div>
            )}

            {showCamera && (
                <Camera
                    cameraLoaded={cameraLoaded}
                    cancelText={localization[language].cancel}
                    cancelAction={() => {
                        setShowLoadingCamera(false);
                        setShowCamera(false);

                        setCameraLoaded(true);
                    }}
                    handleImage={(image) => {
                        setImage(image);

                        setShowLoadingCamera(false);
                        setShowCamera(false);

                        setCameraLoaded(true);
                    }}
                    handleImageAnalysis={handleImageAnalysis}
                />
            )}

            {showLoadingCamera && (
                <div
                    className="grid place-content-center"
                >
                    <div
                        className="mt-4 animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-300"
                    />
                </div>
            )}
        </>
    );
}
