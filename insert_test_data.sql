# Insert data into the tables

USE myForum;

INSERT INTO users (username, email) VALUES ('Sabirah', 'stara002@example.com');
INSERT INTO users (username, email) VALUES ('Bora', 'bsava786@example.com');
INSERT INTO users (username, email) VALUES ('Maisha', 'babym4444@example.com');

INSERT INTO topics (name) VALUES ('Share your 3D blender artworks!');
INSERT INTO topics (name) VALUES ('Haircare');
INSERT INTO topics (name) VALUES ('NoStupidQuestions');

INSERT INTO posts (user_id, topic_id, content) VALUES (1, 1, 'hi world, look at my first donut render :)');
INSERT INTO posts (user_id, topic_id, content) VALUES (2, 2, 'What are your favourite Y2K hairstyles? ');
INSERT INTO posts (user_id, topic_id, content) VALUES (3, 3, 'Air Conditioner settings...someone please explain');
INSERT INTO posts (user_id, topic_id, content) VALUES (1, 3, 'Is reddit a hobby?');

INSERT INTO replies (post_id, user_id, content) VALUES (1, 2, 'Good job!! Great colour palette');
INSERT INTO replies (post_id, user_id, content) VALUES (2, 3, 'Personally, my go to is a slick side part ponytail. Curled at the end of course <3');
INSERT INTO replies (post_id, user_id, content) VALUES (4, 2, 'Yes, but it shouldnt be.');

INSERT INTO memberships (user_id, topic_id) VALUES (1, 1);
INSERT INTO memberships (user_id, topic_id) VALUES (2, 2);
