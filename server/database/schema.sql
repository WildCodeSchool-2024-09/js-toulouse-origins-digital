CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  pseudo VARCHAR(45) NOT NULL DEFAULT "Utilisateur",
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  avatar_url VARCHAR(2048)
);

CREATE TABLE video (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
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

CREATE TABLE favorite (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_video INT UNSIGNED NOT NULL,
  id_user INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_video) REFERENCES video(id)
  ON DELETE CASCADE,
  FOREIGN KEY (id_user) REFERENCES user(id)
);

CREATE TABLE video_category (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_video INT UNSIGNED NOT NULL,
  id_category INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_video) REFERENCES video(id)
  ON DELETE CASCADE,
  FOREIGN KEY (id_category) REFERENCES category(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
 );

CREATE TABLE playlist (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  id_user INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_user) REFERENCES user(id)
  ON DELETE CASCADE
);

CREATE TABLE video_playlist (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_video INT UNSIGNED NOT NULL,
  id_playlist INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_video) REFERENCES video(id)
  ON DELETE CASCADE,
  FOREIGN KEY (id_playlist) REFERENCES playlist(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


INSERT INTO category(name, url_image, description)
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

INSERT INTO video (title, description, video_url, date, views) VALUES
('Chef RPG', 'Chef RPG : Construisez votre empire culinaire. Prenez les rênes d''un restaurant dans un monde ouvert RPG. Parcourez des villages pittoresques pour récolter des ingrédients frais et impressionnez vos clients. Stratégie, exploration et cuisine se rencontrent dans cette aventure unique.', 'https://app.videas.fr/embed/media/217e7081-eaa2-4eb8-ae75-17c2af5a364d/', "2025-02-01 14:30:00", 0),
('Fable 4', 'Fable 4 : La magie et les choix d''un monde fantastique. Retournez à Albion dans cette suite tant attendue. Forgez votre légende en explorant un monde ouvert vivant et rempli d''aventures. Chaque décision que vous prenez influencera votre destin et celui du royaume.', 'https://app.videas.fr/embed/media/345739a4-1dec-489b-85e3-cb2e2f0875af/', "2025-01-15 20:30:06", 0),
('Super Mario RPG', 'Super Mario RPG : L’aventure légendaire renaît. Découvrez ou redécouvrez l’un des classiques de Mario avec une touche de RPG. Plongez dans une quête captivante avec Mario, Bowser et la princesse Peach. Une combinaison parfaite d''action, de stratégie et de nostalgie.', 'https://app.videas.fr/embed/media/05bbfb5f-22a8-4da0-bd26-318c2bd00395/', "2024-10-24 01:20:50", 0),
('Illusion Carnival', 'Illusion Carnival : Un voyage dans l''étrange et le mystérieux. Entrez dans un carnaval fantastique où rien n''est ce qu''il paraît. Résolvez des énigmes complexes et révélez des secrets cachés. Une expérience immersive et captivante pour les amateurs de mystères.', 'https://app.videas.fr/embed/media/04989c8d-19e1-44d9-9a24-733f0d3b7e73/', "2024-03-15 08:28:36", 0),
('PROJECT HP', 'PROJECT HP : Batailles médiévales réinventées. Plongez dans un monde où magie et combat médiéval fusionnent. Prenez part à des batailles épiques avec des personnages puissants et des stratégies uniques. Un mélange captivant d''action et de tactique.', 'https://app.videas.fr/embed/media/b64517c2-ca89-44ef-8059-9f369d3d318a/', "2024-07-25 09:57:23", 0),
('Throne and Liberty', 'Throne and Liberty : Luttez pour le pouvoir dans un univers fantastique. Explorez un monde ouvert gigantesque rempli de quêtes, de batailles et d''intrigues. Forgez des alliances, défiez des ennemis redoutables et bâtissez votre empire. Un MMORPG épique qui repousse les limites du genre.', 'https://app.videas.fr/embed/media/bd151759-bc01-4c1a-9ca2-14de78335896/', "2025-02-16 10:34:20", 0),
('Wakfu', 'Wakfu : Une aventure RPG stratégique et envoûtante. Partez à la découverte de contrées magiques dans Wakfu. Rejoignez des compagnons, combattez des ennemis et découvrez des mystères anciens. Un RPG tactique et coloré à l''humour unique.', 'https://app.videas.fr/embed/media/3785f737-4c9d-4ea1-a21e-8a98b9b5058b/', "2025-01-12 11:04:23", 0),
('Eden Eternal', 'Eden Eternal : Aventurez-vous dans un monde magique et vibrant. Créez votre héros, changez de classe et partez explorer un univers fantastique. Combattez des boss puissants et formez des alliances stratégiques. Une aventure MMORPG inoubliable qui offre une liberté totale.', 'https://app.videas.fr/embed/media/a0d4d45d-edc9-47fe-b2ed-778f27587220/', "2025-02-01 15:19:00", 0),
('Shadowgun Legends', 'Shadowgun Legends : Combattez pour votre survie dans un futur dystopique. Affrontez des hordes d''ennemis dans un monde de science-fiction époustouflant. Débloquez des armes futuristes et gravissez les échelons pour devenir une légende. Un FPS intense et palpitant.', 'https://app.videas.fr/embed/media/ce8bd78e-5747-4316-b007-53155f93dcde/', "2025-02-01 18:30:00", 0),
('Bright Memory Infinite', 'Bright Memory Infinite : Une aventure d''action futuriste spectaculaire. Combinez compétences et armes dans ce jeu d''action rapide. Explorez un monde où la science et le surnaturel se mêlent. Une expérience visuellement impressionnante et dynamique.', 'https://app.videas.fr/embed/media/0cacf9cb-008b-46ae-b8ca-3a1fa42de63e/', "2025-02-01 14:30:00", 0),
('Unrecord', 'Unrecord : Enquêtez dans un FPS ultra réaliste. Plongez dans la peau d''un détective dans ce FPS captivant. Résolvez des crimes en utilisant des compétences d''observation et de stratégie. Une immersion totale grâce à ses graphismes époustouflants.', 'https://app.videas.fr/embed/media/c228cfab-cc65-4bf7-9bd0-5c8c8e400d0a/', "2024-07-25 09:57:23", 0),
('Mouse P.I. For Hire', 'Mouse P.I. For Hire : Résolvez des mystères avec une touche de fun. Incarnez une souris détective dans des enquêtes pleines d''humour et de défis. Parcourez des scènes complexes et interrogez des témoins pour élucider des affaires. Un jeu unique qui mêle casse-têtes et aventure.', 'https://app.videas.fr/embed/media/8099ecfd-2b52-42fc-88f6-d8af68d82db2/', "2025-01-12 11:04:23", 0),
('Mullet Madjack', 'Mullet Madjack : Une aventure rétro pleine d''action. Rejoignez Madjack dans des niveaux remplis d''action et de surprises. Combattez des ennemis loufoques avec des armes uniques. Une expérience nostalgique qui célèbre les jeux d''arcade classiques.', 'https://app.videas.fr/embed/media/8ff91c36-d154-4635-9faa-536b24dd5b21/', "2025-02-01 14:30:00", 0),
('Fortnite Balistic', 'Découvrez les nouveautés de Fortnite avec des armes inédites et des lieux à explorer. Dominez vos adversaires dans des combats intenses et stratégiques. La bataille royale la plus populaire continue d''évoluer.', 'https://app.videas.fr/embed/media/6399eea2-41ef-4840-ad91-3dfb386ba45c/', "2025-02-16 10:34:20", 0);

INSERT INTO video_category (id_video, id_category) VALUES
-- Chef RPG
(1, 1),

-- Fable 4 
(2, 1), (2, 4),

-- Super Mario RPG
(3, 1),

-- Illusion Carnival
(4, 1), (4, 4), (4, 12),

-- PROJECT HP
(5, 2), (5, 4),

-- Throne and Liberty
(6, 2),

-- Wakfu
(7, 2),

-- Eden Eternal
(8, 2), (8, 4),

-- Shadowgun Legends
(9, 2), (9, 3),

-- Bright Memory Infinite
(10, 3), (10, 4),

-- Unrecord
(11, 3),

-- Mouse P.I. For Hire
(12, 3),

-- Mullet Madjack
(13, 3), (13, 7),

-- Fortnite Balistic
(14, 6);

INSERT INTO user (email, hashed_password, pseudo, is_admin, avatar_url) VALUES
('admin@jestone.com', '$argon2id$v=19$m=19456,t=2,p=1$mPhIaR4bxOjhqIY9Pdfq/Q$S++1Gr5bdkAVk9HD/gMfd24w+r0mQAODPdQMR1v0BPA', 'Admin', TRUE, 'https://img.freepik.com/vecteurs-libre/jeu-astronaute-mignon-joystick-casque-dessin-anime-icone-vectorielle-illustration-science-techno_138676-9648.jpg'),
('tom.schricke@gmail.com', '1234', 'Toto', FALSE, 'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP2136-CUSA02727_00-AV00000000000061/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000');
