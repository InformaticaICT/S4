CREATE TABLE leraren ( 
    leraar_id INT PRIMARY KEY AUTO_INCREMENT, 
    voornaam VARCHAR(50), 
    achternaam VARCHAR(50), 
    email VARCHAR(100) UNIQUE, 
    wachtwoord VARCHAR(100), 
    school VARCHAR(100)
);

CREATE TABLE lesmateriaal (
    lesmateriaal_id INT PRIMARY KEY AUTO_INCREMENT, 
    titel VARCHAR(255), 
    omschrijving TEXT, 
    upload_datum DATE, 
    leraar_id INT, 
    FOREIGN KEY (leraar_id) REFERENCES leraren(leraar_id) 
);


CREATE TABLE PeerReviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT, 
    score INT CHECK (score BETWEEN 1 AND 5), 
    feedback TEXT, 
    review_date DATE, 
    leraar_id INT, 
    lesmateriaal_id INT, 
    FOREIGN KEY (leraar_id) REFERENCES leraren(leraar_id), 
    FOREIGN KEY (lesmateriaal_id) REFERENCES lesmateriaal(lesmateriaal_id)
);


CREATE TABLE Categorie (
    categorie_id INT PRIMARY KEY AUTO_INCREMENT, 
    naam VARCHAR(100)
);


CREATE TABLE Lesmateriaal_Categorie (
    lesmateriaal_id INT, 
    categorie_id INT, 
    PRIMARY KEY (lesmateriaal_id, categorie_id), 
    FOREIGN KEY (lesmateriaal_id) REFERENCES lesmateriaal(lesmateriaal_id), 
    FOREIGN KEY (categorie_id) REFERENCES Categorie(categorie_id)
);

-- Bestanden als bijlage opslaan? Op harde schijf en niet in de database
-- Leraren -> Lesmateriaal: Een leraar kan meerdere lesmaterialen uploaden (1 op veel), vragen kan het niet meer op meer relatie zijn?
-- Lesmateriaal -> PeerReviews: Elk lesmateriaal kan door meerdere leraren beoordeeld worden (1 op veel relatie)
-- Lesmateriaal -> Categorie: Lesmateriaal kan onder meerdere categorieen vallen (veel op veel relatie)


-- CREATE TABLE Wachtwoord_Wijzigingen ( 
--     id INT PRIMARY KEY AUTO_INCREMENT, 
--     leraar_id INT NOT NULL, 
--     oud_wachtwoord VARCHAR(255) NOT NULL, 
--     nieuw_wachtwoord VARCHAR(255) NOT NULL, 
--     FOREIGN KEY (leraar_id) REFERENCES leraar(leraar_id) ON DELETE CASCADE 
-- );

CREATE TABLE Account ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    leraar_id INT NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    wachtwoord VARCHAR(255) NOT NULL, 
    FOREIGN KEY (leraar_id) REFERENCES leraar(leraar_id) ON DELETE CASCADE 
);

-- CREATE TABLE Bijlagen (     
--     id INT PRIMARY KEY AUTO_INCREMENT, 
--     lesmateriaal_id INT NOT NULL, 
--     bestand_url VARCHAR(255) NOT NULL, 
--     bestandstype VARCHAR(50) NOT NULL, 
--     FOREIGN KEY (lesmateriaal_id) REFERENCES lesmateriaal(id) ON DELETE CASCADE
-- );