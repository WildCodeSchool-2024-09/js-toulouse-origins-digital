CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  pseudo VARCHAR(45) NOT NULL DEFAULT "Utilisateur",
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  avatar_url VARCHAR(2048)
);

CREATE TABLE video (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  duration TIME NOT NULL,
  video_url VARCHAR(2048) NOT NULL,
  miniature_url VARCHAR(2048),
  date DATETIME NOT NULL,
  views INT UNSIGNED NOT NULL DEFAULT 0
);

CREATE TABLE category (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(45) NOT NULL,
  url_image VARCHAR(2048) NOT NULL,
  description TEXT
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

CREATE TABLE playlist (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  id_user INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_user) REFERENCES user(id)
);

CREATE TABLE video_playlist (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_video INT UNSIGNED NOT NULL,
  id_playlist INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_video) REFERENCES video(id),
  FOREIGN KEY (id_playlist) REFERENCES playlist(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


insert into category(name, url_image, description)
values
('RPG', 'https://cdn.videas.fr/v-medias/uploads/64889fcb-4e70-4e7e-8f42-919bb92e1a9d', "Plonge dans des aventures épiques et façonne ton héros pour des moments palpitants !"),
('MMORPG', 'https://cdn.videas.fr/v-medias/uploads/994a0f37-0db9-4672-80c7-6a07e730d8ac', "Explore un monde infini, découvre de nouvelles zones et forge des alliances avec des joueurs !"),
('FPS', 'https://cdn.videas.fr/v-medias/uploads/ee847103-6457-4ce1-904b-cf0d81d344bf', "Améliore ta visée, maîtrise les techniques et deviens invincible dans les affrontements !"),
('Action/Aventure', 'https://cdn.videas.fr/v-medias/uploads/4983aa2d-3a64-4d86-918e-ebd8d8807422', "Trouve des stratégies pour explorer des mondes, combattre et réussir tes missions !"),
('MOBA', 'https://cdn.videas.fr/v-medias/uploads/59e65c15-ea90-497a-a437-6bddfc136b52', "Maîtrise les héros, perfectionne tes tactiques et mène ton équipe à la victoire !"),
('Battle Royale', 'https://cdn.videas.fr/v-medias/uploads/03faa454-46d0-4ce1-bd38-960dce7c0779', "Suis nos conseils pour survivre, devenir stratège et remporter la victoire en solo ou en équipe !"),
('Combat', 'https://cdn.videas.fr/v-medias/uploads/551b0e64-9950-4dab-a4a3-84fee1d2ee89', "Participe à des combats intenses et défie tes adversaires dans des duels passionnants !"),
('Stratégie / Gestion', 'https://cdn.videas.fr/v-medias/uploads/9352dc06-0990-4672-ba18-8752ae8dd7cc',"Apprends à gérer des ressources et des tactiques pour dominer l’univers du jeu !"),
('Simulation', 'https://cdn.videas.fr/v-medias/uploads/572ec86d-c9b0-4a12-bf74-26549e5f3daa', "Suis nos astuces pour vivre des expériences réalistes et immersives dans chaque simulation !"),
('Sandbox', 'https://cdn.videas.fr/v-medias/uploads/f21c91fa-22b7-4a6e-9363-e40ebf4ca8a5', "Découvre des astuces pour créer, explorer et façonner un monde ouvert à ton image !"),
('Sport', 'https://cdn.videas.fr/v-medias/uploads/67484d5a-12ff-4482-9631-d647bd5f893f', "Ressens l'adrénaline du sport et participe à des compétitions palpitantes avec des amis !"),
('Indie', 'https://cdn.videas.fr/v-medias/uploads/6c3b7f62-3f7a-46d4-8a3e-14a71fb5e6f2', "Explore des jeux originaux et innovants, créés par des développeurs passionnés !");

INSERT INTO user (email, password, pseudo, is_admin, avatar_url) VALUES
('example@example.com', 'hashed_password', 'Player1', FALSE, 'https://example.com/avatar.png'),
('example2@example.com', 'hashed_password', 'Player2', FALSE, 'https://example.com/avatar.png');

INSERT INTO playlist (name, id_user) VALUES
('Action', 1),
('Aventure', 1),
('RPG', 1),
('FPS', 1),
('Stratégie', 1),
('Simulation', 1),
('Course', 1),
('Puzzle', 1),
('Horreur', 1),
('Multijoueur en ligne', 1),
('Action', 2),
('Aventure', 2),
('RPG', 2),
('FPS', 2);

insert into video(title, description, duration, video_url, date, views) values
('The Witcher 3: Wild Hunt', 'The Witcher 3: Wild Hunt est un jeu vidéo de rôle développé par CD Projekt RED. Il est sorti le 19 mai 2015 sur Microsoft Windows, PlayStation 4 et Xbox One, puis sur Nintendo Switch le 15 octobre 2019.', '00:03:00', 'https://app.videas.fr/embed/media/6eac5642-9cc6-4f89-80d8-cbef13ebeaed/','2025-01-16','0'),
('The Witcher 3: Wild Hunt', 'The Witcher 3: Wild Hunt est un jeu vidéo de rôle développé par CD Projekt RED. Il est sorti le 19 mai 2015 sur Microsoft Windows, PlayStation 4 et Xbox One, puis sur Nintendo Switch le 15 octobre 2019.', '00:03:00', 'https://app.videas.fr/embed/media/1e00fb97-fcc5-4a58-9593-f8dfe7b04ca4/','2025-01-16','0'),
('The Witcher 3: Wild Hunt', 'The Witcher 3: Wild Hunt est un jeu vidéo de rôle développé par CD Projekt RED. Il est sorti le 19 mai 2015 sur Microsoft Windows, PlayStation 4 et Xbox One, puis sur Nintendo Switch le 15 octobre 2019.', '00:03:00', 'https://app.videas.fr/embed/media/8cff09c4-1ea6-4d26-bb64-6c81e46faaf7/','2025-01-16','0');

insert into video_playlist(id_video, id_playlist) values
(2, 3),
(1, 2),
(2, 2),
(1, 3),
(3, 3);

select * from video_playlist;