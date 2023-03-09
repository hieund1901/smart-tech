import { UploadImageType } from './UploadFile';

export const SelectFile = (file: File, currentState: UploadImageType): UploadImageType => {
  return {
    ...currentState,
    currentFile: file,
    previewImage: URL.createObjectURL(file),
    progress: 0,
    message: '',
  };
};

export const createFormData = (data: object): FormData => {
  let formData = new FormData();
  const dataObject = Object.create(data);
  Object.keys(data).forEach((key) => {
    if (key === 'image') {
      formData.append(key, dataObject[key][0] ? dataObject[key][0] : new File([], 'undefined'));
    } else {
      formData.append(key, dataObject[key]);
    }
  });

  return formData;
};
