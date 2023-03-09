/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : tech_shop

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 08/03/2023 01:58:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (1, 'Điện thoại', '2023-02-03 11:45:26', NULL);
INSERT INTO `categories` VALUES (2, 'Laptop', '2023-02-06 09:59:10', NULL);
INSERT INTO `categories` VALUES (3, 'Máy tính bảng', '2023-02-06 09:59:15', NULL);
INSERT INTO `categories` VALUES (4, 'Âm thanh', '2023-02-06 09:59:17', NULL);
INSERT INTO `categories` VALUES (5, 'Đồng hồ', '2023-02-06 09:59:19', NULL);
INSERT INTO `categories` VALUES (6, 'Ốp lưng', '2023-02-06 09:59:21', NULL);
INSERT INTO `categories` VALUES (7, 'Sạc điện thoại', '2023-02-06 09:59:24', NULL);
INSERT INTO `categories` VALUES (8, 'Pin dự phòng', '2023-02-06 09:59:26', NULL);
INSERT INTO `categories` VALUES (9, 'Màn hình', '2023-02-06 09:59:32', NULL);
INSERT INTO `categories` VALUES (10, 'PC', '2023-02-06 09:59:34', NULL);
INSERT INTO `categories` VALUES (11, 'Bàn phím', '2023-02-06 09:59:37', NULL);
INSERT INTO `categories` VALUES (12, 'Chuột máy tính', '2023-02-06 09:59:40', NULL);

-- ----------------------------
-- Table structure for collections
-- ----------------------------
DROP TABLE IF EXISTS `collections`;
CREATE TABLE `collections`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NULL DEFAULT NULL,
  `manufacturer_id` int NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `category_id`(`category_id` ASC) USING BTREE,
  INDEX `manufacturer_id`(`manufacturer_id` ASC) USING BTREE,
  CONSTRAINT `collections_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `collections_ibfk_2` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1011 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of collections
-- ----------------------------
INSERT INTO `collections` VALUES (1, 4, 5, NULL, '2023-02-07 03:26:43', NULL);
INSERT INTO `collections` VALUES (2, 6, 3, NULL, '2023-02-09 17:50:06', NULL);
INSERT INTO `collections` VALUES (3, 1, 8, NULL, '2023-02-13 21:10:06', NULL);
INSERT INTO `collections` VALUES (4, 11, 6, NULL, '2023-02-13 19:19:32', NULL);
INSERT INTO `collections` VALUES (5, 7, 1, NULL, '2023-02-14 19:19:48', NULL);
INSERT INTO `collections` VALUES (6, 6, 10, NULL, '2023-02-07 20:35:13', NULL);
INSERT INTO `collections` VALUES (7, 5, 5, NULL, '2023-02-08 15:33:28', NULL);
INSERT INTO `collections` VALUES (8, 1, 5, NULL, '2023-02-09 19:44:07', NULL);
INSERT INTO `collections` VALUES (9, 5, 2, NULL, '2023-02-11 11:49:48', NULL);
INSERT INTO `collections` VALUES (10, 2, 1, NULL, '2023-02-13 23:11:55', NULL);
INSERT INTO `collections` VALUES (11, 12, 1, NULL, '2023-02-11 12:12:58', NULL);
INSERT INTO `collections` VALUES (12, 6, 4, NULL, '2023-02-09 09:38:57', NULL);
INSERT INTO `collections` VALUES (13, 1, 1, NULL, '2023-02-10 08:41:03', NULL);
INSERT INTO `collections` VALUES (14, 3, 9, NULL, '2023-02-14 13:06:43', NULL);
INSERT INTO `collections` VALUES (15, 3, 5, NULL, '2023-02-12 04:06:07', NULL);
INSERT INTO `collections` VALUES (16, 2, 4, NULL, '2023-02-14 17:20:18', NULL);
INSERT INTO `collections` VALUES (17, 7, 2, NULL, '2023-02-13 11:47:04', NULL);
INSERT INTO `collections` VALUES (18, 8, 3, NULL, '2023-02-11 10:29:58', NULL);
INSERT INTO `collections` VALUES (19, 2, 3, NULL, '2023-02-08 10:31:49', NULL);
INSERT INTO `collections` VALUES (20, 1, 10, NULL, '2023-02-07 17:53:58', NULL);
INSERT INTO `collections` VALUES (21, 9, 9, NULL, '2023-02-08 15:12:21', NULL);
INSERT INTO `collections` VALUES (22, 9, 4, NULL, '2023-02-14 17:59:24', NULL);
INSERT INTO `collections` VALUES (23, 11, 5, NULL, '2023-02-07 06:23:13', NULL);
INSERT INTO `collections` VALUES (24, 7, 7, NULL, '2023-02-07 18:50:29', NULL);
INSERT INTO `collections` VALUES (25, 11, 1, NULL, '2023-02-10 09:27:21', NULL);
INSERT INTO `collections` VALUES (26, 6, 1, NULL, '2023-02-12 06:40:09', NULL);
INSERT INTO `collections` VALUES (27, 10, 10, NULL, '2023-02-14 14:12:55', NULL);
INSERT INTO `collections` VALUES (28, 2, 1, NULL, '2023-02-09 02:30:19', NULL);
INSERT INTO `collections` VALUES (29, 12, 6, NULL, '2023-02-09 17:26:00', NULL);
INSERT INTO `collections` VALUES (30, 9, 7, NULL, '2023-02-07 19:15:07', NULL);
INSERT INTO `collections` VALUES (31, 2, 4, NULL, '2023-02-07 03:48:08', NULL);
INSERT INTO `collections` VALUES (32, 10, 10, NULL, '2023-02-07 06:26:40', NULL);
INSERT INTO `collections` VALUES (33, 7, 4, NULL, '2023-02-10 20:28:24', NULL);
INSERT INTO `collections` VALUES (34, 5, 6, NULL, '2023-02-14 21:16:11', NULL);
INSERT INTO `collections` VALUES (35, 2, 5, NULL, '2023-02-13 03:39:28', NULL);
INSERT INTO `collections` VALUES (36, 10, 10, NULL, '2023-02-10 17:45:14', NULL);
INSERT INTO `collections` VALUES (37, 5, 2, NULL, '2023-02-12 13:58:29', NULL);
INSERT INTO `collections` VALUES (38, 8, 2, NULL, '2023-02-14 09:06:46', NULL);
INSERT INTO `collections` VALUES (39, 6, 1, NULL, '2023-02-13 13:23:02', NULL);
INSERT INTO `collections` VALUES (40, 12, 6, NULL, '2023-02-10 00:19:25', NULL);
INSERT INTO `collections` VALUES (41, 8, 7, NULL, '2023-02-14 01:26:55', NULL);
INSERT INTO `collections` VALUES (42, 5, 9, NULL, '2023-02-12 08:02:47', NULL);
INSERT INTO `collections` VALUES (43, 8, 3, NULL, '2023-02-13 07:11:17', NULL);
INSERT INTO `collections` VALUES (44, 6, 3, NULL, '2023-02-14 01:14:07', NULL);
INSERT INTO `collections` VALUES (45, 11, 6, NULL, '2023-02-11 09:47:12', NULL);
INSERT INTO `collections` VALUES (46, 6, 6, NULL, '2023-02-12 04:51:26', NULL);
INSERT INTO `collections` VALUES (47, 12, 4, NULL, '2023-02-12 10:38:09', NULL);
INSERT INTO `collections` VALUES (48, 8, 4, NULL, '2023-02-13 15:03:33', NULL);
INSERT INTO `collections` VALUES (49, 9, 8, NULL, '2023-02-12 01:08:59', NULL);
INSERT INTO `collections` VALUES (1009, 1, 1, 'test create', '2023-03-01 13:04:14', '2023-03-01 13:04:14');
INSERT INTO `collections` VALUES (1010, 1, 1, 'test create', '2023-03-01 23:30:19', '2023-03-01 23:30:19');

-- ----------------------------
-- Table structure for manufacturers
-- ----------------------------
DROP TABLE IF EXISTS `manufacturers`;
CREATE TABLE `manufacturers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of manufacturers
-- ----------------------------
INSERT INTO `manufacturers` VALUES (1, 'Apple', NULL, NULL);
INSERT INTO `manufacturers` VALUES (2, 'Samsung', NULL, NULL);
INSERT INTO `manufacturers` VALUES (3, 'Lenovo', NULL, NULL);
INSERT INTO `manufacturers` VALUES (4, 'Huawei', NULL, NULL);
INSERT INTO `manufacturers` VALUES (5, 'Xiaomi', NULL, NULL);
INSERT INTO `manufacturers` VALUES (6, 'HP', NULL, NULL);
INSERT INTO `manufacturers` VALUES (7, 'Dell', NULL, NULL);
INSERT INTO `manufacturers` VALUES (8, 'Logitech', NULL, NULL);
INSERT INTO `manufacturers` VALUES (9, 'Asus', NULL, NULL);
INSERT INTO `manufacturers` VALUES (10, 'Oppo', NULL, NULL);

-- ----------------------------
-- Table structure for order_product_details
-- ----------------------------
DROP TABLE IF EXISTS `order_product_details`;
CREATE TABLE `order_product_details`  (
  `id` int NOT NULL,
  `order_id` int NULL DEFAULT NULL,
  `product_id` int NULL DEFAULT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `quantity` int NULL DEFAULT NULL,
  `selling_price` int NULL DEFAULT NULL,
  `importing_price` int NULL DEFAULT NULL,
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `img_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `product_short_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `order_id`(`order_id` ASC) USING BTREE,
  INDEX `product_id`(`product_id` ASC) USING BTREE,
  CONSTRAINT `order_product_details_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_product_details_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_product_details
-- ----------------------------

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, '123', 1, 'namw', '01910', 'klafjhdfj', NULL, NULL);

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `collection_id` int NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `short_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `importing_price` bigint NULL DEFAULT NULL,
  `selling_price` bigint NULL DEFAULT NULL,
  `discount` double NULL DEFAULT NULL,
  `remaining_amount` int NULL DEFAULT NULL,
  `sold_amount` int NULL DEFAULT NULL,
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `rating` double NULL DEFAULT NULL,
  `img_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `attributes` json NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `collection_id`(`collection_id` ASC) USING BTREE,
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES (1, 2, 'iphone tàu', NULL, 23, 27, 30, 10, 34, 'iphone của TQ', 4, 'samsung.jpg', '2023-02-17 11:13:14', '2023-02-17 11:13:19', NULL);
INSERT INTO `products` VALUES (2, 3, 'IPhone 14 chính hãng VN/A', '128GB, Vàng hồng', 23, 34, 3, 34, 34, '2', 4, 'file_1677524870457.webp', '2023-02-28 02:07:50', '2023-02-28 02:07:50', NULL);
INSERT INTO `products` VALUES (3, 1, 'Yasou - Dead is like the wind', 'Quang Vu', 23, 34, 3, 34, 34, '2', 4, 'file_1677525324797.jpeg', '2023-02-28 02:15:25', '2023-02-28 02:15:25', NULL);
INSERT INTO `products` VALUES (9, 1, 'Laptop Lenovo Ideapad Slim3 15ITL05 81X800KRVN (Core i3 1115G4/8GB RAM/256GB/15.6', 'Intel Core i3-1115G4', 2000, 34, 3, 34, 20, '2', 4, 'file_1677695330114.jpeg', '2023-03-02 01:28:50', '2023-03-02 01:28:50', '{\"Ram\": 8, \"Giá bán\": 100, \"Màu sắc\": \"Hồng\", \"Độ phân giải màn hình\": \"1920x1080\"}');
INSERT INTO `products` VALUES (10, 13, 'điện thoại 13', 'điện thoại 60', 7660730, 5879572, 4, 39, 79, 'Laborum culpa aute duis ea adipisicing officia cillum labore duis nisi incididunt nisi incididunt reprehenderit. Fugiat magna id incididunt in. Nisi sit id Lorem tempor consectetur.\r\n', 4.2, 'file_1677814995424.webp', '2023-03-03 10:43:15', '2023-03-03 10:43:15', NULL);
INSERT INTO `products` VALUES (11, 13, 'điện thoại Geekfarm 36', 'điện thoại Bezal 85', 5995963, 8255122, 6.4, 63, 29, 'Nulla dolore aute Lorem irure deserunt amet non incididunt quis sunt cupidatat dolore officia. Do anim nulla est non proident enim. Quis nisi in velit elit commodo minim excepteur ex tempor voluptate reprehenderit qui.\r\n', 1, 'file_1677814998022.webp', '2023-03-03 10:43:18', '2023-03-03 10:43:18', NULL);
INSERT INTO `products` VALUES (12, 20, 'điện thoại Portica 9', 'điện thoại Hometown 17', 4056662, 9425366, 2.6, 28, 34, 'Laboris adipisicing incididunt nulla elit officia voluptate consectetur do. Ad amet ad deserunt voluptate. Aliqua elit consectetur exercitation sunt adipisicing consequat eu et pariatur sint fugiat ea tempor aliqua.\r\n', 0, 'file_1677815001642.webp', '2023-03-03 10:43:22', '2023-03-03 10:43:22', NULL);
INSERT INTO `products` VALUES (13, 20, 'điện thoại Xurban 99', 'điện thoại Kinetica 11', 8340306, 7929749, 9, 9, 26, 'In id elit sunt excepteur in cupidatat fugiat. Cupidatat laboris irure sint in aute. Laboris minim fugiat laboris non quis adipisicing laboris nisi adipisicing aliqua adipisicing non. Sint in aliqua ut aliquip incididunt.\r\n', 4.2, 'file_1677815004041.webp', '2023-03-03 10:43:24', '2023-03-03 10:43:24', NULL);
INSERT INTO `products` VALUES (14, 31, 'laptop Applidec 81', 'laptop Ginkle 62', 9849069, 2114515, 4.3, 77, 25, 'Do officia laboris amet enim eiusmod pariatur occaecat adipisicing esse incididunt consectetur esse do culpa. Consectetur dolor qui exercitation ut in voluptate labore consectetur ad. Sint ullamco enim sit ipsum.\r\n', 1.6, 'file_1677815009846.webp', '2023-03-03 10:43:30', '2023-03-03 10:43:30', NULL);

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test`  (
  `attr` json NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test
-- ----------------------------
INSERT INTO `test` VALUES ('{\"Ram\": 8, \"Giá bán\": 100, \"Màu sắc\": \"Hồng\", \"Độ phân giải màn hình\": \"1920x1080\"}');
INSERT INTO `test` VALUES ('{\"Ram\": 32, \"Giá bán\": 100, \"Màu sắc\": \"Đen\", \"Độ phân giải màn hình\": \"1920x1080\"}');
INSERT INTO `test` VALUES ('{\"Ram\": 16, \"Giá bán\": 200, \"Màu sắc\": \"Đỏ\", \"Độ phân giải màn hình\": \"4K\"}');
INSERT INTO `test` VALUES ('{\"Ram\": 8, \"Giá bán\": 300, \"Màu sắc\": \"Xanh nước biển\", \"Độ phân giải màn hình\": \"FHD\"}');
INSERT INTO `test` VALUES ('{\"Ram\": 64, \"Giá bán\": 400, \"Màu sắc\": \"green\", \"Độ phân giải màn hình\": \"UHD\"}');
INSERT INTO `test` VALUES ('{\"Ram\": 4, \"Giá bán\": 500, \"Màu sắc\": \"Xám\", \"Độ phân giải màn hình\": \"3840 x 2160\"}');
INSERT INTO `test` VALUES ('{\"Ram\": 16, \"Giá bán\": 600, \"Màu sắc\": \"Xanh midnight\", \"Độ phân giải màn hình\": \"FHD\"}');

-- ----------------------------
-- Table structure for user_rates
-- ----------------------------
DROP TABLE IF EXISTS `user_rates`;
CREATE TABLE `user_rates`  (
  `user_id` int NULL DEFAULT NULL,
  `product_id` int NULL DEFAULT NULL,
  `rating` int NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `product_id`(`product_id` ASC) USING BTREE,
  CONSTRAINT `user_rates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_rates_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_rates
-- ----------------------------

-- ----------------------------
-- Table structure for user_reviews
-- ----------------------------
DROP TABLE IF EXISTS `user_reviews`;
CREATE TABLE `user_reviews`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `product_id` int NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `img_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `product_id`(`product_id` ASC) USING BTREE,
  CONSTRAINT `user_reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_reviews
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 104 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'ROLE_MANAGER', NULL, 'manager', 'manager', NULL, NULL, NULL, '2023-03-08 01:42:47', '2023-02-03 11:45:38', '2023-03-08 01:42:47');
INSERT INTO `users` VALUES (2, 'ROLE_USER', 'lan48@outlook.com', 'ygRRbgFmoC', 'BGSqMTmjEx', 'Meng Lan', '760-3646-1376', '461 Zhongshan 5th Rd, Zimaling Shangquan', '2023-03-02 09:19:38', '2023-01-05 12:57:52', '2023-03-02 09:19:38');
INSERT INTO `users` VALUES (3, 'ROLE_USER', 'xiaomingp@outlook.com', 'tg33pvZScs', 'TPgIF63uQF', 'Peng Xiaoming', '330-370-4221', '184 West Market Street', '2023-02-07 15:39:56', '2023-01-08 11:36:31', '2023-02-07 15:39:56');
INSERT INTO `users` VALUES (4, 'ROLE_USER', 'hs48@icloud.com', 'sxuQChRVDO', 'UIe8VG2j3V', 'Sano Hazuki', '66-678-1809', '2-1-10 Tenjinnomori, Nishinari Ward', NULL, '2023-01-15 22:47:31', '2023-02-03 14:37:52');
INSERT INTO `users` VALUES (5, 'ROLE_USER', 'anqixue@yahoo.com', 'yQe5CvELL0', '92A6U8dCXl', 'Xue Anqi', '21-9059-1520', '63 Middle Huaihai Road, Huangpu District', NULL, '2023-01-27 20:29:46', '2023-02-03 16:01:22');
INSERT INTO `users` VALUES (6, 'ROLE_USER', 'anqsong95@gmail.com', 'SjQ144oIAt', 'S3SOEu8BcP', 'Song Anqi', '718-524-0510', '259 Nostrand Ave', NULL, '2023-01-19 21:32:23', '2023-02-09 21:34:02');
INSERT INTO `users` VALUES (7, 'ROLE_USER', 'ahunter920@icloud.com', '8fYj2L6GN6', 'Qu885mgrpd', 'Angela Hunter', '7778 068106', '780 Silver St, Newnham', NULL, '2023-01-23 08:28:30', '2023-02-03 10:23:51');
INSERT INTO `users` VALUES (8, 'ROLE_USER', 'mendom@gmail.com', '0Be7k8pf7d', '1RIOdpCkEm', 'Michael Mendoza', '7353 336940', '870 Papworth Rd, Trumpington', NULL, '2023-01-27 08:41:35', '2023-02-04 17:05:15');
INSERT INTO `users` VALUES (9, 'ROLE_USER', 'maairi9@icloud.com', 'c7VZel8RT5', '8xzAiJipC6', 'Matsumoto Airi', '5175 134256', '535 Elms Rd, Botley', NULL, '2023-01-04 17:19:26', '2023-02-05 15:59:00');
INSERT INTO `users` VALUES (10, 'ROLE_USER', 'zfu@outlook.com', '4oDXdj6Xam', 'u4tJHcLrNI', 'Fu Ziyi', '52-282-6687', '13 1-1715 Sekohigashi, Moriyama Ward', NULL, '2023-01-30 23:26:03', '2023-02-07 12:35:02');
INSERT INTO `users` VALUES (11, 'ROLE_USER', 'syku9@gmail.com', 'UvNEWLKzkq', 'OQn4P5xHtx', 'Ku Suk Yee', '90-2222-3409', '4-9-1 Kamihigashi, Hirano Ward', NULL, '2023-01-17 20:00:35', '2023-02-03 19:07:53');
INSERT INTO `users` VALUES (12, 'ROLE_USER', 'bradley55@hotmail.com', 'xdkoKOddaR', 'fq9KHmVckE', 'Bradley Rose', '5376 914223', '661 Redfern St', NULL, '2023-02-01 14:06:52', '2023-02-05 22:07:00');
INSERT INTO `users` VALUES (13, 'ROLE_USER', 'brmo@hotmail.com', 'Si0U6LZSW7', 'As7ZYKp8oT', 'Brandon Moore', '10-4330-9783', '965 FuXingMenNei Street, XiCheng District', NULL, '2023-01-29 17:58:24', '2023-02-07 02:18:35');
INSERT INTO `users` VALUES (14, 'ROLE_USER', 'wad43@outlook.com', 'FhhTWBPJC9', 'lXsxf4qZUE', 'Wayne Dixon', '163-2220-0335', '230 Dong Zhi Men, Dongcheng District', NULL, '2023-01-30 17:37:18', '2023-02-09 05:57:30');
INSERT INTO `users` VALUES (15, 'ROLE_USER', 'bruce10@icloud.com', 'UbMMJjkREu', '948me2iiEY', 'Bruce Mcdonald', '213-274-7967', '89 Alameda Street', NULL, '2023-01-18 09:55:57', '2023-02-06 21:02:59');
INSERT INTO `users` VALUES (16, 'ROLE_USER', 'chy@yahoo.com', 'TVc6OVJqai', 'KMvQfFnOnV', 'Cho Hok Yau', '(161) 756 6167', '940 Portland St', NULL, '2023-01-09 11:34:09', '2023-02-04 05:21:38');
INSERT INTO `users` VALUES (17, 'ROLE_USER', 'yunli93@yahoo.com', 'szrsj1OQNg', 'jXEaGRPsFw', 'Li Yunxi', '(151) 423 2813', '70 Aigburth Rd, Aigburth', NULL, '2023-01-31 10:33:37', '2023-02-06 18:57:10');
INSERT INTO `users` VALUES (18, 'ROLE_USER', 'jialuzhou9@mail.com', 'XGF328OZus', 'lh9zrINRFu', 'Zhou Jialun', '5785 545409', '235 Silver St, Newnham', NULL, '2023-01-04 02:58:14', '2023-02-05 08:55:05');
INSERT INTO `users` VALUES (19, 'ROLE_USER', 'amarjorie@gmail.com', 't9HQbSG37I', 'KDOLV6fHDG', 'Marjorie Allen', '90-0976-1918', '1-7-9 Saidaiji Akodacho', NULL, '2023-01-28 06:38:53', '2023-02-06 02:29:46');
INSERT INTO `users` VALUES (20, 'ROLE_USER', 'hokada@mail.com', 'e21eEJf36M', 'NX3QWWehTI', 'Okada Hikari', '330-066-1324', '862 Collier Road', NULL, '2023-01-19 15:39:05', '2023-02-03 15:16:02');
INSERT INTO `users` VALUES (21, 'ROLE_USER', 'cailan@yahoo.com', 'XsHsNDOsmI', 'tKSyiNSqB6', 'Cai Lan', '7080 854717', '651 Maddox Street', NULL, '2023-01-20 09:48:12', '2023-02-06 18:23:15');
INSERT INTO `users` VALUES (22, 'ROLE_USER', 'wyunfat518@gmail.com', 'aLrluPnm36', 'eUViQeqb6X', 'Wong Yun Fat', '(116) 063 4861', '810 Wyngate Dr', NULL, '2023-01-22 17:43:25', '2023-02-05 13:52:07');
INSERT INTO `users` VALUES (23, 'ROLE_USER', 'gujiehong83@gmail.com', 'LxENVRgOSI', 'fBrHTPyJsn', 'Gu Jiehong', '74-826-5438', '17 1-1 Honjocho, Yamatokoriyama', NULL, '2023-01-07 09:43:45', '2023-02-05 11:48:46');
INSERT INTO `users` VALUES (24, 'ROLE_USER', 'murraygladys1988@icloud.com', 'eh4ZwEGAIN', 'nTHS5dx0Zl', 'Gladys Murray', '70-6520-4812', '6-1-9, Miyanomori 4 Jō, Chuo Ward', NULL, '2023-01-16 03:35:08', '2023-02-09 20:22:54');
INSERT INTO `users` VALUES (25, 'ROLE_USER', 'stephanie53@icloud.com', 'xbAKGOb6I4', 'wpVPCJvDHe', 'Stephanie Chavez', '212-182-5980', '174 West Houston Street', NULL, '2023-01-05 04:52:27', '2023-02-03 06:34:00');
INSERT INTO `users` VALUES (26, 'ROLE_USER', 'price50@outlook.com', 'ZhgnbIHl1J', 'Wh5dpCEGne', 'Cynthia Price', '66-305-8438', '4-9-15 Kamihigashi, Hirano Ward', NULL, '2023-01-26 09:07:19', '2023-02-08 23:47:59');
INSERT INTO `users` VALUES (27, 'ROLE_USER', 'himaruyama1949@yahoo.com', 'iPWUYlPTtF', 'bwRM1SIsOl', 'Maruyama Hikari', '21-048-1847', '388 Hongqiao Rd., Xu Hui District', NULL, '2023-01-17 11:05:55', '2023-02-04 10:53:05');
INSERT INTO `users` VALUES (28, 'ROLE_USER', 'miu78@hotmail.com', 'fzTLNr0DSV', 'wGqSuql6oh', 'Kikuchi Miu', '755-028-5867', '181 W Ring Rd, Buji Town, Longgang', NULL, '2023-01-13 08:07:30', '2023-02-08 05:02:43');
INSERT INTO `users` VALUES (29, 'ROLE_USER', 'wuyuning@hotmail.com', 'E7AQDs9HiH', 'CBjiqmqYZY', 'Wu Yuning', '(151) 149 1963', '137 49/50 Strand, Charing Cross', NULL, '2023-02-02 04:44:06', '2023-02-07 02:11:22');
INSERT INTO `users` VALUES (30, 'ROLE_USER', 'schma82@outlook.com', 'oMNKAo9EjE', '6TOJ6bMd8K', 'Amanda Schmidt', '80-5190-7467', '3-15-8 Ginza, Chuo-ku', NULL, '2023-01-01 04:16:23', '2023-02-06 16:06:13');
INSERT INTO `users` VALUES (31, 'ROLE_USER', 'fangzh@icloud.com', 'DkbebmjWU6', 'AM4l9JZVcV', 'Fang Zhennan', '80-9086-4392', '5-2-18 Kikusui 3 Jo, Shiroishi Ward', NULL, '2023-01-13 02:40:15', '2023-02-08 01:06:22');
INSERT INTO `users` VALUES (32, 'ROLE_USER', 'manfushi@gmail.com', 'DBA0kjm8Ot', 'JitDNEWAcG', 'Man Fu Shing', '(121) 091 1082', '68 Lower Temple Street', NULL, '2023-01-22 16:39:10', '2023-02-09 12:50:23');
INSERT INTO `users` VALUES (33, 'ROLE_USER', 'miurasakura@hotmail.com', 'UyPZ2l9qqZ', 'B7sNrSGAWD', 'Miura Sakura', '7107 163398', '863 Osney Mead', NULL, '2023-01-18 10:35:21', '2023-02-08 08:03:36');
INSERT INTO `users` VALUES (34, 'ROLE_USER', 'hirano513@yahoo.com', 'meSbBxxyr8', 'LtmNfrmk7J', 'Hirano Rin', '(151) 520 4115', '434 Trafalgar Square, Charing Cross', NULL, '2023-01-27 09:46:21', '2023-02-07 19:43:12');
INSERT INTO `users` VALUES (35, 'ROLE_USER', 'rucheng1018@hotmail.com', 'BfjiTspnW3', 'vOchqVdm1U', 'Cheng Rui', '614-916-2153', '775 Wicklow Road', NULL, '2023-01-02 16:26:25', '2023-02-08 01:51:15');
INSERT INTO `users` VALUES (36, 'ROLE_USER', 'carolg5@gmail.com', '6hFGJsnhxp', 'roG4KRqOKd', 'Carolyn Gonzalez', '760-519-1010', '718 Lefeng 6th Rd', NULL, '2023-01-15 14:19:10', '2023-02-09 02:36:59');
INSERT INTO `users` VALUES (37, 'ROLE_USER', 'zitao8@gmail.com', 'orYE1ZHEde', 'JDPNby7eFP', 'Meng Zitao', '11-077-2142', '2-1-6 Kaminopporo 1 Jo, Atsubetsu Ward', NULL, '2023-01-01 18:28:07', '2023-02-09 20:19:27');
INSERT INTO `users` VALUES (38, 'ROLE_USER', 'yunxi2@yahoo.com', '079zyPvTtv', 'HuRsrbsh6Y', 'Xie Yunxi', '5708 686159', '258 Volac Park, Grantchester Rd', NULL, '2023-01-15 19:55:16', '2023-02-03 10:30:37');
INSERT INTO `users` VALUES (39, 'ROLE_USER', 'zhongjiehong7@icloud.com', '6E4KymbNhv', 'nbjiJnLfy2', 'Zhong Jiehong', '7173 984989', '422 Narborough Rd', NULL, '2023-01-21 19:08:04', '2023-02-07 02:54:57');
INSERT INTO `users` VALUES (40, 'ROLE_USER', 'xiaoming905@outlook.com', 'wpZRtibz3C', 'HsCTYp9beT', 'Cui Xiaoming', '(151) 011 3329', '255 Aigburth Rd, Aigburth', NULL, '2023-01-24 14:10:36', '2023-02-05 20:52:27');
INSERT INTO `users` VALUES (41, 'ROLE_USER', 'llei@outlook.com', 'SJh6x2dkZe', 'aC9PWxUSKg', 'Lei Lu', '718-257-7059', '914 Flatbush Ave', NULL, '2023-01-18 22:50:44', '2023-02-07 16:28:52');
INSERT INTO `users` VALUES (42, 'ROLE_USER', 'jielu@mail.com', 'jdb1LsUmJF', 'gBvlZKPDCM', 'Luo Jiehong', '213-984-4991', '320 Grape Street', NULL, '2023-01-31 06:25:39', '2023-02-06 08:20:32');
INSERT INTO `users` VALUES (43, 'ROLE_USER', 'ti1967@yahoo.com', 'TpgY7Afx2p', 'dTR0zOzdy4', 'Ito Takuya', '5673 426413', '4 Silver St, Newnham', NULL, '2023-01-16 00:00:46', '2023-02-03 08:27:41');
INSERT INTO `users` VALUES (44, 'ROLE_USER', 'katherinemitch9@icloud.com', '3zBzaxQNJA', 'R6xo5Exz8I', 'Katherine Mitchell', '189-2999-3420', '222 Tianhe Road, Tianhe District', NULL, '2023-01-29 06:49:57', '2023-02-07 03:09:52');
INSERT INTO `users` VALUES (45, 'ROLE_USER', 'mif@outlook.com', 'o3aotliIHZ', 'xCPvTJNM6w', 'Fung Ming', '171-3119-8013', '311 Qingshuihe 1st Rd, Luohu District', NULL, '2023-01-23 13:22:49', '2023-02-07 10:10:58');
INSERT INTO `users` VALUES (46, 'ROLE_USER', 'jz8@yahoo.com', 'a3WuJk8W6Y', 'JGHWe9eh5X', 'Zheng Jiehong', '21-241-6921', '330 Middle Huaihai Road, Huangpu District', NULL, '2023-01-16 08:05:00', '2023-02-09 04:29:48');
INSERT INTO `users` VALUES (47, 'ROLE_USER', 'kimryo3@gmail.com', 'jPGyMnPSfQ', 'Okbov69R3T', 'Kimura Ryota', '614-003-4528', '1 East Alley', NULL, '2023-01-02 11:03:51', '2023-02-09 00:44:04');
INSERT INTO `users` VALUES (48, 'ROLE_USER', 'tszhhsuan517@hotmail.com', 'LXGcWbTBuh', 'MMubHTpUjM', 'Hsuan Tsz Hin', '(1865) 60 2571', '420 Little Clarendon St', NULL, '2023-01-27 10:25:58', '2023-02-04 19:42:48');
INSERT INTO `users` VALUES (49, 'ROLE_USER', 'ryotatamura811@yahoo.com', 'eARqJKK3t2', 'A4OzjPNkBJ', 'Tamura Ryota', '718-793-5049', '414 Nostrand Ave', NULL, '2023-02-03 22:13:09', '2023-02-07 15:26:10');
INSERT INTO `users` VALUES (50, 'ROLE_USER', 'mokchiuwai65@hotmail.com', 'kDYRsm19BA', 'txvPyX2KCv', 'Mok Chiu Wai', '131-5000-0291', '75 FuXingMenNei Street, XiCheng District', NULL, '2023-01-14 07:19:59', '2023-02-07 16:27:26');
INSERT INTO `users` VALUES (51, 'ROLE_USER', 'tong5@gmail.com', 'WhFs7VbGJL', '2yDZkUudHb', 'Tong Cho Yee', '90-1158-1193', '1-6-4, Marunouchi, Chiyoda-ku', NULL, '2023-01-17 14:48:13', '2023-02-03 22:36:47');
INSERT INTO `users` VALUES (52, 'ROLE_USER', 'xiaoming06@gmail.com', 'a67OwANLaQ', 'CUUaQyKget', 'Tao Xiaoming', '(151) 704 4136', '617 Trafalgar Square, Charing Cross', NULL, '2023-01-17 13:51:48', '2023-02-06 15:32:15');
INSERT INTO `users` VALUES (53, 'ROLE_USER', 'sjames@icloud.com', '9XVXwb7r7l', 'NbfW58bnXP', 'Sandra James', '(161) 087 5489', '729 Spring Gardens', NULL, '2023-01-23 00:16:07', '2023-02-09 17:35:54');
INSERT INTO `users` VALUES (54, 'ROLE_USER', 'xiaoming1020@gmail.com', 'XyZnyKzttb', 'N0fmXK53Mb', 'Huang Xiaoming', '(151) 656 2904', '924 Redfern St', NULL, '2023-01-10 01:01:32', '2023-02-09 08:18:26');
INSERT INTO `users` VALUES (55, 'ROLE_USER', 'kypak1108@hotmail.com', 'wuJV2nBpC7', 'UTEEXjdCHW', 'Pak Kar Yan', '3-9877-4368', '3-15-16 Ginza, Chuo-ku', NULL, '2023-01-31 09:19:33', '2023-02-07 19:21:02');
INSERT INTO `users` VALUES (56, 'ROLE_USER', 'ruiyu@hotmail.com', 'o6qLKFONYg', 'AkkFKUMxaN', 'Yu Rui', '(1223) 52 3343', '959 Volac Park, Grantchester Rd', NULL, '2023-01-19 17:08:01', '2023-02-05 16:06:28');
INSERT INTO `users` VALUES (57, 'ROLE_USER', 'lufan@outlook.com', 'phg7gCRz0Q', '8ZjqQKla30', 'Fan Lu', '148-1790-7652', '947 Dong Zhi Men, Dongcheng District', NULL, '2023-01-31 07:36:01', '2023-02-04 18:02:16');
INSERT INTO `users` VALUES (58, 'ROLE_USER', 'tao80@gmail.com', 'w9SdE5as32', '7pCLybxZC2', 'Tao Chieh Lun', '198-7018-8805', '763 Sanlitun Road, Chaoyang District', NULL, '2023-01-01 20:07:02', '2023-02-06 02:18:03');
INSERT INTO `users` VALUES (59, 'ROLE_USER', 'lamtw2@gmail.com', 'SImZCKcEkM', 'g9oWoEDKEB', 'Lam Tak Wah', '5662 087470', '849 Wyngate Dr', NULL, '2023-02-01 03:13:22', '2023-02-05 09:05:05');
INSERT INTO `users` VALUES (60, 'ROLE_USER', 'kam7@icloud.com', 'LuIzicR7O0', 'p66swGRbIo', 'Kam Chi Ming', '(20) 8525 3215', '712 Regent Street', NULL, '2023-01-17 12:56:57', '2023-02-04 06:15:18');
INSERT INTO `users` VALUES (61, 'ROLE_USER', 'mkikuchi@gmail.com', '1OhJ34TbYJ', 'PlSux4OK4E', 'Kikuchi Miu', '718-954-6331', '565 Columbia St', NULL, '2023-01-27 14:44:30', '2023-02-07 23:45:42');
INSERT INTO `users` VALUES (62, 'ROLE_USER', 'orrita@outlook.com', 'sOSMbK6NS6', 'HxGq3skFKN', 'Rita Ortiz', '769-022-3196', '249 Dongtai 5th St', NULL, '2023-01-04 09:57:26', '2023-02-07 21:06:10');
INSERT INTO `users` VALUES (63, 'ROLE_USER', 'lan1964@yahoo.com', '7Zt1HYeNaQ', 'ZFCjdRwPfh', 'Mao Lan', '(1223) 84 9621', '195 Volac Park, Grantchester Rd', NULL, '2023-01-31 05:35:48', '2023-02-07 15:19:42');
INSERT INTO `users` VALUES (64, 'ROLE_USER', 'rdeng11@outlook.com', 'zxFPJRdEk7', 'tSCub0soQl', 'Deng Rui', '718-251-6207', '533 1st Ave', NULL, '2023-01-10 19:33:04', '2023-02-08 22:35:39');
INSERT INTO `users` VALUES (65, 'ROLE_USER', 'ereynolds@icloud.com', 'dgsTszoDLH', 'zmhopIJFMl', 'Elizabeth Reynolds', '(161) 821 8969', '597 Sackville St', NULL, '2023-02-03 11:14:00', '2023-02-03 14:36:14');
INSERT INTO `users` VALUES (66, 'ROLE_USER', 'wfhsu@outlook.com', 'B0gLZ4CqX4', '6XPGhBThno', 'Hsuan Wing Fat', '80-1597-3874', '6-1-18, Miyanomori 4 Jō, Chuo Ward', NULL, '2023-01-20 12:38:04', '2023-02-08 02:15:58');
INSERT INTO `users` VALUES (67, 'ROLE_USER', 'cheszeyu@gmail.com', 'qz0Nj9PxgU', 'ACQr8xiqdQ', 'Che Sze Yu', '(116) 407 8200', '172 Cyril St, Braunstone Town', NULL, '2023-01-16 15:26:25', '2023-02-06 19:38:43');
INSERT INTO `users` VALUES (68, 'ROLE_USER', 'masongary41@hotmail.com', 'ASnnmhxmwh', 'npIcWn7UCH', 'Gary Mason', '171-9579-6482', '216 Middle Huaihai Road, Huangpu District', NULL, '2023-01-05 23:15:50', '2023-02-07 03:32:20');
INSERT INTO `users` VALUES (69, 'ROLE_USER', 'chincw4@gmail.com', 'Qk85ir6Rrv', 'eOzdma0lTs', 'Chin Chiu Wai', '11-776-2001', '5-4-9 Kikusui 3 Jo, Shiroishi Ward,', NULL, '2023-01-19 20:01:08', '2023-02-03 16:06:43');
INSERT INTO `users` VALUES (70, 'ROLE_USER', 'cwmiu16@gmail.com', '8LCw3W1jew', 'MnDR9UWsWI', 'Miu Chiu Wai', '769-962-4407', '599 Shanhu Rd', NULL, '2023-01-07 02:33:19', '2023-02-03 06:08:06');
INSERT INTO `users` VALUES (71, 'ROLE_USER', 'nhow@yahoo.com', 'Iw91dAeQap', 'zVs1PFNB3B', 'Howard Nguyen', '131-3199-6838', '175 Qingshuihe 1st Rd, Luohu District', NULL, '2023-02-03 20:07:48', '2023-02-06 19:42:03');
INSERT INTO `users` VALUES (72, 'ROLE_USER', 'ruij313@gmail.com', 'MeucUtbEKg', 'FwW8clr6Lf', 'Jin Rui', '11-781-1940', '5-4-9 Kikusui 3 Jo, Shiroishi Ward,', NULL, '2023-01-24 12:56:00', '2023-02-04 08:01:20');
INSERT INTO `users` VALUES (73, 'ROLE_USER', 'shenlan@yahoo.com', 'KfRVAzeNPD', 'tWIGsKKZOX', 'Shen Lan', '70-8505-1087', '6-1-7, Miyanomori 4 Jō, Chuo Ward', NULL, '2023-01-10 16:17:44', '2023-02-09 23:49:52');
INSERT INTO `users` VALUES (74, 'ROLE_USER', 'williams822@yahoo.com', 'kz338FVYsv', 'bWprC2izTI', 'Eleanor Williams', '(161) 481 2067', '183 Sackville St', NULL, '2023-01-09 15:13:54', '2023-02-05 12:51:10');
INSERT INTO `users` VALUES (75, 'ROLE_USER', 'jialun1@gmail.com', 'uV872Gkwav', 'srioLqoUW7', 'Shi Jialun', '(116) 487 2949', '77 Hinckley Rd', NULL, '2023-02-02 04:39:51', '2023-02-08 18:03:40');
INSERT INTO `users` VALUES (76, 'ROLE_USER', 'sotojan@gmail.com', 'BoK8CuAt5P', 'ZTPX3MCSFl', 'Janice Soto', '760-150-6520', '560 Lefeng 6th Rd', NULL, '2023-01-08 03:09:57', '2023-02-07 11:12:51');
INSERT INTO `users` VALUES (77, 'ROLE_USER', 'xiong1988@gmail.com', 'vhM6UzPMYk', '4nYMPVSc2i', 'Xiong Xiuying', '135-5723-7015', '951 Hongqiao Rd., Xu Hui District', NULL, '2023-01-10 18:52:00', '2023-02-04 16:05:50');
INSERT INTO `users` VALUES (78, 'ROLE_USER', 'kaotszching@icloud.com', 'LZ2T9F5Eax', 'fSKlq0Cmw7', 'Kao Tsz Ching', '5832 376840', '590 Cannon Street', NULL, '2023-01-21 20:53:42', '2023-02-04 05:12:47');
INSERT INTO `users` VALUES (79, 'ROLE_USER', 'syk9@yahoo.com', 'yOc0e9CIfH', 'dD7Ta22oQK', 'Kao Sze Yu', '614-338-9218', '88 East Alley', NULL, '2023-01-17 19:33:52', '2023-02-06 04:56:44');
INSERT INTO `users` VALUES (80, 'ROLE_USER', 'kwokmingleung@icloud.com', 'EXiX9XZAci', 'rWN8c1jNc1', 'Leung Kwok Ming', '172-7152-7958', '940 FuXingMenNei Street, XiCheng District', NULL, '2023-01-29 10:44:44', '2023-02-03 14:14:20');
INSERT INTO `users` VALUES (81, 'ROLE_USER', 'wsto@icloud.com', 'CyBvHAJgWt', 'EMYaJa5iMI', 'To Wing Suen', '169-5205-3773', '607 028 County Rd, Yanqing District', NULL, '2023-02-02 22:47:07', '2023-02-09 14:16:22');
INSERT INTO `users` VALUES (82, 'ROLE_USER', 'ikedamisaki1028@outlook.com', 'VLirHsELmT', 'iaxGse0rpS', 'Ikeda Misaki', '(1223) 04 4848', '72 The Pavilion, Lammas Field, Driftway', NULL, '2023-01-04 08:32:26', '2023-02-04 19:16:26');
INSERT INTO `users` VALUES (83, 'ROLE_USER', 'zhozhiyu8@gmail.com', 'UqqT5XOzI6', 'gcKvERHnig', 'Zhou Zhiyuan', '74-605-5743', '10 1-1 Honjocho, Yamatokoriyama', NULL, '2023-01-05 05:24:02', '2023-02-05 01:59:27');
INSERT INTO `users` VALUES (84, 'ROLE_USER', 'tammymorgan02@outlook.com', 'j9XTemS4HN', '7RQmHkO0WQ', 'Tammy Morgan', '(1223) 88 2420', '489 Papworth Rd, Trumpington', NULL, '2023-01-26 20:16:13', '2023-02-03 23:00:21');
INSERT INTO `users` VALUES (85, 'ROLE_USER', 'luhiutung@outlook.com', 'xXr809T1Eg', '7PTCQkvG2x', 'Lui Hiu Tung', '213-589-8039', '491 S Broadway', NULL, '2023-01-14 06:59:25', '2023-02-04 09:09:57');
INSERT INTO `users` VALUES (86, 'ROLE_USER', 'duanzitao427@mail.com', 'Wjvi7VNfUE', '6WUkU6ihbv', 'Duan Zitao', '213-014-8486', '693 Sky Way', NULL, '2023-01-05 12:37:18', '2023-02-06 12:57:10');
INSERT INTO `users` VALUES (87, 'ROLE_USER', 'henryfranc817@gmail.com', 'pWxa2fk50t', 'VBQHdQllZc', 'Francisco Henry', '178-4702-4669', 'No.799, Dongsan Road, Erxianqiao, Chenghua District', NULL, '2023-01-21 16:36:51', '2023-02-07 05:40:43');
INSERT INTO `users` VALUES (88, 'ROLE_USER', 'tinwingyuen@gmail.com', 'kLwXMhBOpa', 'Dbx3CBykCw', 'Yuen Tin Wing', '74-838-7448', '1-7-7 Saidaiji Akodacho', NULL, '2023-01-12 15:41:28', '2023-02-09 22:47:12');
INSERT INTO `users` VALUES (89, 'ROLE_USER', 'kongcw811@mail.com', 'Jlw2NvLUXC', 'ZOfhcONrVW', 'Kong Chiu Wai', '330-368-0030', '642 Collier Road', NULL, '2023-01-24 17:38:49', '2023-02-08 13:05:33');
INSERT INTO `users` VALUES (90, 'ROLE_USER', 'choisk@gmail.com', 'UmHXfikBmv', 'BqE8cgYV02', 'Choi Sze Kwan', '90-1957-0778', '5-4-1 Kikusui 3 Jo, Shiroishi Ward,', NULL, '2023-01-14 18:39:55', '2023-02-09 13:57:48');
INSERT INTO `users` VALUES (91, 'ROLE_USER', 'moriteita@hotmail.com', 'swsd25rCAd', 'Jrrsthxd3q', 'Morita Eita', '52-517-4299', '3 4-20 Kawagishicho, Mizuho Ward', NULL, '2023-01-23 14:53:59', '2023-02-06 14:47:34');
INSERT INTO `users` VALUES (92, 'ROLE_USER', 'patc4@icloud.com', 'ZvRK2UcLPS', 'tv41I7WWGk', 'Pang Tsz Ching', '52-125-6679', '3-19-7 Shimizu, Kita Ward', NULL, '2023-01-28 22:46:27', '2023-02-08 05:03:01');
INSERT INTO `users` VALUES (93, 'ROLE_USER', 'loszekwan@gmail.com', 'jSO8Ktnm06', '8CO4DimzSM', 'Lo Sze Kwan', '7196 339538', '701 Portland St', NULL, '2023-01-18 07:48:15', '2023-02-07 04:13:59');
INSERT INTO `users` VALUES (94, 'ROLE_USER', 'satotsubasa@mail.com', '0YSkrpqcwS', '4Y9bsRYTzA', 'Sato Tsubasa', '141-1554-6568', '525 Jingtian East 1st St, Futian District', NULL, '2023-01-30 10:02:25', '2023-02-07 19:07:54');
INSERT INTO `users` VALUES (95, 'ROLE_USER', 'waihui@outlook.com', 'phFbRcjJAn', 'wTXVQ1jQOf', 'Hui Wai Man', '(116) 006 1216', '356 Wyngate Dr', NULL, '2023-01-31 21:16:37', '2023-02-09 00:13:33');
INSERT INTO `users` VALUES (96, 'ROLE_USER', 'ikknakamura1980@icloud.com', 'SRQEb9qgCD', 'w6tUIJnz1N', 'Nakamura Ikki', '718-039-5575', '403 1st Ave', NULL, '2023-01-12 06:50:19', '2023-02-07 23:18:14');
INSERT INTO `users` VALUES (97, 'ROLE_USER', 'takwahf@gmail.com', 'COgYt5sQwo', 'NNKV8uDIWT', 'Fong Tak Wah', '7966 153038', '574 Spring Gardens', NULL, '2023-01-02 05:38:36', '2023-02-07 07:38:30');
INSERT INTO `users` VALUES (98, 'ROLE_USER', 'ayano926@gmail.com', 'yVedjUDZCr', 'XkMF5rq1UH', 'Ichikawa Ayano', '80-8445-6435', '9 1-1 Honjocho, Yamatokoriyama', NULL, '2023-01-06 00:52:38', '2023-02-08 16:39:25');
INSERT INTO `users` VALUES (99, 'ROLE_USER', 'lu2005@icloud.com', 'i0krD08oSg', 'D4uDzpUIE2', 'Lei Lu', '10-5876-5910', '614 West Chang\'an Avenue, Xicheng District', NULL, '2023-01-13 16:53:54', '2023-02-05 21:19:22');
INSERT INTO `users` VALUES (100, 'ROLE_USER', 'pauline17@yahoo.com', 'Jx8BkOPIW8', 'eoJqFOKhTF', 'Pauline Washington', '212-680-8831', '273 Wooster Street', NULL, '2023-01-03 12:47:14', '2023-02-09 16:41:03');
INSERT INTO `users` VALUES (101, 'ROLE_USER', 'hmarc@hotmail.com', 'Sm32zlCFRC', 'SvkfiEGHns', 'Marcus Hawkins', '70-5731-7691', '2-1-12 Tenjinnomori, Nishinari Ward', NULL, '2023-01-08 01:21:53', '2023-02-06 05:44:15');
INSERT INTO `users` VALUES (103, 'ROLE_USER', 'tungxt0@gmail.com', 'tunght', 'lovecan14', 'Hoàng Thọ Tùng', '012453789', 'Nhân Hòa, Thanh Xuân, Hà Nội', NULL, '2023-02-19 22:50:59', '2023-02-19 22:50:59');

SET FOREIGN_KEY_CHECKS = 1;
