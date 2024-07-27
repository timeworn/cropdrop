import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  CircleStencil,
  FixedCropper,
  FixedCropperRef,
  ImageRestriction,
  RectangleStencil,
  StencilComponent,
} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

interface Image {
  name: string;
  type?: string;
  src: string;
}

const options = [
  {
    name: 'Circle',
    value: CircleStencil,
  },
  {
    name: 'Square',
    value: RectangleStencil,
  },
];

export default function ImageCropper() {
  const cropperRef = useRef<FixedCropperRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<Image | null>(null);
  const [stencil, setStencil] = useState<StencilComponent | null>(
    CircleStencil,
  );

  const onUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files[0]) {
      const blob = URL.createObjectURL(files[0]);
      setImage({
        name: files[0].name,
        src: blob,
        type: files[0].type,
      });
    }
    event.target.value = '';
  };

  const clearImage = () => {
    setImage(null);
  };

  const saveImage = () => {
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
  };

  const onOption = (stencil: StencilComponent) => {
    setStencil(stencil);
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
        <button
          onClick={onUpload}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Upload Image
          <input
            ref={inputRef}
            type="file"
            onChange={onLoadImage}
            className="hidden"
          />
        </button>

        <button
          disabled={!image}
          onClick={clearImage}
          className={`${!image ? 'brightness-50' : 'hover:bg-red-500'} rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
        >
          Clear Image
        </button>

        <button
          disabled={!image}
          onClick={saveImage}
          className={`${!image ? 'brightness-50' : 'hover:bg-green-500'} rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
        >
          Save Image
        </button>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Options
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              {options.map((option, index) => (
                <MenuItem key={index}>
                  <button
                    onClick={() => onOption(option.value)}
                    className="w-full block px-4 py-2.5 text-sm text-left text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    {option.name}
                  </button>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>
      </div>

      <div id="cropper">
        <FixedCropper
          ref={cropperRef}
          className="w-[75vw] h-[75vh]"
          src={image && image.src}
          stencilSize={{
            width: 512,
            height: 512,
          }}
          stencilProps={{
            handlers: false,
            lines: false,
            movable: false,
            resizable: false,
          }}
          stencilComponent={stencil}
          imageRestriction={ImageRestriction.stencil}
        />
      </div>
    </div>
  );
}
