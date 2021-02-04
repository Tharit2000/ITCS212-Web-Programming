-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 06, 2020 at 11:36 AM
-- Server version: 8.0.18
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homework4`
--

-- --------------------------------------------------------

--
-- Table structure for table `lightnovel_list`
--

CREATE TABLE `lightnovel_list` (
  `LNID` int(11) NOT NULL,
  `Title` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Author` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `PublishedDate` date NOT NULL,
  `Volumes` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lightnovel_list`
--

INSERT INTO `lightnovel_list` (`LNID`, `Title`, `Author`, `PublishedDate`, `Volumes`) VALUES
(1, 'No Game No Life', 'Yuu Kamiya', '2012-04-25', 10),
(2, 'Sword Art Online', 'Reki Kawahara', '2009-04-10', 24),
(3, 'My Youth Romantic Comedy Is Wrong, As I Expected', 'Wataru Watari', '2011-03-19', 14);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lightnovel_list`
--
ALTER TABLE `lightnovel_list`
  ADD PRIMARY KEY (`LNID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
