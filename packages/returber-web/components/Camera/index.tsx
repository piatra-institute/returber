import { Tensor } from 'onnxruntime-web';
import ndarray from 'ndarray';
import ops from 'ndarray-ops';

import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import LinkButton from '@/components/LinkButton';

import {
    useUnscrollable,
} from '@/logic/hooks';

import yoloClasses from '@/data/yoloClasses';
import * as runModelUtils from '@/logic/yolo/runModel';



export default function CameraContainer({
    cancelText,
    handleImage,
    setShowCamera,
    setReturnables,
} : {
    cancelText: string;
    handleImage: (dataUri: string) => void;
    setShowCamera: (showCamera: boolean) => void;
    setReturnables: (returnables: number) => void;
}) {
    useUnscrollable();


    const analyzeImage = async (dataUri: string) => {
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


        let returnables = 0;
        for (let i = 0; i < outputTensor.dims[0]; i++) {
            const result = outputTensor.data.slice(
                i * 7,
                i * 7 + 7
            );
            const cls_id = result[5] as string;
            const label =  (yoloClasses as any)[cls_id];
            if (label === 'bottle') {
                returnables += 1;
            }
        }


        setReturnables(returnables);
    }


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
