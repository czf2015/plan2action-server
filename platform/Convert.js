const msopdf = require('node-msoffice-pdf');

function office2pdf(input, output, type) {
  msopdf(null, (err, office)  => {
    if (err) { 
      console.log("Init failed", error);
      return;
    }
    //转化word文档为pdf
    if (type == "doc" || type == "docx") {
      office.word({input: input, output: output}, (err, pdf) => {
        if (err) {
          console.log(err);
        }
      })
    }
    //转excel文档为pdf
    else if (type == "xls") {
      office.excel({input: input, output: output}, (err, pdf) => {
        if (err) {
          console.log(err);
        }
      })
    }
    office.close(null);
  })
}


