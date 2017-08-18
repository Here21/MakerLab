import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';

// TODO: 目录管理，按照登录用户的userId去分类
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
    return 'Please upload file, with size equal or less than 30MB';
  },
});

export default Files;
