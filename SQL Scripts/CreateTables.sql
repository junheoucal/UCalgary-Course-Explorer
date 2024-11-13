USE coursedb;
CREATE TABLE Course (
	CourseID char(7) NOT NULL PRIMARY KEY,
	Course_Name TINYTEXT NOT NULL,
	Level INT(255) NOT NULL,
	Course_Description LONGTEXT,
	Credits INT(255) NOT NULL,
	Department_Name varchar(255) NOT NULL,
	Concentration_Name varchar(255),
    FOREIGN KEY (Department_Name)
		REFERENCES Department(Department_Name)
        ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE Lecture (
	CourseID char(7) NOT NULL,
	ProfessorID char(8) NOT NULL,
	Enrollment_Limit INT(255),
	Enrollment_Current_Number INT(255),
	Building_Name varchar(255),
	Room_Location varchar(255),
	Semester_Name varchar(10) NOT NULL,
	Days varchar(5),
	Start_time TIME,
	End_time TIME,
    FOREIGN KEY(CourseID) REFERENCES Course(CourseID)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	FOREIGN KEY(ProfessorID) REFERENCES Professor(ProfessorID)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	FOREIGN KEY(Semester_Name) REFERENCES Semester(Semester_Name) 
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE IT (
	ITID varchar(255) NOT NULL PRIMARY KEY,
	Email varchar(255) NOT NULL
);

CREATE TABLE Professor (
	ProfessorID char(8) NOT NULL PRIMARY KEY,
	Email varchar(255),
	Phone_Number varchar(255),
	Academic_Rank varchar(255) NOT NULL,
	Office_Building varchar(255),
	Office_Room varchar(255),
	First_Name varchar(255) NOT NULL,
	Last_Name varchar(255) NOT NULL,
	Date_of_Birth DATE,
	Department_Name varchar(255) NOT NULL,
    FOREIGN KEY (Department_Name) REFERENCES Department(Department_Name) ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE Professor_Research_Area (
	PRIMARY KEY(Research_Area, Professor_ID),
	Professor_ID char(8) NOT NULL,
	Research_Area varchar(255) NOT NULL,
     FOREIGN KEY(Professor_ID) REFERENCES Professor(Professor_ID)
		ON DELETE CASCADE	ON UPDATE CASCADE
);




