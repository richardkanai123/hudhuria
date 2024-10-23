interface CloudinaryUploadWidgetResult {
  event: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: any;
}

interface CloudinaryUploadWidget {
  open(): void;
  close(): void;
  destroy(): void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cloudinary: any;
  }
}
