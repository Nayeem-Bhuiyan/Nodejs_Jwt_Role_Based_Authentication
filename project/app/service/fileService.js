const fs = require('fs');
var path = require('path');
const projectRootDirectory=path.dirname(require.main.filename)   






function getFilesPath(processFile) {
  // read directory
  fs.readdir(projectRootDirectory+'/app/uploads', (error, fileNames) => {
    if (error) throw error;

    fileNames.forEach(filename => {
      // get current file name
      const name = path.parse(filename).name;
      // get current file extension
      const ext = path.parse(filename).ext;
      // get current file path
      const filepath = path.resolve(projectRootDirectory+'/app/uploads/', filename);

      // get information about the file
      fs.stat(filepath, function(error, stat) {
        if (error) throw error;

        // check if the current path is a file or a folder
        const isFile = stat.isFile();

        // exclude folders
        if (isFile) {
          // callback, do something with the file
          processFile(filepath, name, ext, stat);
        }
      });
    });
  });
}

module.exports = {getFilesPath}