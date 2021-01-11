/*

■----------------------------------------------------------------------------■
  MeetUp WebSite Back-End [index.js]									                          	
■----------------------------------------------------------------------------■
                        
  Back-End Developer By Yubin Heo
  Font-End Developer By Jinpyo Joo
  GNU General Public License(GPL) 2.0
  License Is CC-BY-NC
                                                                               
■----------------------------------------------------------------------------■
 
*/

const express = require('express');
const router = express.Router();
 
router.get('/', function(req, res) {
    res.render("index");
});
 
module.exports = router;