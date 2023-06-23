# RecordsTodos

After doing npm install please change this code in node modules


It appears in \node_modules\metro-config\src\defaults\blacklist.js, there is an invalid regular expression that needed changed. I changed the first expression under sharedBlacklist from:

From :
var sharedBlacklist = [
  /node_modules[/\\]react[/\\]dist[/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];

To:
var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
