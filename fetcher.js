const request = require('request');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require('fs')
const [ url, path ] = process.argv.slice(2, 4);

//enter below into console to run app:
//node fetcher.js http://www.example.edu/ ./index.html

//download file function
const download = (url, path, cb) => {

  // fetch remote content function
  request(url, (error, response, body) => {
    //  console.log("body top funct: ", bodytext);

    if (error !== null) {
      console.log('error:', error); // Print the error if one occurred
    }
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.

    //check for valid URL
    if (response.statusCode != 200) {
      console.log('invalid URL provided');
      return
    }

    //check if file 
    if (fs.existsSync(path)) {
      rl.question(`File "${path}" already exists | "y"-override OR "n"-exit | hit enter `, (answer) => {
          console.log('answer: ', answer == 'n' ? 'no' : 'yes, writing file..');
          if (answer == 'y') {
            if (body) {
              cb(body);
            } else { console.log('no remote data received'); }       
          } else {
            console.log('app closed.');
            process.exit();
          }
      });
    } else {
      if (body) {
        cb(body);
      } else { console.log('no remote data received'); }  
    }

  //  nested function test:  
/*     function a(body) {
      console.log('body from a() funct: ', body);
    }
    a(body);
 */ 
    //write in to the file

  }); // closing request()
} // closing download()

  //Write file function
  const write = (body) => {
    // console.log("body from write() funct: ", body);
    fs.writeFile(path, body, err => {
      if (err) {
        console.error(err);
      }
      console.log("The file was saved!");
    });
  }; // closing write()

download(url, path, write);
