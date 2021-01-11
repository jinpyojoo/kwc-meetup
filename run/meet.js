/*

■----------------------------------------------------------------------------■
  MeetUp WebSite Back-End Main System [meet.js]									                          	
■----------------------------------------------------------------------------■
                        
  Back-End Developer By Yubin Heo
  Font-End Developer By Jinpyo Joo
  GNU General Public License(GPL) 2.0
  License Is CC-BY-NC
                                                                               
■----------------------------------------------------------------------------■
 
*/

module.exports = function (app) {
    try {
        const express = require("express");
        const router = express.Router();
        const conn = require("./db");
        const bodyParser = require("body-parser");
        const bkfd2Password = require("pbkdf2-password");
        const moment = require("moment");

        app.use(bodyParser.urlencoded({ extended: false }));

        function getRandomWords(count) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < count; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            
            return text;
        }

        function isEmpty (value) {
            if(value = "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
                return true;
            } else {
                return false;
            }
        }

        function getIp (req) {
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            if(ip.substr(0, 7) == "::ffff:") { ip = ip.substr(7); }
            return ip;
        }

        router.get("/create_meet", function (req, res) {
            res.render("create_link");
        });

        router.post("/create_meet", function(req, res) {
            const hasher = bkfd2Password();
            const name = req.body.name + "#" + getRandomWords(4);
            const disc = req.body.disc;
            const cityname = req.body.cityname;
            const district = req.body.district;
            const cidi = cityname + " " + district;
            const date = req.body.date;
	    const time = req.body.time
            const dhour = req.body.dhour;
            const dmin = req.body.dmin;
            const pw = req.body.pw;
            const adminpw = req.body.adminpw;
            const hiddenKey = getRandomWords(10);
            const invite = getRandomWords(10);
            const agree = req.body.agree;

            try {
                hasher({ password: pw, salt: hiddenKey }, (err, pass1, salt, hash1) => {
                    if (err) throw err;
                    hasher({ password: adminpw, salt: hiddenKey }, (err, pass2, salt, hash2) => {
                        if(err) throw err;

                        const query = `INSERT INTO meets(name, disc, cityname, district, date, time, dhour, dmin, pw, adminpw, salt, agree, invite_link) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                        const params = [name, disc, cityname, district, date, time, dhour, dmin, hash1, hash2, salt, agree, invite];

                        conn.query(query, params, function (err, rows) {
                            if(err) throw err;
                            res.render("done_link", {invite: invite, name: name, disc: disc, cidi: cidi, time: time, dhour: dhour, dmin: dmin });
                        });
                    });
                });
            } catch(error) { res.render("error", { error: error }); }
        });

        router.get('/admin_login', function (req, res) {
                res.render("admin_login");
        });

        router.post('/admin_login', function (req, res) {
            const name = req.body.name;
            const adminpw = req.body.adminpw;
            const hasher = bkfd2Password();

            const query1 = `SELECT * FROM meets WHERE name=?`;
            const params1 = [name];
            try {
                conn.query(query1, params1, function (err, rows1) {
                    if (isEmpty(rows1)) {
                        res.render("error", { error: "모임 이름 또는 비밀번호가 일치하지 않습니다." });
                    } else {
                        const salt = rows1[0].salt;
                        console.log(salt);
                        hasher({ password: adminpw, salt: salt }, (err, pass, salt, hash) => {
                            const query2 = `SELECT * FROM meets WHERE name=? AND adminpw=?`;
                            const params2 = [name, hash];
                            conn.query(query2, params2, function (err, rows2) {
                                if (isEmpty(rows2)) {
                                    res.render("error", { error: "모임 이름 또는 비밀번호가 일치하지 않습니다." });
                                } else {
                                    const query3 = `SELECT * FROM join_meet WHERE name=?`;
                                    const params3 = [name];
                                    conn.query(query3, params3, function (err, rows3) {
                                        const query4 = `select *,count(ctime)as coun from join_meet WHERE name=? group by ctime order by coun desc LIMIT 3;`;
                                        const params4 = [name];
                                        conn.query(query4, params4, function (err, rows4) {
                                            if (err) res.render("error", { error: "알 수 없는 오류가 " });
                                            res.render("admin_page", { meet: rows2, users: rows3, count2: rows4 });
                                        });

                                    });

                                }
                            });
                        });
                    }
                });
            } catch (error) { res.render("error", { error: error }); }
        });


        router.get("/join_meet", function (req, res) {
            res.render("join_link-invitecode");
        });

        router.post("/invite_code", function (req, res) {
            const code = req.body.invite_code;
            res.redirect(`./join_meet/${code}`);
        });

        router.get("/join_meet/:code", function (req, res) {
            const code = req.params.code;
            const query1 = `SELECT * FROM meets WHERE invite_link=?`;
            const params1 = [code];
            conn.query(query1, params1, function(err, rows) {
                if(err) throw err;
                if(isEmpty(rows)) {
                    res.redirect("/join_meet");
                } else {
                    const query2 = `select *,count(ctime)as coun from join_meet group by ctime order by coun desc LIMIT 1;`;
                    const params2 = [code];
                    conn.query(query2, params2, function (err, rows2) {
                        res.render("join_link2", { rows: rows, count: rows2 });
                    });
                }
            });
        });

	router.post('/join_meet', function (req, res) {
            const name = req.body.name;
            const nick = req.body.nick;
            const ctime = req.body.ctime;
            const pw = req.body.pw;
            const agree = req.body.agree;
            const ip = getIp(req);
            const hasher = bkfd2Password();

            try {
                const query1 = `SELECT * FROM meets WHERE name=?`;
                const params1 = [name];
                conn.query(query1, params1, function (err, rows) {
                    if (isEmpty(rows)) {
                        res.render("error", { error: "모임 이름 또는 비밀번호가 일치하지 않습니다." });
                    } else {
                        let salt = rows[0].salt;
                        hasher({ password: pw, salt: salt }, (err, pass, salt, hash) => {
                            const query2 = `SELECT * FROM meets WHERE name=? and pw=?`;
                            const params2 = [name, hash];
                            conn.query(query2, params2, function (err, rows2) {
                                if (isEmpty(rows2)) {
                                    res.render("error", { error: "모임 이름 또는 비밀번호가 일치하지 않습니다." });
                                } else {
                                    const query3 = `INSERT INTO join_meet(name, nick, ctime, agree, name_ip) values(?, ?, ?, ?, ?)`;
                                    const params3 = [name, nick, ctime, agree, ip];

                                    conn.query(query3, params3, function (err, rows3) {
                                        if (err) throw err;
                                        res.render("done_invite");
                                    });
                                }
                            });
                        });
                    }
                });

            } catch (error) { console.log(`오류 발생 : ${error}`); }
        });



        router.get('/list_meet', function (req, res) {
            const query1 = `SELECT * FROM meets order by idx asc`;
            conn.query(query1, function (err, rows) {
                if(err) throw err;
                res.render("listmeet", { moment: moment, rows: rows });
            });
        });

        router.get('/privacy', function (req, res) {
            res.render("MeetUP_privacy");
        });



        return router;
    } catch(error) { console.log("error"); }
}