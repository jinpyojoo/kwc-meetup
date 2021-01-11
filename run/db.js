/*

■----------------------------------------------------------------------------■
  MeetUp WebSite Back-End DB Connection [db.js]									                          	
■----------------------------------------------------------------------------■
                        
  Back-End Developer By Yubin Heo
  Font-End Developer By Jinpyo Joo
  GNU General Public License(GPL) 2.0
  License Is CC-BY-NC

  [ DB Info ]
   - MySQL 5.6
                                                                               
■----------------------------------------------------------------------------■
 
*/

var mysql = require('mysql'); // module import

var conn = mysql.createConnection({
    host     : 'localhost', // mysql host
    user     : 'root', // mysql id
    password : 'rtgroup123456789!', // mysql pwd
    port     : 3306, // mysql port (default 3306)
    database : 'checkup', // database name
    multipleStatements: true
  });
  
module.exports = conn;