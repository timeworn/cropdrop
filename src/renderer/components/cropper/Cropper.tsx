import { useState, useRef, useEffect, ChangeEvent, useCallback } from 'react';
import {
  CircleStencil,
  FixedCropperRef,
  RectangleStencil,
  StencilComponent,
} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

import { Button, Cropper, DropArea, MenuComponent } from './CropperComponents';

interface Image {
  name: string;
  type?: string;
  src: string;
}

interface StencilSize {
  name: string;
  width: number;
  height: number;
}

interface StencilType {
  name: string;
  stencil: StencilComponent;
}

const stencils = [
  {
    name: 'Circle',
    stencil: CircleStencil,
  },
  {
    name: 'Square',
    stencil: RectangleStencil,
  },
];

const stencilSize = [
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

export default function ImageCropper() {
  const cropperRef = useRef<FixedCropperRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<Image | null>(null);
  const [stencil, setStencil] = useState<StencilType | null>(stencils[0]);
  const [size, setStencilSize] = useState<StencilSize>(stencilSize[2]);

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
    const canvas = cropperRef.current?.getCanvas();
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
  }, [image]);

  const onOption = useCallback((stencil: StencilComponent) => {
    setStencil(stencil);
  }, []);

  const onStencil = useCallback((newSize: StencilSize) => {
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
        <MenuComponent
          disabled={!image}
          title="Stencil"
          options={stencils}
          onClick={onOption}
          checkVariable={stencil}
        />
        <MenuComponent
          disabled={!image}
          title="Stencil Size"
          options={stencilSize}
          onClick={onStencil}
          checkVariable={size}
        />
      </div>

      <div className="w-[75vw] h-[75vh]">
        <DropArea
          onDragDrop={onDragDrop}
          onDragOver={onDragOver}
          image={image}
          onUpload={onUpload}
          onLoadImage={onLoadImage}
          inputRef={inputRef}
        />
        <Cropper
          className={image ? '' : 'h-0'}
          image={image}
          size={size}
          stencil={stencil}
          cropperRef={cropperRef}
        />
      </div>
    </div>
  );
}
