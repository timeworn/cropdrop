import { StencilComponent } from 'react-advanced-cropper';

export interface CropImage {
  name: string;
  type?: string;
  src: string;
}

export interface CropStencilSize {
  name: string;
  width: number;
  height: number;
}

export interface CropStencilType {
  name: string;
  stencil?: StencilComponent;
  menuType?: string;
  menuDefaultValue?: any;
}

export interface CropMenuOptions {
  name: string;
  methodName: string;
  method?: () => void;
  disableVariableName?: string;
  disableVariable?: any;
  checkVariableName: string;
  checkVariable?: any;
  values: Array<CropStencilType | CropStencilSize>;
}

export type CropMenuProps = {
  image: CropImage | null;
  buttonText: string;
  options: Array<CropMenuOptions>;
  customHtml?: any;
};

export type CropMultiMenuProps = {
  disabled: boolean;
  buttonText: string;
  options: Array<CropStencilType | CropStencilSize>;
  onClick?: (option: any) => void;
  checkVariable?: CropStencilType | CropStencilSize;
};

export interface CropShapeType {
  name: string;
  html: string;
}

export interface CropPreviewType {
  name: string;
  html: string;
}

export type CropButtonProps = {
  onClick: () => void;
  color: 'red' | 'green';
  children: React.ReactNode;
};

export type CropDropAreaProps = {
  onDragDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  image: CropImage | null;
  onUpload: () => void;
  onLoadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export type CropUploadButtonProps = {
  onClick?: () => void;
  onLoadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export type CropperProps = {
  className: string;
  image: { src: string } | null;
  size: { width: number; height: number };
  stencil: CropStencilType | null;
  cropperRef: React.RefObject<any>;
  onUpdate: (any: any) => void;
};
