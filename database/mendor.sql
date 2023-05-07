-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2023 at 05:29 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mendor`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `birthDate` datetime DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('super-admin','admin','customer') NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `gender`, `birthDate`, `email`, `role`, `password`, `createdAt`, `updatedAt`) VALUES
('2f178260-ece1-11ed-b13c-e90cfa531077', 'Abduljebar Sani', '+251921859449', 'Male', '0000-00-00 00:00:00', 'Abduljebar149@gmail.com', 'super-admin', '$2a$10$8LRcJwb0ASsX/2MU8NiMR.mrIiiC3tUGRCPwKvQUPSoM3tY.APjTi', '2023-05-07 14:12:22', '2023-05-07 14:12:22'),
('78de1ee0-ecd7-11ed-ac3c-ab3d7757b4ef', 'Abduljebar Sani', '+251921859449', 'Male', '0000-00-00 00:00:00', 'Abduljebar49@gmail.com', 'super-admin', '$2a$10$vaMPmK6zdF9tWgLrzC6CcOEkfdJv.KtZJr9E47eVdcATma1bixBy2', '2023-05-07 13:02:50', '2023-05-07 13:54:33'),
('f9e785d0-ece1-11ed-a05f-81dba3ca351e', 'Abduljebar Sani', '+251921859449', 'Male', '0000-00-00 00:00:00', 'Abduljebar1249@gmail.com', 'super-admin', '$2a$10$KxVwr2GbBHW9rHTQZQPOU.S6JnWLgYwSEAOg/QMQh0jTV.TkcCl9y', '2023-05-07 14:18:02', '2023-05-07 14:18:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
