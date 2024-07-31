import { useState, useRef, useEffect, ChangeEvent, useCallback } from 'react';
import {
  CircleStencil,
  CropperPreviewRef,
  FixedCropperRef,
  RectangleStencil,
  StencilComponent,
  CropperPreview,
} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

import {
  Button,
  Cropper,
  DropArea,
  MultiMenuButtonComponent,
} from './CropperComponents';
import {
  CropImage,
  CropShapeType,
  CropStencilSize,
  CropStencilType,
} from './Types';
import {
  Checkbox,
  Field,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';

const stencils: Array<CropStencilType> = [
  {
    name: 'Circle',
    stencil: CircleStencil,
  },
  {
    name: 'Square',
    stencil: RectangleStencil,
  },
];

const stencilSizes = [
  {
    name: '128x128',
    width: 128,
    height: 128,
  },
  {
    name: '256x256',
    width: 256,
    height: 256,
  },
  {
    name: '512x512',
    width: 512,
    height: 512,
  },
];

const previewShapes = [
  {
    name: 'Circle',
    html: 'rounded-full',
  },
  {
    name: 'Square',
    html: '',
  },
];

export default function ImageCropper() {
  const cropperRef = useRef<FixedCropperRef>(null);
  const previewRef = useRef<CropperPreviewRef>(null);
  const previewRef2 = useRef<CropperPreviewRef>(null);
  const previewRef3 = useRef<CropperPreviewRef>(null);
  const previewRef4 = useRef<CropperPreviewRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<CropImage | null>(null);
  const [stencilType, setStencilType] = useState<CropStencilType>(stencils[0]);
  const [stencilSize, setStencilSize] = useState<CropStencilSize>(
    stencilSizes[2],
  );
  const [memStencilSize, setMemStencilSize] = useState<CropStencilSize>(
    stencilSizes[2],
  );
  const [scaleOnSize, setScaleOnSize] = useState<boolean>(false);
  const [checkEnabled, setCheckEnabled] = useState<boolean>(scaleOnSize);
  const [previewShape, setPreviewShape] = useState<CropShapeType>(
    previewShapes[1],
  );

  const onUpload = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const createImage = useCallback((file: File) => {
    const blob = URL.createObjectURL(file);
    setImage({
      name: file.name,
      src: blob,
      type: file.type,
    });
  }, []);

  const onLoadImage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        createImage(file);
      }
      event.target.value = '';
    },
    [createImage],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const onDragDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.items[0].getAsFile();
      if (file) {
        createImage(file);
      }
    },
    [createImage],
  );

  const clearImage = useCallback(() => {
    setImage(null);
  }, []);

  const saveImage = useCallback(() => {
    let canvas: HTMLCanvasElement | null | undefined;

    if (scaleOnSize) {
      canvas = cropperRef.current?.getCanvas({
        maxWidth: stencilSize.width,
        maxHeight: stencilSize.height,
      });
    } else {
      canvas = cropperRef.current?.getCanvas();
    }

    if (canvas && image) {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], image.name, { type: image.type });
          const url = URL.createObjectURL(file);

          const link = document.createElement('a');
          link.href = url;
          link.download = image.name || '';
          link.click();

          URL.revokeObjectURL(url);
        }
      }, image.type);
    }
  }, [image, stencilSize]);

  const onStencilType = useCallback((stencil: StencilComponent) => {
    setStencilType(stencil);
  }, []);

  const onStencil = useCallback((newSize: CropStencilSize) => {
    setStencilSize(newSize);

    setTimeout(() => {
      const element = document.querySelector(
        'div[class="advanced-cropper__background-wrapper"]',
      );
      if (element) {
        ['mousedown', 'mouseup'].forEach((mouseEventType) =>
          element.dispatchEvent(
            new MouseEvent(mouseEventType, {
              view: window,
              bubbles: true,
              cancelable: true,
              buttons: 1,
            }),
          ),
        );
      }
    }, 0);
  }, []);

  const onCheckSave = useCallback(() => {
    const newEnabled = !checkEnabled;
    setCheckEnabled(newEnabled);
    setScaleOnSize(newEnabled);

    if (!newEnabled) {
      setMemStencilSize(stencilSize);
      onStencil(stencilSizes[2]);
    } else {
      onStencil(memStencilSize);
    }
  }, [checkEnabled, memStencilSize, stencilSize]);

  const onShape = useCallback((newShape: CropShapeType) => {
    setPreviewShape(newShape);
  }, []);

  const onUpdate = (cropper: FixedCropperRef) => {
    previewRef.current?.update(cropper);
    previewRef2.current?.update(cropper);
    previewRef3.current?.update(cropper);
    previewRef4.current?.update(cropper);
  };

  useEffect(() => {
    return () => {
      if (image && image.src) {
        URL.revokeObjectURL(image.src);
      }
    };
  }, [image]);

  return (
    <div className="relative top-24 flex flex-col items-center">
      <div className="mb-4 flex flex-row items-center gap-3">
        <Button disabled={!image} onClick={clearImage} color="red">
          Clear Image
        </Button>
        <Button disabled={!image} onClick={saveImage} color="green">
          Save Image
        </Button>

        <Menu as="div" className="relative inline-block text-left">
          <MenuButton
            disabled={!image}
            className="disabled:brightness-50 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset hover:bg-gray-900 hover:text-white"
          >
            Stencil Options
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-600 rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MultiMenuButtonComponent
                disabled={false}
                buttonText="Stencils"
                options={stencils}
                checkVariable={stencilType}
                onClick={onStencilType}
              />

              <MultiMenuButtonComponent
                disabled={!scaleOnSize}
                buttonText="Sizes"
                options={stencilSizes}
                checkVariable={stencilSize}
                onClick={onStencil}
              />
            </div>

            <div className="py-1">
              <Field
                onClick={onCheckSave}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left cursor-pointer text-gray-700 dark:text-slate-300 hover:bg-slate-500 hover:text-gray-200"
              >
                <Checkbox
                  checked={checkEnabled}
                  onChange={onCheckSave}
                  className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                >
                  <svg
                    className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Checkbox>
                <p>
                  <span className="text-green-500">Save</span> Uses Stencil Size
                </p>
              </Field>
            </div>
          </MenuItems>
        </Menu>

        <Menu as="div" className="relative inline-block text-left">
          <MenuButton
            disabled={!image}
            className="disabled:brightness-50 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset hover:bg-gray-900 hover:text-white"
          >
            Preview Options
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-600 rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MultiMenuButtonComponent
                disabled={!image}
                buttonText="Shape"
                options={previewShapes}
                checkVariable={previewShape}
                onClick={onShape}
              />
            </div>
          </MenuItems>
        </Menu>
      </div>

      <div className="w-[80vw] h-[75vh]">
        <DropArea
          onDragDrop={onDragDrop}
          onDragOver={onDragOver}
          image={image}
          onUpload={onUpload}
          onLoadImage={onLoadImage}
          inputRef={inputRef}
        />

        <div
          className={`${image ? '' : 'hidden'} relative
flex flex-row gap-5`}
        >
          <div className="w-2/3">
            <Cropper
              image={image}
              size={stencilSize}
              stencil={stencilType}
              cropperRef={cropperRef}
              onUpdate={onUpdate}
              className={''}
            />
          </div>

          <div className="w-1/3 flex flex-wrap items-end gap-3">
            <CropperPreview
              ref={previewRef}
              className={`${previewShape.html} w-[400px] h-[400px]`}
            />
            <CropperPreview
              ref={previewRef2}
              className={`${previewShape.html} w-32 h-32`}
            />
            <CropperPreview
              ref={previewRef3}
              className={`${previewShape.html} w-16 h-16`}
            />
            <CropperPreview
              ref={previewRef4}
              className={`${previewShape.html} w-8 h-8`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
