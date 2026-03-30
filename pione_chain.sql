-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 28, 2025 lúc 04:59 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `pione_chain`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_admin`
--

CREATE TABLE `tb_admin` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `email_send` varchar(50) DEFAULT NULL,
  `email_send_password` varchar(200) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tb_admin`
--

INSERT INTO `tb_admin` (`id`, `username`, `email`, `password`, `email_send`, `email_send_password`, `status`, `created_at`) VALUES
(1, 'pionechain', 'info@pionechain.com', '$2b$10$.SEWc8nSfK3Lj1Jg4yeoEehvC77MItmfieSyNWtr2Q0Cp/hXScVOa', 'thu@e-ggroup.com', '4cedd77d4193cd832d635b3ecbb0f0d7:4ae91bce8e08362254346c4d15ac3d9f', 1, '2025-03-05 14:33:19');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_config`
--

CREATE TABLE `tb_config` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `value` text NOT NULL,
  `note` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `tb_config`
--

INSERT INTO `tb_config` (`id`, `name`, `value`, `note`) VALUES
(1, 'partner_contact_email_receiver', 'trinhkemchamchi2003@gmail.com', 'Địa chỉ mail nhận thông tin hợp tác');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_contact`
--

CREATE TABLE `tb_contact` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(500) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `message` varchar(2000) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'PENDING' COMMENT 'PENDING, SUCCESS',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tb_contact`
--

INSERT INTO `tb_contact` (`id`, `name`, `email`, `subject`, `message`, `status`, `created_at`, `updated_at`) VALUES
(1, 'minhthu', 'trinhkemchamchi2003@gmail.com', 'sendMail', 'toibingu', 'PENDING', '2025-07-11 18:18:50', '2025-07-11 18:18:50');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_contact_d_app`
--

CREATE TABLE `tb_contact_d_app` (
  `id` int(11) NOT NULL,
  `your_name` text NOT NULL,
  `email` text NOT NULL,
  `project_summary` text NOT NULL,
  `project_type` text NOT NULL,
  `project_website` text NOT NULL,
  `dapp_link` text NOT NULL,
  `social_link` text NOT NULL,
  `relevant_contract_address` text NOT NULL,
  `investor` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_contact_partner`
--

CREATE TABLE `tb_contact_partner` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(12) NOT NULL,
  `organization_name` varchar(100) NOT NULL,
  `organization_location` varchar(100) NOT NULL,
  `industry` varchar(30) NOT NULL,
  `organization_size` varchar(20) NOT NULL,
  `field_id` varchar(50) NOT NULL,
  `field_name` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'PENDING',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_grant_category`
--

CREATE TABLE `tb_grant_category` (
  `id` int(11) NOT NULL,
  `grant_category` text DEFAULT NULL,
  `full_name` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `ton_wallet_address` text DEFAULT NULL,
  `website` text DEFAULT NULL,
  `pitch_deck` text DEFAULT NULL,
  `twitter` text DEFAULT NULL,
  `github_link` text DEFAULT NULL,
  `title` text DEFAULT NULL,
  `idea` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `team_description` text DEFAULT NULL,
  `traction` text DEFAULT NULL,
  `competitor` text DEFAULT NULL,
  `target_user` text DEFAULT NULL,
  `technology_stack` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_history_login_admin`
--

CREATE TABLE `tb_history_login_admin` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `user_agent` varchar(300) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `country_name` varchar(100) DEFAULT NULL,
  `region_name` varchar(100) DEFAULT NULL,
  `city_name` varchar(100) DEFAULT NULL,
  `latitude` varchar(30) DEFAULT NULL,
  `longitude` varchar(30) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `as` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Cấu trúc bảng cho bảng `tb_partner`
--

CREATE TABLE `tb_partner` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `logo_url` varchar(100) NOT NULL,
  `field_id` varchar(50) DEFAULT NULL,
  `field_name` varchar(100) DEFAULT NULL,
  `website_url` varchar(100) DEFAULT NULL,
  `twitter_url` varchar(100) DEFAULT NULL,
  `discord_url` varchar(100) DEFAULT NULL,
  `telegram_url` varchar(100) DEFAULT NULL,
  `youtube_url` varchar(100) DEFAULT NULL,
  `facebook_url` varchar(100) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tb_partner`
--

INSERT INTO `tb_partner` (`id`, `name`, `description`, `logo_url`, `field_id`, `field_name`, `website_url`, `twitter_url`, `discord_url`, `telegram_url`, `youtube_url`, `facebook_url`, `active`, `created_at`) VALUES
(1, 'SteathEX', 'StealthEX is an instant cryptocurrency exchange for limitless swaps. Our service is free from registration and does not store user’s funds on the platform. StealthEX is the best place to buy cryptocurrency.\n\n1400+ coins and tokens are available for quick and easy exchanges. Data privacy and security is a top priority for StealthEX, so all the swaps are non-custodial, and forever will be.', 'partner/1761620829.jpg', '[4,5,6]', '[\"Metaverse\",\"Infrastructure\",\"Wallet\"]', 'https://stealthex.io', 'https://x.com/StealthEX_io', '', 'https://t.me/StealthEX', 'https://www.youtube.com/channel/UCeES_XBesX76ge7xf1meuSw', '', 1, '2025-10-21 14:03:31'),
(2, 'PinkSale', 'PinkSale helps everyone to create their own tokens and token sales in few seconds. Tokens created on PinkSale will be verified and published on explorer websites', 'partner/1761620839.png', '[3,4]', '[\"Gaming\",\"Metaverse\"]', 'https://www.pinksale.finance/', 'https://x.com/pinkecosystem', '', 'https://t.me/pinkecosystem', '', 'https://www.facebook.com/pinkecosystem/', 1, '2025-10-21 14:03:31'),
(3, 'DEXView', 'DexView - Realtime price charts, trading history, token swap, wallet portfolio, and tokens info for DEXs on multichain: Ethereum, BNBChain, Polygon, Avalance, Fantom, Arbitrum, Cronos, Optimism, and more.', 'partner/1761620852.png', '[15,14,13]', '[\"IoT\",\"Identity/Authentication\",\"Cybersecurity\"]', 'https://www.dexview.com/', '', '', 'https://t.me/dexview', '', '', 1, '2025-10-21 14:03:31'),
(17, 'PioneWallet', 'Cross-chain bridge for fast and cost-efficient transactions.', 'partner/1761620899.svg', '[6,3,2]', '[\"Wallet\",\"Gaming\",\"NFT\"]', 'https://pionewallet.com', 'https://x.com/pione_chain', '', 'https://t.me/pionechain', 'https://www.youtube.com/@pione_chain', 'https://www.facebook.com/pionechain', 1, '2025-10-27 17:17:37'),
(18, 'Pione House', 'Real estate identification to enhance transparency in property transactions and asset management.', 'partner/1761620912.svg', '[22,21,25]', '[\"Privacy\",\"Tokenization\",\"Layer 2\"]', 'https://pionehouse.com', 'https://x.com/pione_chain', '', 'https://t.me/pionechain', 'https://www.youtube.com/@pione_chain', '', 1, '2025-10-27 17:20:30'),
(19, 'Pione AI', 'A smart solution integrating IoT and AI to drive innovation in industries, cities and smart homes. Helping to disrupt and catch up with global AI technology trends.', 'partner/1761620924.svg', '[11]', '[\"AI/ML\"]', 'https://pioai.net/', 'https://x.com/pione_chain', '', 'https://t.me/pionechain', 'https://www.youtube.com/@pione_chain', '', 1, '2025-10-27 17:22:26'),
(20, 'Pione Dream', 'PioneDream is a dedicated startup incubator designed to help students turn their innovative ideas into successful business ventures. We provide a comprehensive ecosystem that includes mentorship from industry experts, skill development programs, funding support, and networking opportunities with investors.', 'partner/1761620950.svg', '[18,19]', '[\"Education\",\"Social\"]', 'https://pionedream.com', 'https://x.com/pione_chain', '', 'https://t.me/pionechain', 'https://www.youtube.com/@pione_chain', '', 1, '2025-10-27 17:23:57'),
(21, 'Pione Care', 'Identity and medical record management, enabling people to access transparent, safe, and modern healthcare services.', 'partner/1761620940.svg', '[17]', '[\"Healthcare\"]', 'https://pionecare.com', 'https://x.com/pione_chain', '', 'https://t.me/pionechain', 'https://www.youtube.com/@pione_chain', '', 1, '2025-10-27 17:25:25'),
(22, 'Pione Mart', 'Decentralized e-commerce for safe and convenient shopping.', 'partner/1761620963.svg', '[14,19,21]', '[\"Identity/Authentication\",\"Social\",\"Tokenization\"]', 'https://pionemart.com', 'https://x.com/pione_chain', '', 'https://t.me/pionechain', 'https://www.youtube.com/@pione_chain', '', 1, '2025-10-27 17:26:54'),
(23, 'Pione Swap', 'The cross-chain gateway enables the exchange of digital assets across different blockchain platforms. It reduces transaction costs and optimizes convenience for users with multiple digital assets.', 'partner/1761620989.svg', '[6,26]', '[\"Wallet\",\"Smart Contract Platform\"]', 'https://pioneswap.com', 'https://x.com/pione_chain', '', 'https://t.me/pionechain', 'https://www.youtube.com/@pione_chain', '', 1, '2025-10-27 17:29:45'),
(24, 'Pione Farm', 'Agricultural traceability for farmers and businesses to optimize the supply chain, ensure transparency and food safety, providing end-to-end solutions to track produce from farm to table.', 'partner/1761620997.svg', '[21,22]', '[\"Tokenization\",\"Privacy\"]', 'https://pionefarm.com', 'https://x.com/pione_chain', '', 'https://t.me/pionechain', 'https://www.youtube.com/@pione_chain', '', 1, '2025-10-27 17:31:45'),
(25, 'Ex Pione', 'A DEX platform for secure and transparent trading, powered by AI and blockchain-based identity.', 'partner/1761621010.svg', '[1,2,6,10]', '[\"DeFi\",\"NFT\",\"Wallet\",\"Oracle\"]', 'https://expione.com/', 'https://x.com/pione_chain', '', 'https://t.me/pionechain', 'https://www.youtube.com/@pione_chain', '', 1, '2025-10-27 17:33:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_partner_field`
--

CREATE TABLE `tb_partner_field` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tb_partner_field`
--

INSERT INTO `tb_partner_field` (`id`, `name`) VALUES
(1, 'DeFi'),
(2, 'NFT'),
(3, 'Gaming'),
(4, 'Metaverse'),
(5, 'Infrastructure'),
(6, 'Wallet'),
(7, 'Exchange'),
(8, 'Lending/Borrowing'),
(9, 'Stablecoin'),
(10, 'Oracle'),
(11, 'AI/ML'),
(12, 'Data Analytics'),
(13, 'Cybersecurity'),
(14, 'Identity/Authentication'),
(15, 'IoT'),
(16, 'Supply Chain'),
(17, 'Healthcare'),
(18, 'Education'),
(19, 'Social'),
(20, 'DAO'),
(21, 'Tokenization'),
(22, 'Privacy'),
(23, 'Cross-chain'),
(24, 'Layer 1'),
(25, 'Layer 2'),
(26, 'Smart Contract Platform');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_type_project`
--

CREATE TABLE `tb_type_project` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tb_type_project`
--

INSERT INTO `tb_type_project` (`id`, `name`) VALUES
(1, 'DEX'),
(2, 'GameFi'),
(3, 'NFT'),
(4, 'LENDING'),
(5, 'Perpetuals'),
(6, 'Payments'),
(7, 'Stablecoin'),
(8, 'Wallet'),
(9, 'Marketplace'),
(10, 'Bridge'),
(11, 'Aggregator'),
(12, 'Derivative'),
(13, 'Real World Assets(RWAs)'),
(14, 'Oracle'),
(15, 'SocialFi');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `tb_admin`
--
ALTER TABLE `tb_admin`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tb_config`
--
ALTER TABLE `tb_config`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tb_contact`
--
ALTER TABLE `tb_contact`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tb_contact_d_app`
--
ALTER TABLE `tb_contact_d_app`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tb_contact_partner`
--
ALTER TABLE `tb_contact_partner`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tb_grant_category`
--
ALTER TABLE `tb_grant_category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tb_history_login_admin`
--
ALTER TABLE `tb_history_login_admin`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tb_partner`
--
ALTER TABLE `tb_partner`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tb_partner_field`
--
ALTER TABLE `tb_partner_field`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tb_type_project`
--
ALTER TABLE `tb_type_project`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `tb_admin`
--
ALTER TABLE `tb_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `tb_config`
--
ALTER TABLE `tb_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `tb_contact`
--
ALTER TABLE `tb_contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `tb_contact_d_app`
--
ALTER TABLE `tb_contact_d_app`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tb_contact_partner`
--
ALTER TABLE `tb_contact_partner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tb_grant_category`
--
ALTER TABLE `tb_grant_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tb_history_login_admin`
--
ALTER TABLE `tb_history_login_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `tb_partner`
--
ALTER TABLE `tb_partner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `tb_partner_field`
--
ALTER TABLE `tb_partner_field`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `tb_type_project`
--
ALTER TABLE `tb_type_project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
