
CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  pseudo VARCHAR(45) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  avatar_url VARCHAR(2048)
);

CREATE TABLE video (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  duration TIME NOT NULL,
  video_url VARCHAR(2048) NOT NULL,
  date DATETIME NOT NULL,
  views INT UNSIGNED NOT NULL DEFAULT 0
);

CREATE TABLE category (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(45) NOT NULL,
  url_image VARCHAR(2048) NOT NULL,
  description TEXT
);

CREATE TABLE playlist (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  id_user INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_user) REFERENCES user(id)
);

CREATE TABLE favorite (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_video INT UNSIGNED NOT NULL,
  id_user INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_video) REFERENCES video(id),
  FOREIGN KEY (id_user) REFERENCES user(id)
);

CREATE TABLE video_category (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_video INT UNSIGNED NOT NULL,
  id_category INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_video) REFERENCES video(id),
  FOREIGN KEY (id_category) REFERENCES category(id)
);

CREATE TABLE video_playlist (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_video INT UNSIGNED NOT NULL,
  id_playlist INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_video) REFERENCES video(id),
  FOREIGN KEY (id_playlist) REFERENCES playlist(id)
);

insert into user(id, email, password)
values
  (1, "jdoe@mail.com", "123456");

insert into item(id, title, user_id)
values
  (1, "Stuff", 1),
  (2, "Doodads", 1);

insert into category(name, url_image)
values
('RPG', 'https://cdn.videas.fr/v-medias/uploads/64889fcb-4e70-4e7e-8f42-919bb92e1a9d')
('MMORPG', 'https://cdn.videas.fr/v-medias/uploads/994a0f37-0db9-4672-80c7-6a07e730d8ac')
('FPS', 'https://cdn.videas.fr/v-medias/uploads/ee847103-6457-4ce1-904b-cf0d81d344bf')
('Action/Aventure', 'https://cdn.videas.fr/v-medias/uploads/4983aa2d-3a64-4d86-918e-ebd8d8807422')
('MOBA', 'https://cdn.videas.fr/v-medias/uploads/59e65c15-ea90-497a-a437-6bddfc136b52')
('Battle Royale', 'https://cdn.videas.fr/v-medias/uploads/03faa454-46d0-4ce1-bd38-960dce7c0779')
('Combat', 'hhttps://cdn.videas.fr/v-medias/uploads/551b0e64-9950-4dab-a4a3-84fee1d2ee89')
('Simulation', 'https://cdn.videas.fr/v-medias/uploads/572ec86d-c9b0-4a12-bf74-26549e5f3daa')
('Sandbox', 'https://cdn.videas.fr/v-medias/uploads/f21c91fa-22b7-4a6e-9363-e40ebf4ca8a5')
('Sport', 'https://cdn.videas.fr/v-medias/uploads/67484d5a-12ff-4482-9631-d647bd5f893f')
('Indie', 'https://cdn.videas.fr/v-medias/uploads/6c3b7f62-3f7a-46d4-8a3e-14a71fb5e6f2');