/*

■----------------------------------------------------------------------------■
  MeetUp WebSite DataBase [checkup.sql]									                          	
■----------------------------------------------------------------------------■
                        
  Back-End Developer By Yubin Heo
  Font-End Developer By Jinpyo Joo
  GNU General Public License(GPL) 2.0
  License Is CC-BY-NC

  [ DB Info ]
   - MySQL 5.6
                                                                               
■----------------------------------------------------------------------------■
 
*/

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `checkup`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `join_meet`
--

CREATE TABLE `join_meet` (
  `idx` int(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `nick` varchar(100) NOT NULL,
  `ctime` varchar(100) NOT NULL,
  `agree` varchar(100) NOT NULL,
  `name_ip` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 데이터는 개인정보보호의 목적으로 제공하지 않습니다. */

-- --------------------------------------------------------

--
-- 테이블 구조 `meets`
--

CREATE TABLE `meets` (
  `idx` int(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `disc` varchar(100) NOT NULL,
  `cityname` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(100) NOT NULL,
  `dhour` varchar(100) NOT NULL,
  `dmin` varchar(100) NOT NULL,
  `pw` text NOT NULL,
  `adminpw` text NOT NULL,
  `salt` varchar(100) NOT NULL,
  `agree` varchar(80) NOT NULL,
  `invite_link` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 데이터는 개인정보보호의 목적으로 제공하지 않습니다. */

--
-- 테이블의 인덱스 `join_meet`
--
ALTER TABLE `join_meet`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `meets`
--
ALTER TABLE `meets`
  ADD PRIMARY KEY (`idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `join_meet`
--
ALTER TABLE `join_meet`
  MODIFY `idx` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 테이블의 AUTO_INCREMENT `meets`
--
ALTER TABLE `meets`
  MODIFY `idx` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
