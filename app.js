/*

■----------------------------------------------------------------------------■
  MeetUp WebSite Back-End [app.js]									                          	
■----------------------------------------------------------------------------■
                        
  Back-End Developer By Yubin Heo
  Font-End Developer By Jinpyo Joo
  GNU General Public License(GPL) 2.0
  License Is CC-BY-NC
                                                                               
■----------------------------------------------------------------------------■
 
*/

const express = require('express');
const http = require('http');
 
const app = express();
const port = 372;

app.set('view engine','ejs');

app.set('views','./views');
app.use(express.static('public'));

const index = require('./run/index');
app.use('/', index);

const meet = require('./run/meet')(app);
app.get('/privacy', meet);
app.get('/list_meet', meet);
app.get('/create_meet', meet);
app.post('/create_meet', meet);
app.get('/join_meet', meet);
app.get('/join_meet/:code', meet);
app.post('/join_meet', meet);
app.get('/admin_login', meet);
app.post('/admin_login', meet);
app.post('/invite_code', meet);

app.listen(port, function () {
  console.log(`
■----------------------------------------------------------------------------■
  MeetUp Server									                          	
■----------------------------------------------------------------------------■
   									   
  Http 서버가 ${port} 포트로 연결을 성공했습니다 
                                                                               
■----------------------------------------------------------------------------■
  `);
});