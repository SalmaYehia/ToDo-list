var http = require ('http');
var fs = require('fs');
var express = require('express');

/*function send404Response(response){
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Error 404 - Page not found");
    response.end();
}

function onRequest(request, response) {

    if( request.method == 'GET' && request.url == '/' ){
        response.writeHead(200, {"Content-Type": "text/html"});
        //Open file as readable stream, pipe stream to response object
        fs.createReadStream("./bbb.html").pipe(response);
    }else{
        send404Response(response);
    }

}*/
function onRequest(req, res) {
  console.log("the user made a request: "+req.url);
  res.writeHead(200, {"Context-Type":"text/html"});
//  res.write("here is the data ");
 //fs.createReadStream("D:/html css/node/bbb.html").pipe(res);
  console.log("\n *STARTING* \n");
// Get content from file
  var contents = fs.readFileSync("videodata.json");
// Define to JSON type
  var jsonContent = JSON.parse(contents);
// Get Value from JSON
console.log("Password:", jsonContent.categoryName);
console.log("\n *EXIT* \n");
res.write(jsonContent.categories[0].categoryID);
jsonContent.categories.push(  {
    "categoryID": "salmaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "parentID": "000",
    "subjectID": "0",
    "categoryName": "c at e g o ry na m e",
    "categoryDescription": "just trying dont do that again salma ",
    "videosCount": "9876",
    "forumCategoryID": "12345"
  });
  res.write(jsonContent.categories[jsonContent.categories.length-1].categoryID+"\n");
jsonContent.categories[jsonContent.categories.length-1].categoryID = "nooooooooooo";
res.write(jsonContent.categories[jsonContent.categories.length-1].categoryID);

 res.end();

}
http.createServer(onRequest).listen(8888);

console.log("hello world salmaaaaaaaaaaa");
