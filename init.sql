DROP TABLE IF EXISTS Links;
CREATE TABLE Links (
  name CHAR(32),
  createdBy CHAR(32),
  FOREIGN KEY(createdBy) REFERENCES Users(name),
  PRIMARY KEY (name)
);

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  name CHAR(32),
  PRIMARY KEY (name)
);

DROP TABLE IF EXISTS Clicks;
CREATE TABLE Clicks (
  linkName CHAR(32),
  userName CHAR(32),
  FOREIGN KEY(linkName) REFERENCES Links(name)
);
