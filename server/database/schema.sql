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

INSERT INTO video (title, description, duration, video_url, date, views) VALUES
("Chef RPG", "Chef RPG : Construisez votre empire culinaire. Prenez les rênes d'un restaurant dans un monde ouvert RPG. Parcourez des villages pittoresques pour récolter des ingrédients frais et impressionnez vos clients. Stratégie, exploration et cuisine se rencontrent dans cette aventure unique.", "00:00:00", "https://app.videas.fr/embed/media/217e7081-eaa2-4eb8-ae75-17c2af5a364d/", NOW(), 0),
("Fable 4", "Fable 4 : La magie et les choix d’un monde fantastique. Retournez à Albion dans cette suite tant attendue. Forgez votre légende en explorant un monde ouvert vivant et rempli d'aventures. Chaque décision que vous prenez influencera votre destin et celui du royaume.", "00:00:00", "https://app.videas.fr/embed/media/345739a4-1dec-489b-85e3-cb2e2f0875af/", NOW(), 0),
("Super Mario RPG", "Super Mario RPG : L’aventure légendaire renaît. Découvrez ou redécouvrez l’un des classiques de Mario avec une touche de RPG. Plongez dans une quête captivante avec Mario, Bowser et la princesse Peach. Une combinaison parfaite d’action, de stratégie et de nostalgie.", "00:00:00", "https://app.videas.fr/embed/media/05bbfb5f-22a8-4da0-bd26-318c2bd00395/", NOW(), 0),
("Illusion Carnival", "Illusion Carnival : Un voyage dans l’étrange et le mystérieux. Entrez dans un carnaval fantastique où rien n'est ce qu'il paraît. Résolvez des énigmes complexes et révélez des secrets cachés. Une expérience immersive et captivante pour les amateurs de mystères.", "00:00:00", "https://app.videas.fr/embed/media/04989c8d-19e1-44d9-9a24-733f0d3b7e73/", NOW(), 0),
("PROJECT HP", "PROJECT HP : Batailles médiévales réinventées. Plongez dans un monde où magie et combat médiéval fusionnent. Prenez part à des batailles épiques avec des personnages puissants et des stratégies uniques. Un mélange captivant d'action et de tactique.", "00:00:00", "https://app.videas.fr/embed/media/b64517c2-ca89-44ef-8059-9f369d3d318a/", NOW(), 0),
("Throne and Liberty", "Throne and Liberty : Luttez pour le pouvoir dans un univers fantastique. Explorez un monde ouvert gigantesque rempli de quêtes, de batailles et d'intrigues. Forgez des alliances, défiez des ennemis redoutables et bâtissez votre empire. Un MMORPG épique qui repousse les limites du genre.", "00:00:00", "https://app.videas.fr/embed/media/bd151759-bc01-4c1a-9ca2-14de78335896/", NOW(), 0),
("Wakfu", "Wakfu : Une aventure RPG stratégique et envoûtante. Partez à la découverte de contrées magiques dans Wakfu. Rejoignez des compagnons, combattez des ennemis et découvrez des mystères anciens. Un RPG tactique et coloré à l'humour unique.", "00:00:00", "https://app.videas.fr/embed/media/3785f737-4c9d-4ea1-a21e-8a98b9b5058b/", NOW(), 0),
("Eden Eternal", "Eden Eternal : Aventurez-vous dans un monde magique et vibrant. Créez votre héros, changez de classe et partez explorer un univers fantastique. Combattez des boss puissants et formez des alliances stratégiques. Une aventure MMORPG inoubliable qui offre une liberté totale.", "00:00:00", "https://app.videas.fr/embed/media/a0d4d45d-edc9-47fe-b2ed-778f27587220/", NOW(), 0),
("Shadowgun Legends", "Shadowgun Legends : Combattez pour votre survie dans un futur dystopique. Affrontez des hordes d'ennemis dans un monde de science-fiction époustouflant. Débloquez des armes futuristes et gravissez les échelons pour devenir une légende. Un FPS intense et palpitant.", "00:00:00", "https://app.videas.fr/embed/media/ce8bd78e-5747-4316-b007-53155f93dcde/", NOW(), 0),
("Bright Memory Infinite", "Bright Memory Infinite : Une aventure d'action futuriste spectaculaire. Combinez compétences et armes dans ce jeu d'action rapide. Explorez un monde où la science et le surnaturel se mêlent. Une expérience visuellement impressionnante et dynamique.", "00:00:00", "https://app.videas.fr/embed/media/0cacf9cb-008b-46ae-b8ca-3a1fa42de63e/", NOW(), 0),
("Unrecord", "Unrecord : Enquêtez dans un FPS ultra réaliste. Plongez dans la peau d'un détective dans ce FPS captivant. Résolvez des crimes en utilisant des compétences d’observation et de stratégie. Une immersion totale grâce à ses graphismes époustouflants.", "00:00:00", "https://app.videas.fr/embed/media/c228cfab-cc65-4bf7-9bd0-5c8c8e400d0a/", NOW(), 0),
("Mouse P.I. For Hire", "Mouse P.I. For Hire : Résolvez des mystères avec une touche de fun. Incarnez une souris détective dans des enquêtes pleines d'humour et de défis. Parcourez des scènes complexes et interrogez des témoins pour élucider des affaires. Un jeu unique qui mêle casse-têtes et aventure.", "00:00:00", "https://app.videas.fr/embed/media/8099ecfd-2b52-42fc-88f6-d8af68d82db2/", NOW(), 0),
("Mullet Madjack", "Mullet Madjack : Une aventure rétro pleine d'action. Rejoignez Madjack dans des niveaux remplis d'action et de surprises. Combattez des ennemis loufoques avec des armes uniques. Une expérience nostalgique qui célèbre les jeux d'arcade classiques.", "00:00:00", "https://app.videas.fr/embed/media/8ff91c36-d154-4635-9faa-536b24dd5b21/", NOW(), 0),
("Fortnite Balistic", "Découvrez les nouveautés de Fortnite avec des armes inédites et des lieux à explorer. Dominez vos adversaires dans des combats intenses et stratégiques. La bataille royale la plus populaire continue d’évoluer.", "00:00:00", "https://app.videas.fr/embed/media/6399eea2-41ef-4840-ad91-3dfb386ba45c/", NOW(), 0);

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


/*
insert into video(title, description, duration, video_url, date, views)
values
("Chef RPG : Construisez votre empire culinaire",
"Prenez les rênes d'un restaurant dans un monde ouvert RPG. Parcourez des villages pittoresques pour récolter des ingrédients frais et impressionnez vos clients. Stratégie, exploration et cuisine se rencontrent dans cette aventure unique.",
"00:02:30",
"https://app.videas.fr/embed/media/217e7081-eaa2-4eb8-ae75-17c2af5a364d/",
NOW(),
0),

("Fable 4 : La magie et les choix d'un monde fantastique",
"Retournez à Albion dans cette suite tant attendue. Forgez votre légende en explorant un monde ouvert vivant et rempli d'aventures. Chaque décision que vous prenez influencera votre destin et celui du royaume.",
"00:02:45",
"https://app.videas.fr/embed/media/345739a4-1dec-489b-85e3-cb2e2f0875af/",
NOW(),
0),

("Super Mario RPG : L'aventure légendaire renaît",
"Découvrez ou redécouvrez l'un des classiques de Mario avec une touche de RPG. Plongez dans une quête captivante avec Mario, Bowser et la princesse Peach. Une combinaison parfaite d'action, de stratégie et de nostalgie.",
"00:02:15",
"https://app.videas.fr/embed/media/05bbfb5f-22a8-4da0-bd26-318c2bd00395/",
NOW(),
0),

("Illusion Carnival : Un voyage dans l'étrange et le mystérieux",
"Entrez dans un carnaval fantastique où rien n'est ce qu'il paraît. Résolvez des énigmes complexes et révélez des secrets cachés. Une expérience immersive et captivante pour les amateurs de mystères.",
"00:02:30",
"https://app.videas.fr/embed/media/04989c8d-19e1-44d9-9a24-733f0d3b7e73/",
NOW(),
0),

("PROJECT HP : Batailles médiévales réinventées",
"Plongez dans un monde où magie et combat médiéval fusionnent. Prenez part à des batailles épiques avec des personnages puissants et des stratégies uniques. Un mélange captivant d'action et de tactique.",
"00:02:40",
"https://app.videas.fr/embed/media/b64517c2-ca89-44ef-8059-9f369d3d318a/",
NOW(),
0),

("Throne and Liberty : Luttez pour le pouvoir dans un univers fantastique",
"Explorez un monde ouvert gigantesque rempli de quêtes, de batailles et d'intrigues. Forgez des alliances, défiez des ennemis redoutables et bâtissez votre empire. Un MMORPG épique qui repousse les limites du genre.",
"00:02:35",
"https://app.videas.fr/embed/media/bd151759-bc01-4c1a-9ca2-14de78335896/",
NOW(),
0),

("Wakfu : Une aventure RPG stratégique et envoûtante",
"Partez à la découverte de contrées magiques dans Wakfu. Rejoignez des compagnons, combattez des ennemis et découvrez des mystères anciens. Un RPG tactique et coloré à l'humour unique.",
"00:02:25",
"https://app.videas.fr/embed/media/3785f737-4c9d-4ea1-a21e-8a98b9b5058b/",
NOW(),
0),

("Eden Eternal : Aventurez-vous dans un monde magique et vibrant",
"Créez votre héros, changez de classe et partez explorer un univers fantastique. Combattez des boss puissants et formez des alliances stratégiques. Une aventure MMORPG inoubliable qui offre une liberté totale.",
"00:02:50",
"https://app.videas.fr/embed/media/a0d4d45d-edc9-47fe-b2ed-778f27587220/",
NOW(),
0),

("Shadowgun Legends : Combattez pour votre survie dans un futur dystopique",
"Affrontez des hordes d'ennemis dans un monde de science-fiction époustouflant. Débloquez des armes futuristes et gravissez les échelons pour devenir une légende. Un FPS intense et palpitant.",
"00:02:30",
"https://app.videas.fr/embed/media/ce8bd78e-5747-4316-b007-53155f93dcde/",
NOW(),
0),

("Bright Memory Infinite : Une aventure d'action futuriste spectaculaire",
"Combinez compétences et armes dans ce jeu d'action rapide. Explorez un monde où la science et le surnaturel se mêlent. Une expérience visuellement impressionnante et dynamique.",
"00:02:20",
"https://app.videas.fr/embed/media/0cacf9cb-008b-46ae-b8ca-3a1fa42de63e/",
NOW(),
0),

("Unrecord : Enquêtez dans un FPS ultra réaliste",
"Plongez dans la peau d'un détective dans ce FPS captivant. Résolvez des crimes en utilisant des compétences d'observation et de stratégie. Une immersion totale grâce à ses graphismes époustouflants.",
"00:02:15",
"https://app.videas.fr/embed/media/c228cfab-cc65-4bf7-9bd0-5c8c8e400d0a/",
NOW(),
0),

("Mouse P.I. For Hire : Résolvez des mystères avec une touche de fun",
"Incarnez une souris détective dans des enquêtes pleines d'humour et de défis. Parcourez des scènes complexes et interrogez des témoins pour élucider des affaires. Un jeu unique qui mêle casse-têtes et aventure.",
"00:02:35",
"https://app.videas.fr/embed/media/8099ecfd-2b52-42fc-88f6-d8af68d82db2/",
NOW(),
0),

("Mullet Madjack : Une aventure rétro pleine d'action",
"Rejoignez Madjack dans des niveaux remplis d'action et de surprises. Combattez des ennemis loufoques avec des armes uniques. Une expérience nostalgique qui célèbre les jeux d'arcade classiques.",
"00:02:45",
"https://app.videas.fr/embed/media/8ff91c36-d154-4635-9faa-536b24dd5b21/",
NOW(),
0),

("Fortnite Ballistic : La nouvelle saison explosive",
"Découvrez les nouveautés de Fortnite avec des armes inédites et des lieux à explorer. Dominez vos adversaires dans des combats intenses et stratégiques. La bataille royale la plus populaire continue d'évoluer.",
"00:02:30",
"https://app.videas.fr/embed/media/6399eea2-41ef-4840-ad91-3dfb386ba45c/",
NOW(),
0),

("Battlefield Hardline : Affrontez le chaos urbain",
"Entrez dans un champ de bataille moderne où policiers et criminels s'affrontent. Utilisez un arsenal varié pour triompher dans des missions explosives. Une version unique de la franchise Battlefield.",
"00:02:40",
"https://app.videas.fr/embed/media/467c35ec-9a72-4c3f-a3d6-cce5e68c7653/",
NOW(),
0),

("Farming Simulator 25 : Cultivez, récoltez et gérez votre ferme",
"Plongez dans la vie d'un agriculteur avec des machines modernes et des cultures variées. Gérez vos terres et développez votre exploitation agricole. Une expérience réaliste et apaisante.",
"00:02:30",
"https://app.videas.fr/embed/media/3ee00806-a62a-4298-8b23-71dd3633f293/",
NOW(),
0),

("Bullet Force : FPS compétitif en ligne",
"Engagez-vous dans des combats rapides et stratégiques contre d'autres joueurs. Débloquez des armes personnalisables et maîtrisez différents styles de jeu. Un FPS dynamique qui met vos réflexes à l'épreuve.",
"00:02:20",
"https://app.videas.fr/embed/media/ba1cebcb-77f3-4dfd-92eb-4755ff5967da/",
NOW(),
0),

("Ready or Not : L'expérience ultime des forces spéciales",
"Rejoignez une unité SWAT et menez des missions tactiques à haut risque. Chaque décision compte dans cet FPS réaliste et immersif. Une aventure palpitante pour les amateurs de stratégie et d'action.",
"00:02:45",
"https://app.videas.fr/embed/media/654f1d94-1c77-49b7-ac99-fab469cd85bc/",
NOW(),
0),

("Marvel's Spider-Man 2 : Une double dose de super-héros",
"Incarnez Peter Parker et Miles Morales dans cette suite spectaculaire. Explorez une ville de New York riche en détails et affrontez des ennemis redoutables. L'action et l'émotion sont au rendez-vous.",
"00:02:35",
"https://app.videas.fr/embed/media/dfdb6573-ac6c-463e-8994-af8020867aa3/",
NOW(),
0),

("OPEN : Un monde d'aventure et de créativité",
"Découvrez un jeu ouvert où tout est possible. Construisez, explorez et laissez libre cours à votre imagination. Une expérience captivante pour les esprits créatifs.",
"00:02:25",
"https://app.videas.fr/embed/media/0ce7add0-1397-4f8c-b467-9357bb30f997/",
NOW(),
0),

("Bloodhunt : Affrontez vos rivaux dans une bataille vampirique",
"Participez à une bataille royale unique dans l'univers de Vampire: The Masquerade. Utilisez vos pouvoirs surnaturels pour dominer vos adversaires.",
"00:02:30",
"https://app.videas.fr/embed/media/2fd21b8b-baea-43ee-ba9b-5e08ccf84460/",
NOW(),
0),

("Valhall : Les légendes nordiques à l'honneur",
"Rejoignez les guerriers vikings dans des batailles épiques. Explorez un monde fantastique inspiré de la mythologie nordique. Combat, stratégie et exploration s'entrelacent dans ce jeu captivant.",
"00:02:40",
"https://app.videas.fr/embed/media/c9a2908a-f38d-4993-ac99-43f2a61035ed/",
NOW(),
0),

("FC25 : Le football à son meilleur",
"Prenez part à des matchs réalistes et vivez la passion du football. Créez votre équipe, perfectionnez vos stratégies et visez la victoire. Une simulation sportive incontournable pour les amateurs de ballon rond.",
"00:02:15",
"https://app.videas.fr/embed/media/cfde12d8-4346-41f2-a0eb-784c6c447410/",
NOW(),
0),

("GT Sport : L'expérience ultime des courses automobiles",
"Prenez le volant des voitures les plus rapides et réalistes. Affrontez des pilotes du monde entier dans des compétitions en ligne intenses. Un jeu de course immersif pour les passionnés de vitesse.",
"00:02:35",
"https://app.videas.fr/embed/media/6d375c15-5350-48a3-9d0b-03b0e3ab06f3/",
NOW(),
0),

("Sports Party : Des mini-jeux sportifs pour toute la famille",
"Jouez à des sports variés dans des environnements colorés et amusants. Compétitionnez avec vos amis ou votre famille pour des moments de détente. Un jeu parfait pour des soirées conviviales.",
"00:02:25",
"https://app.videas.fr/embed/media/f46f125b-725f-4a69-b442-49d5b8d67d5c/",
NOW(),
0),

("Les Fourmis : Explorez la vie d'un royaume miniature",
"Prenez le contrôle d'une colonie de fourmis et gérez ses ressources. Affrontez des défis, construisez et défendez votre territoire. Une aventure unique qui met en lumière la vie fascinante des insectes.",
"00:02:30",
"https://app.videas.fr/embed/media/aa522cb9-8b78-4369-9320-cb29e3751685/",
NOW(),
0),

("EA Sports WRC : La course de rallye réaliste",
"Prenez le volant et affrontez les terrains les plus difficiles. Ressentez l'intensité des courses grâce à des graphismes impressionnants et des contrôles réalistes. Une expérience incontournable pour les fans de rallye.",
"00:02:45",
"https://app.videas.fr/embed/media/528dd751-7466-4100-a870-4fc5765b1645/",
NOW(),
0),

("Unpacking : Découvrez les histoires à travers les objets",
"Organisez, déballez et apprenez à connaître les vies derrière chaque objet. Ce jeu relaxant combine casse-têtes et narration immersive. Une expérience introspective et apaisante.",
"00:02:20",
"https://app.videas.fr/embed/media/6bff9341-7484-415a-b771-dd146ae18492/",
NOW(),
0),

("PowerWash : Nettoyez pour un maximum de satisfaction",
"Transformez des espaces sales en lieux impeccables grâce à votre nettoyeur haute pression. Une expérience relaxante et gratifiante où la propreté est reine. Idéal pour se détendre après une longue journée.",
"00:02:35",
"https://app.videas.fr/embed/media/ca03ffb4-ba16-42c9-af01-4390e85c177e/",
NOW(),
0),

("inZOI : Voyagez dans un monde artistique unique",
"Découvrez un univers où l'art et le jeu vidéo s'entrelacent. Résolvez des énigmes et explorez des environnements fascinants. Une aventure visuellement époustouflante et pleine de créativité.",
"00:02:30",
"https://app.videas.fr/embed/media/da350e1a-32a2-484f-9594-6e2a8d964959/",
NOW(),
0),

("Synduality : Une aventure futuriste intense",
"Explorez un monde post-apocalyptique avec votre robot compagnon. Luttez pour votre survie contre des ennemis redoutables et dévoilez des mystères. Une expérience captivante mêlant science-fiction et action.",
"00:02:40",
"https://app.videas.fr/embed/media/7e265ceb-e1b8-48e5-b6a1-a86315404946/",
NOW(),
0),

("Crimson Desert : Vivez l'épopée d'un monde déchiré par la guerre",
"Découvrez une aventure RPG dans un univers riche et immersif. Combattez, explorez et découvrez des histoires fascinantes. Un jeu ambitieux qui promet des heures d'aventure.",
"00:02:25",
"https://app.videas.fr/embed/media/f9d15b6c-2817-4579-a3fe-ce7672004fd5/",
NOW(),
0),

("15 City Builders : Construisez votre empire urbain",
"Découvrez 15 jeux captivants où la gestion et la construction sont au cœur de l'expérience. Planifiez, développez et transformez vos villes en métropoles prospères. Une sélection parfaite pour les amateurs de stratégie.",
"00:02:30",
"https://app.videas.fr/embed/media/a6b1ed23-42e9-4546-8a45-e0ba587b21f0/",
NOW(),
0),

("Battle Islands: Commanders : Stratégie militaire intense",
"Dirigez vos troupes dans des batailles rapides et tactiques. Construisez votre armée, planifiez vos attaques et écrasez vos adversaires. Un jeu de stratégie accessible et prenant.",
"00:02:35",
"https://app.videas.fr/embed/media/8f9b1e5d-3599-4f00-9e56-26609e62d717/",
NOW(),
0),

("Icarus : La survie dans un monde extraterrestre",
"Explorez un monde alien tout en luttant pour votre survie. Collectez des ressources, bâtissez et affrontez les dangers qui vous entourent. Une aventure de survie captivante avec des défis uniques.",
"00:02:45",
"https://app.videas.fr/embed/media/047751ed-5c9a-4cdf-bfaf-4bf63ec625b1/",
NOW(),
0),

("Grow: Song of the Evertree : Cultivez et explorez un monde vibrant",
"Prenez soin d'un arbre magique et explorez un monde coloré. Résolvez des énigmes et développez la flore pour restaurer l'équilibre. Une aventure relaxante pleine de magie et de beauté.",
"00:02:20",
"https://app.videas.fr/embed/media/0610219a-3194-4b64-856d-f65ae13950e7/",
NOW(),
0),

("Turok Origins : Plongez dans un monde préhistorique",
"Vivez une aventure palpitante dans un univers où les dinosaures dominent. Survivez face à des prédateurs géants et explorez un environnement primitif. Un jeu d'action intense pour les amateurs de préhistoire.",
"00:02:30",
"https://app.videas.fr/embed/media/4309e07c-6def-4be0-87de-e61966d64d8a/",
NOW(),
0),

("Arma Reforger : Une simulation militaire réaliste",
"Plongez dans des combats réalistes et tactiques dans cet opus militaire. Coopérez avec d'autres joueurs et menez des missions à haut risque. Un jeu parfait pour les fans de stratégie et de simulations de guerre.",
"00:02:35",
"https://app.videas.fr/embed/media/4f9ce0cc-7644-443e-b6f8-d40f65d5f665/",
NOW(),
0),

("Ace Combat 7 : La simulation aérienne ultime",
"Prenez les commandes d'un jet de combat et engagez-vous dans des batailles aériennes spectaculaires. Partez en mission dans un univers militaire époustouflant. Un jeu de simulation de vol intensément réaliste.",
"00:02:25",
"https://app.videas.fr/embed/media/1e00fb97-fcc5-4a58-9593-f8dfe7b04ca4/",
NOW(),
0),

("Street Fighter 6 : Le retour des combattants légendaires",
"Rejoignez vos personnages de combat préférés dans un jeu de combat ultra-rapide. Lancez-vous dans des duels épiques pour montrer vos compétences et stratégies. Un jeu de combat classique avec une touche moderne.",
"00:02:40",
"https://app.videas.fr/embed/media/8cff09c4-1ea6-4d26-bb64-6c81e46faaf7/",
NOW(),
0),

("Lake : Une aventure tranquille au bord du lac",
"Explorez une petite ville tranquille et plongez dans une histoire touchante. Profitez de la nature tout en découvrant les secrets de la ville. Un jeu calme et apaisant qui offre une expérience de relaxation et de découverte.",
"00:02:30",
"https://app.videas.fr/embed/media/56245c26-3c39-4ac4-9164-dcffc102e429/",
NOW(),
0),

("Little Devil : Un jeu d'aventure ténébreux et intrigant",
"Suivez une histoire sombre et mystérieuse où vous devrez affronter vos propres démons. Explorez des environnements fascinants et résolvez des énigmes complexes. Une expérience de jeu captivante, pleine de surprises.",
"00:02:35",
"https://app.videas.fr/embed/media/c3d276db-0cfa-4898-be6c-5f3e296200a4/",
NOW(),
0),

("Constance : Une aventure narrative poignante",
"Plongez dans une histoire émotive, pleine de mystères et de révélations. Résolvez des énigmes et découvrez des secrets qui vous permettront de progresser. Un jeu narratif qui met l'accent sur l'histoire et l'ambiance.",
"00:02:45",
"https://app.videas.fr/embed/media/eda697d4-ec74-4102-a85e-ad6cab532cba/",
NOW(),
0),

("Moroi : Affrontez l'obscurité dans un monde peuplé de créatures surnaturelles",
"Explorez un monde ténébreux, où les créatures surnaturelles comme les vampires dominent. Survivez à des attaques violentes et découvrez des mystères enfouis. Un jeu d'action intense avec des éléments horrifiques.",
"00:02:20",
"https://app.videas.fr/embed/media/1cc18b7a-7232-4486-a82b-641250175942/",
NOW(),
0),

("SMITE : Des batailles épiques entre dieux et héros",
"Affrontez d'autres joueurs dans ce MOBA où vous incarnez des dieux mythologiques. Choisissez votre divinité et utilisez ses pouvoirs pour vaincre vos ennemis. Un jeu dynamique et stratégique dans un univers fantastique.",
"00:02:30",
"https://app.videas.fr/embed/media/db38a95d-3f1c-4e42-8ece-585a1a91b051/",
NOW(),
0),

("League of Legends : La bataille pour la gloire et la domination",
"Plongez dans l'un des jeux les plus populaires au monde. Formez une équipe et participez à des batailles stratégiques en arène. Un MOBA avec des personnages variés et une compétition sans fin.",
"00:02:35",
"https://app.videas.fr/embed/media/db38a95d-3f1c-4e42-8ece-585a1a91b051/",
NOW(),
0),

("DragonBall Project : Le rêve des fans de Dragon Ball se réalise",
"Incarnez vos personnages préférés de l'univers Dragon Ball dans ce jeu d'action. Affrontez d'autres combattants et vivez des moments épiques inspirés de l'anime. Un projet qui ravira tous les fans de la saga mythique.",
"00:02:30",
"https://app.videas.fr/embed/media/55154cce-d8bb-4fc8-ac25-17a4b1bb570c/",
NOW(),
0);
*/
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