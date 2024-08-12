import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import LinkButton from '@/components/LinkButton';

import {
    useUnscrollable,
} from '@/logic/hooks';



export default function CameraContainer({
    cancelText,
    handleImage,
    setShowCamera,
} : {
    cancelText: string;
    handleImage: (dataUri: string) => void;
    setShowCamera: (showCamera: boolean) => void;
}) {
    useUnscrollable();


    return (
        <div
            className={
                'h-dvh p-2 bg-black fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            }
        >
            <div
                className="fixed m-auto top-12 z-40 left-0 right-0 flex justify-center m-4"
            >
                <LinkButton
                    text={cancelText}
                    onClick={() => {
                        setShowCamera(false);
                    }}
                />
            </div>

            <Camera
                onTakePhoto={(dataUri) => {
                    handleImage(dataUri);
                }}
                idealFacingMode="environment"
                isMaxResolution={true}
                isFullscreen={false}
                imageType="png"
                imageCompression={1}
            />
        </div>
    );
}
