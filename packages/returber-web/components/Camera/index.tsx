import { Tensor } from 'onnxruntime-web';
import ndarray from 'ndarray';
import ops from 'ndarray-ops';

import {
    useState,
    useEffect,
} from 'react';

import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import LinkButton from '@/components/LinkButton';

import {
    useUnscrollable,
} from '@/logic/hooks';

import * as runModelUtils from '@/logic/yolo/runModel';



export default function CameraContainer({
    cameraLoaded,
    cancelText,
    cancelAction,
    handleImage,
    handleImageAnalysis,
} : {
    cameraLoaded: boolean;
    cancelText: string;
    cancelAction: () => void;
    handleImage: (dataUri: string) => void;
    handleImageAnalysis?: (tensor: Tensor) => void;
}) {
    useUnscrollable();

    const [
        loaded,
        setLoaded,
    ] = useState(false);


    const analyzeImage = async (dataUri: string) => {
        if (!handleImageAnalysis) {
            return;
        }

        // const modelResolution = [256, 256];
        // const modelName = 'yolov7-tiny_256x256.onnx';

        const modelResolution = [640, 640];
        const modelName = 'yolov7-tiny_640x640.onnx';


        const loadImage = (src: string): Promise<HTMLImageElement> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = (err) => reject(err);
                img.src = src;
            });
        };

        const img = await loadImage(dataUri);
        const canvas = document.createElement('canvas');

        canvas.width = modelResolution[0];
        canvas.height = modelResolution[1];

        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, modelResolution[0], modelResolution[1]);

        const imageData = ctx.getImageData(
            0,
            0,
            modelResolution[0],
            modelResolution[1],
        );
        const { data, width, height } = imageData;


        // data processing
        const dataTensor = ndarray(new Float32Array(data), [width, height, 4]);
        const dataProcessedTensor = ndarray(new Float32Array(width * height * 3), [
            1,
            3,
            width,
            height,
        ]);

        ops.assign(
            dataProcessedTensor.pick(0, 0, null, null),
            dataTensor.pick(null, null, 0)
        );
        ops.assign(
            dataProcessedTensor.pick(0, 1, null, null),
            dataTensor.pick(null, null, 1)
        );
        ops.assign(
            dataProcessedTensor.pick(0, 2, null, null),
            dataTensor.pick(null, null, 2)
        );

        ops.divseq(dataProcessedTensor, 255);

        const tensor = new Tensor("float32", new Float32Array(width * height * 3), [
            1,
            3,
            width,
            height,
        ]);

        (tensor.data as Float32Array).set(dataProcessedTensor.data);


        const session = await runModelUtils.createModelCpu(
            `/models/${modelName}`,
        );


        let outputTensor: Tensor;
        let inferenceTime: number;
        [outputTensor, inferenceTime] = await runModelUtils.runModel(
            session,
            tensor,
        );

        handleImageAnalysis(outputTensor);
    }


    useEffect(() => {
        const load = async () => {
            if (cameraLoaded) {
                setLoaded(true);
                return;
            }

            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 1500);
            });

            setLoaded(true);
        }

        load();
    }, [
        cameraLoaded,
    ]);


    return (
        <div
            className={
                'h-dvh p-2 bg-black fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            }
            style={{
                position: loaded ? 'fixed' : 'absolute',
                top: loaded ? '0' : '-10000px',
                left: loaded ? '0' : '-10000px',
                right: loaded ? '0' : '10000px',
                bottom: loaded ? '0' : '10000px',
            }}
        >
            <div
                className="fixed m-auto top-12 left-0 right-0 flex justify-center m-4 z-40"
            >
                <LinkButton
                    text={cancelText}
                    onClick={() => {
                        cancelAction();
                    }}
                />
            </div>

            <Camera
                onTakePhoto={(dataUri) => {
                    analyzeImage(dataUri);
                    handleImage(dataUri);
                }}
                imageType="png"
                imageCompression={1}
                idealFacingMode="environment"
                isMaxResolution={true}
                isFullscreen={false}
                isSilentMode={true}
                sizeFactor={0.5}
            />
        </div>
    );
}
