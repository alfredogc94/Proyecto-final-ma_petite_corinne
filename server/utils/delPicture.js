import fs from 'fs';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url))

export const deleteFile = (file) => {
  const filePath = path.join(__dirname, "../public/images/products", file)
  fs.unlink(filePath, (error)=>{
    if (error) {
      return error
    } else {
      return 
    }
  })
}

