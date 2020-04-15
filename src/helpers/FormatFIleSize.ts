export const formatFileSize = (bytes: number, decimalPoint = 1) => {
  if (bytes == 0) return '0 Bytes';
  var k = 1000,
    dm = decimalPoint || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};


// export const downloadFile1 = (fileURL:any, fileName:any) =>{
// // for non-IE
// if (!window.ActiveXObject) {
//   var save = document.createElement('a');
//   save.href = fileURL;
//   save.target = '_blank';
//   var filename = fileURL.substring(fileURL.lastIndexOf('/')+1);
//   save.download = fileName || filename;
//    if ( navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
//   document.location = save.href; 
// // window event not working here
// }else{
//       var evt = new MouseEvent('click', {
//           'view': window,
//           'bubbles': true,
//           'cancelable': false
//       });
//       save.dispatchEvent(evt);
//       (window.URL || window.webkitURL).revokeObjectURL(save.href);
// }	
// }

// // for IE < 11
// else if ( !! window.ActiveXObject && document.execCommand)     {
//   var _window = window.open(fileURL, '_blank');
//   _window.document.close();
//   _window.document.execCommand('SaveAs', true, fileName || fileURL)
//   _window.close();
// }
// }

export const downloadFile =(uri:any, text:any) =>{
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}