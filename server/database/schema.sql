
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

insert into category(id, name, url_image, description)
value 
(1, "RPG", "", "Plonge dans des aventures épiques et façonne ton héros pour des moments palpitants !")
(2, "MMORPG", "", "Explore un monde infini, découvre de nouvelles zones et forge des alliances avec des joueurs !")
(3, "FPS", "", "Améliore ta visée, maîtrise les techniques et deviens invincible dans les affrontements !")
(4, "Battle Royale", "", "Suis nos conseils pour survivre, devenir stratège et remporter la victoire en solo ou en équipe !")
(5, "Sport", "", "Ressens l'adrénaline du sport et participe à des compétitions palpitantes avec des amis !")
(6, "Stratégie / Gestion", "", "Apprends à gérer des ressources et des tactiques pour dominer l'univers du jeu !")
(7, "Sandbox", "", "Découvre des astuces pour créer, explorer et façonner un monde ouvert à ton image !")
(8, "Action / Aventure", "", "Trouve des stratégies pour explorer des mondes, combattre et réussir tes missions !")
(9, "Combat", "", "Participe à des combats intenses et défie tes adversaires dans des duels passionnants !")
(10, "Indie", "", "Explore des jeux originaux et innovants, créés par des développeurs passionnés !")
(11, "MOBA", "", "Maîtrise les héros, perfectionne tes tactiques et mène ton équipe à la victoire !")
(12, "Simulation", "", "Suis nos astuces pour vivre des expériences réalistes et immersives dans chaque simulation !")