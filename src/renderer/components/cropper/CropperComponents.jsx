import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import checkIcon from '../../../../assets/other/check.svg';
import {
  FixedCropper,
  ImageRestriction,
  StencilComponent,
} from 'react-advanced-cropper';

export const Button = ({ disabled, onClick, color, children }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`${disabled ? 'brightness-50' : `hover:bg-${color}-500`} rounded-md bg-${color}-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
  >
    {children}
  </button>
);

export const MenuComponent = ({
  disabled,
  title,
  options,
  onClick,
  checkVariable,
}) => (
  <Menu as="div" className="relative inline-block text-left">
    <div>
      <MenuButton
        disabled={disabled}
        className={` ${disabled ? 'brightness-50' : ''} inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
      >
        {title}
      </MenuButton>
    </div>

    <MenuItems
      transition
      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    >
      <div className="py-1">
        {options.map((option, index) => (
          <MenuItem key={index}>
            <button
              onClick={() => onClick(option)}
              className="w-full block px-4 py-2.5 text-sm text-left text-gray-700 dark:text-slate-300 data-[focus]:bg-slate-500 data-[focus]:text-gray-200"
            >
              <p className="inline-block m-0">{option.name}</p>
              {checkVariable.name === option.name && (
                <img className="inline" src={checkIcon} />
              )}
            </button>
          </MenuItem>
        ))}
      </div>
    </MenuItems>
  </Menu>
);

export const DropArea = ({
  onDragDrop,
  onDragOver,
  image,
  onUpload,
  onLoadImage,
  inputRef,
}) => (
  <div
    onDrop={onDragDrop}
    onDragOver={onDragOver}
    className={`w-full h-full ${image ? 'hidden' : ''} dark:bg-slate-800 outline-dashed`}
  >
    <UploadButton
      onLoadImage={onLoadImage}
      onClick={onUpload}
      inputRef={inputRef}
    />
  </div>
);

export const UploadButton = ({ onClick, onLoadImage, inputRef }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    Upload Image
    <input
      ref={inputRef}
      type="file"
      onChange={onLoadImage}
      className="hidden"
    />
  </button>
);

export const Cropper = ({ className, image, size, stencil, cropperRef }) => (
  <FixedCropper
    className={className}
    ref={cropperRef}
    src={image && image.src}
    autoReconcileState={true}
    stencilSize={{
      width: size.width,
      height: size.height,
    }}
    stencilProps={{
      handlers: false,
      lines: false,
      movable: false,
      resizable: false,
    }}
    stencilComponent={stencil?.stencil}
    imageRestriction={ImageRestriction.stencil}
  />
);
