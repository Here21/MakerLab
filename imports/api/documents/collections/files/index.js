import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';

const Files = new FilesCollection({
  storagePath: Meteor.settings.storagePath,
  debug: true,
  collectionName: 'Files',
  allowClientCode: true, // Disallow remove files from Client
  onBeforeUpload: (file) => {
    // Allow upload files under 30MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 30) {
      return true;
    }
    return 'Please upload image, with size equal or less than 10MB';
  },
});

export default Files;
