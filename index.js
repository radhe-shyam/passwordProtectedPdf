const PdfReader = require("pdfreader").PdfReader;

const readPasswordProtectedPdfFile = async (filename, password) => {
  return new Promise((resolve, reject) => {
    new PdfReader({ password}).parseFileItems(
      filename,
      function (err, item) {
        if (err) {
          // console.error("Error:", err);
          resolve('fail')
        } else if (!item) {
          // console.log("End of file");
          resolve('fail');
        } else if (item.text) {
          // console.log(item.text);
          resolve('success');
        }
      }
    );
  });
}
(async () => {
  for (let i = 0; i < 10000; i++) {
    const guess = i.toFixed().padStart(4, 0);
    const password = `435${guess}8784`
    console.log('Trying:', password);
    const result = await readPasswordProtectedPdfFile('sc.pdf', password)
    if (result === 'success') {
      console.log('Found the password:', password);
      break;
    }
  }
})();
