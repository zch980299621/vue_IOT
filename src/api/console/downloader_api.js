import { axios} from '../config.js';

class DownloaderService {
      downloadFile(filepath, newfilename) {
        if (!newfilename) {
          newfilename = this.getFileName(filepath);
         }
         return axios.get(filepath, {responseType: 'blob'}).then(results =>{
           const link = document.createElement('a');
           const blob = new Blob([results], {type: 'application/octet-stream'});
           const objectUrl = window.URL.createObjectURL(blob);
           link.setAttribute('href', objectUrl);
           link.setAttribute('download', newfilename);
           link.style.visibility = 'hidden';
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);
           URL.revokeObjectURL(objectUrl);
         }).catch(err =>{
           // 弹出全局提示条
           this.$message({ message: '下载失败', type: 'warning'})
         })
    }
    //获取文件名带后缀
  getFileName(file) {
    const pos = file.lastIndexOf('/') * 1;
    return file.substring(pos + 1);
  }
  getFileSuffix(file) {
    return file.substring(file.lastIndexOf('.') + 1, file.length); // 后缀名
  }

}
export default new DownloaderService()
