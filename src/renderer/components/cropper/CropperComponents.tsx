import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import checkIcon from '../../../../assets/other/check.svg';
import { FixedCropper, ImageRestriction } from 'react-advanced-cropper';
import {
  CropButtonProps,
  CropDropAreaProps,
  CropMenuProps,
  CropMultiMenuProps,
  CropperProps,
  CropUploadButtonProps,
} from './Types';

const colorClasses = {
  red: {
    base: 'bg-red-600',
    hover: 'hover:bg-red-500',
  },
  green: {
    base: 'bg-green-600',
    hover: 'hover:bg-green-500',
  },
};

export const Button = ({ onClick, color, children }: CropButtonProps) => {
  const colorClass = colorClasses[color] || colorClasses.red;

  return (
    <button
      onClick={onClick}
      className={`${colorClass.base} rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-110`}
    >
      {children}
    </button>
  );
};

export const DropArea = ({
  onDragDrop,
  onDragOver,
  image,
  onUpload,
  onLoadImage,
  inputRef,
}: CropDropAreaProps) => (
  <div
    onDrop={onDragDrop}
    onDragOver={onDragOver}
    className={`w-full h-screen ${image ? 'hidden' : ''} dark:bg-slate-800 flex flex-col justify-center items-center`}
  >
    <UploadButton
      onLoadImage={onLoadImage}
      onClick={onUpload}
      inputRef={inputRef}
    />
    <p>or drop an image here</p>
  </div>
);

export const UploadButton = ({
  onClick,
  onLoadImage,
  inputRef,
}: CropUploadButtonProps) => (
  <button
    onClick={onClick}
    className="w-2/12 rounded-md bg-indigo-600 px-3.5 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

export const Cropper = ({
  className,
  image,
  size,
  stencil,
  cropperRef,
  onUpdate,
}: CropperProps) => (
  <FixedCropper
    className={className}
    ref={cropperRef}
    src={image && image.src}
    onUpdate={onUpdate}
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

export const MenuComponent = ({
  image,
  buttonText,
  options,
  customHtml,
}: CropMenuProps) => (
  <Menu as="div" className="relative inline-block text-left">
    <MenuButton
      disabled={!image}
      className="disabled:brightness-50 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      {buttonText}
    </MenuButton>
    <MenuItems
      transition
      className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-600 rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    >
      <div className="py-1">
        {options.map((value, index) => (
          <MultiMenuButtonComponent
            key={index}
            disabled={!image}
            buttonText={value.name}
            options={value.values}
            checkVariable={value.checkVariable}
            onClick={value.method}
          />
        ))}
      </div>

      {customHtml}
    </MenuItems>
  </Menu>
);

export const MultiMenuButtonComponent = ({
  disabled,
  buttonText,
  options,
  checkVariable,
  onClick,
}: CropMultiMenuProps) => (
  <Menu as="div" className="relative inline-block text-left w-full">
    <MenuButton
      disabled={disabled}
      className="w-full disabled:brightness-50 block px-4 py-2.5 text-sm text-left text-gray-700 dark:text-slate-300 hover:bg-slate-500 hover:text-gray-200"
    >
      {buttonText}
    </MenuButton>
    <MenuItems
      transition
      className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-600 rounded-md bg-white dark:bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    >
      <div className="py-1">
        {options.map((option) => (
          <MenuItem key={option.name}>
            <button
              onClick={() => (onClick ? onClick(option) : null)}
              className="w-full block px-4 py-2.5 text-sm text-left text-gray-700 dark:text-slate-300 data-[focus]:bg-slate-500 data-[focus]:text-gray-200"
            >
              <p className="inline-block m-0">{option.name}</p>
              {checkVariable?.name === option.name && (
                <img
                  className="relative inline left-1 w-4 h-4"
                  src={checkIcon}
                />
              )}
            </button>
          </MenuItem>
        ))}
      </div>
    </MenuItems>
  </Menu>
);
