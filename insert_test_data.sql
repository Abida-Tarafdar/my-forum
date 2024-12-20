# Insert data into the tables
USE myForum;

-- Insert users
INSERT INTO users (username, email, first_name, last_name, password)
VALUES 
    ('sxbirahh', 'stara002@example.com', 'sabirah', 'tarafdar', 'lilacCloud$15'),
    ('moneyy', 'bsava786@example.com', 'bora', 'savasci', 'iLoveS@birah444'),
    ('bbyAria', 'babym4444@example.com', 'maisha', 'begum', 'sec4urePa$$w0rd786');

-- Insert flashcard questions and answers
INSERT INTO flashcards (user_id, topic_id, question, answer)
VALUES 
    (1, 1, 'What is the main theme of King Lear?', 'The main theme is about loyalty, betrayal, and the consequences of not seeing the truth.'),
    (2, 2, 'What is Express.js?', 'Express.js is a framework for building web apps with Node.js, making it easier to handle routes and requests.'),
    (3, 3, 'What is a DJ application?', 'A DJ app lets you mix and play music, often used by DJs in live performances or to create music mixes.'),
    (1, 3, 'What is JUCE used for in audio processing?', 'JUCE is a framework for building audio apps, like music plugins and sound effects, using C++.');

-- Insert topics
INSERT INTO topics (name) 
VALUES 
    ('King lear revision group!'),
    ('Help with learning express.js'),
    ('DJ application using C++');

-- Insert posts 
INSERT INTO posts (user_id, topic_id, content) 
VALUES 
    (1, 1, 'Discussion for the King Lear revision group! Share your notes and insights about the play.'),
    (2, 2, 'Lets discuss some tips and resources for learning Express.js.'),
    (3, 3, 'DJ application development in C++.'),
    (1, 3, 'Which online tutorial is best for learning C++ to create an audio processing application?');

-- Insert replies
INSERT INTO replies (post_id, user_id, content) 
VALUES 
    (1, 2, 'I think the best way to approach King Lear is to focus on character relationships and motifs.'),
    (2, 3, 'For Express.js, I recommend starting with the official documentation and building simple APIs.'),
    (4, 2, 'Read Juce documentation and Rishikesh Daoo: Algorithmic frequency/pitch detection series to get a strong understanding of both C++ and audio processing.');
    
-- Insert memberships 
INSERT INTO memberships (user_id, topic_id) 
VALUES 
    (1, 1),
    (2, 2),
    (3, 3);
