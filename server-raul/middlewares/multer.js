//REVIEW[epic=demo, seq=3] 3. Install Multer npm package in the server folder
//REVIEW[epic=demo, seq=4] 4. Create specific folder for Middlewares and create a file for multer configuration file.

import multer from "multer";
import path from "path";

//REVIEW[epic=demo, seq=5] 5. Create function to define how Multer will work.using its diskstorage method, fileFilter to control which files to accept.
const multerUploads = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      cb(new Error("File extension not supported"), false);
      return;
    }
    cb(null, true);
  },
});

//REVIEW[epic=demo, seq=6] 6. Export the function
export { multerUploads };
