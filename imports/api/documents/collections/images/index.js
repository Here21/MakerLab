import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';

const Images = new FilesCollection({
  storagePath: `${Meteor.settings.storagePath}/images`,
  debug: true,
  collectionName: 'Images',
  allowClientCode: true, // Disallow remove files from Client
  onBeforeUpload: (file) => {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 20 && /png|jpe?g/i.test(file.extension)) {
      return true;
    }
    return 'Please upload image, with size equal or less than 10MB';
  },
});

export default Images;
