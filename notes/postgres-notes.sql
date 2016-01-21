/* Connects to db */
\c sample_db

/* Show databases */
-- \l

/* Create table */
-- CREATE TABLE people(
--     id SERIAL,
--     fname varchar(255),
--     lname varchar(255),
--     age int,
--     company varchar(255)
-- )

-- CREATE TABLE users(
--   id SERIAL,
--   name varchar(255),
--   active bool
-- )


/* Insert */
-- INSERT INTO users (name, active) VALUES ('Travis', false);

-- INSERT INTO "people" (fname,lname,age,company) VALUES ('Stewart','George',42,'Metus Aliquam Erat Industries'),('Colette','Lewis',79,'Congue Turpis In Corp.'),('Dante','Soto',16,'Vitae LLP'),('Alea','Fox',32,'Et Ltd'),('Tyler','Myers',17,'Sagittis Augue Eu LLP'),('Nita','Cooke',64,'Fringilla Incorporated'),('Ian','Ramirez',15,'Magna Duis Corp.'),('Sean','Preston',47,'Massa Company'),('Cheryl','Wright',62,'Posuere Cubilia Inc.'),('Beck','Anderson',81,'Eu Lacus Quisque LLC'),('Ariana','Martinez',50,'Imperdiet LLP'),('Price','Owens',63,'Ante Dictum Mi Institute'),('Ivana','Salinas',41,'Et Malesuada Foundation'),('Phyllis','Lambert',94,'Nam Company'),('Amos','Ayers',34,'Sed Limited'),('Hillary','Hodge',84,'Accumsan Neque Incorporated'),('Larissa','Molina',34,'Aliquam Nec Enim Incorporated'),('Roanna','Ruiz',99,'Vulputate Dui Nec Institute'),('Kirsten','Freeman',83,'Sed Neque Institute'),('Hu','Love',93,'Ac Turpis Egestas PC'),('Dale','Thompson',59,'Eget Laoreet Posuere Consulting'),('Rowan','Scott',58,'Orci PC'),('Idona','Fuentes',73,'Morbi Consulting'),('Mohammad','Mckinney',51,'Nunc Inc.'),('Leslie','Davenport',71,'Interdum Curabitur Corp.'),('Jocelyn','Mcgowan',20,'Nunc Ullamcorper Incorporated'),('Ava','Hurst',87,'Enim Curabitur Limited'),('Macaulay','Ochoa',60,'Nulla Aliquet Proin Foundation'),('Amal','Blackburn',18,'Vulputate Institute'),('Eleanor','Jacobs',61,'Placerat PC'),('Sebastian','Todd',52,'Mauris LLP'),('Alfonso','Warner',93,'Mattis Cras Eget Industries'),('Hedwig','Bates',48,'Ut Lacus Corporation'),('Rajah','Dunlap',22,'Nulla In Tincidunt PC'),('Leonard','Ramirez',17,'Curabitur Dictum Phasellus PC'),('Hoyt','Bell',77,'Vel Inc.'),('Glenna','Dyer',30,'Eget Industries'),('Theodore','Chen',71,'Dictum Proin Associates'),('Dakota','Hodges',67,'Feugiat Lorem Ipsum Corp.'),('Tucker','Randolph',51,'Neque Nullam Corp.'),('Jonas','Rocha',29,'Vulputate Risus Foundation'),('Maite','Becker',22,'A Corporation'),('Hayden','Jordan',94,'Aenean Euismod Mauris Inc.'),('Odette','Goodman',55,'Ipsum Non Arcu Inc.'),('Raven','Velazquez',15,'Ac Tellus LLP'),('Flavia','Grant',64,'Et Arcu Incorporated'),('Athena','Mullins',81,'Tellus Justo Industries'),('Ezra','Larson',67,'Pellentesque Habitant Morbi Consulting'),('Graiden','Mitchell',60,'Convallis Ligula Ltd'),('Curran','Barber',39,'Fermentum Vel Mauris Corporation'),('Deborah','Boyer',29,'Consequat Nec Mollis Foundation'),('Lane','Calhoun',73,'Pede Blandit Consulting'),('MacKenzie','Macias',23,'Donec Institute'),('Gisela','Keith',28,'Vulputate Ullamcorper Consulting'),('Jemima','Fisher',38,'Volutpat Limited'),('Samuel','Edwards',52,'Non Sollicitudin A Corp.'),('Sade','Adams',76,'Lacus Industries'),('Wayne','Moss',48,'Augue Associates'),('Catherine','Solomon',80,'In Consequat PC'),('Dennis','Benson',86,'Ligula Aenean Euismod Corporation'),('Kirk','Cantu',56,'Dignissim Corp.'),('Martina','Sosa',72,'Leo Cras Limited'),('Avye','Peck',71,'Suspendisse Sagittis Ltd'),('Joan','Estrada',86,'Morbi Limited'),('Solomon','Leon',81,'Quisque Imperdiet Erat Associates'),('Beatrice','Kennedy',51,'Ligula Consectetuer Inc.'),('Barclay','Case',49,'Pellentesque Inc.'),('Heather','Stanton',29,'Eu LLC'),('Cameron','Gomez',52,'Gravida Aliquam Tincidunt Inc.'),('Kyla','Fisher',16,'Sed Eget Lacus LLP'),('Wang','Emerson',59,'Erat Incorporated'),('Cara','Bass',24,'Erat Volutpat Nulla LLP'),('Kirsten','Lott',18,'Sit Company'),('Adam','Craig',17,'Massa Mauris Vestibulum Consulting'),('Jesse','Lindsay',23,'Turpis LLC'),('Cadman','Wilkerson',85,'Mauris PC'),('Erich','Peck',35,'In Company'),('Dai','Short',21,'Vivamus Rhoncus PC'),('Jacob','Burton',81,'Magna Sed Eu Incorporated'),('Doris','Booth',15,'Ligula Ltd'),('Isaac','Brock',42,'Rhoncus Institute'),('Fletcher','Kane',38,'Sodales Ltd'),('Liberty','George',53,'Mollis Associates'),('Lawrence','Langley',86,'Sagittis Lobortis Incorporated'),('Elliott','Ray',42,'Penatibus Consulting'),('Deanna','Page',34,'Est Ac LLC'),('Cheyenne','Poole',40,'Ante Company'),('Frances','Kramer',75,'Id Sapien Cras Ltd'),('Kristen','Faulkner',78,'Nullam Vitae Industries'),('Germaine','Rocha',40,'Ligula Aliquam Erat Incorporated'),('Darryl','Avery',73,'Diam Nunc Ullamcorper LLP'),('Uriel','Sheppard',39,'Blandit Limited'),('Ross','Barlow',94,'Aptent Taciti Sociosqu Incorporated'),('Caleb','Pruitt',28,'Donec Tempor Est Ltd'),('Lillian','Klein',86,'A Mi Fringilla Company'),('Uta','Mccall',56,'Velit Consulting'),('Abigail','Marshall',97,'Nonummy Ac Feugiat Institute'),('Davis','James',99,'Massa Lobortis Consulting'),('Tanner','Pugh',22,'Ut Nisi PC'),('John', 'Page', 94, 'Nestle');INSERT INTO "people" (fname,lname,age,company) VALUES ('Stewart','George',42,'Metus Aliquam Erat Industries');

/* List tables in db */
-- \dt

/* Delete */
-- delete from users where name = 'Travis';


/* Limit */
select * from people limit 10;

/* OR */
-- select * from people where lname = 'Page';

/* And */
-- select * from people where lname = 'Page' and age < 80;

/* Order by */
-- select * from people where lname = 'Page' order by age asc;
-- select * from people where lname = 'Page' order by age desc;
-- select * from people order by fname, lname;

/* Drop table */
-- DROP TABLE people;

/* Delete all */
-- delete from people; 


/* Update */
-- update people set age = 80 where id=110;


-- INSERT INTO "people" (fname,lname,age,company) VALUES ('Stewart','George',42,'Metus Aliquam Erat Industries')