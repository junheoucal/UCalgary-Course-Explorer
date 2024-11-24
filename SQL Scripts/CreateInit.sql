CREATE DATABASE coursedb;
USE coursedb;
CREATE TABLE Course (
	CourseID char(7) NOT NULL PRIMARY KEY,
	Course_Name TINYTEXT NOT NULL,
	Level INT(255) NOT NULL,
	Course_Description LONGTEXT,
	Credits INT(255) NOT NULL,
	Department_Name varchar(255) NOT NULL,
	Concentration_Name varchar(255)
);

CREATE TABLE Lecture (
	LectureID INT(8) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	CourseID char(7) NOT NULL,
	Enrollment_Limit INT(255),
	Enrollment_Current_Number INT(255),
	Building_Name varchar(255),
	Room_Location varchar(255),
	Semester_Name varchar(10) NOT NULL,
	Days varchar(5),
	Start_time TIME,
	End_time TIME,
    FOREIGN KEY(CourseID) REFERENCES Course(CourseID)
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE IT (
	ITID char(8) NOT NULL PRIMARY KEY,
	Email varchar(255) NOT NULL
);

CREATE TABLE Professor (
	Professor_ID char(8) NOT NULL PRIMARY KEY,
	Email varchar(255),
	Phone_Number varchar(255),
	Academic_Rank varchar(255) NOT NULL,
	Office_Building varchar(255),
	Office_Room varchar(255),
	First_Name varchar(255) NOT NULL,
	Last_Name varchar(255) NOT NULL,
	Date_of_Birth DATE,
	Department_Name varchar(255) NOT NULL
);

CREATE TABLE Professor_Research_Area (
	PRIMARY KEY(Research_Area, Professor_ID),
	Professor_ID char(8) NOT NULL,
	Research_Area varchar(255) NOT NULL,
     FOREIGN KEY(Professor_ID) REFERENCES Professor(Professor_ID)
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE University (
	University_Name varchar(255) NOT NULL PRIMARY KEY,
	Website varchar(255),
	 Email varchar(255),
	Number_of_Faculty INT(255),
	Number_of_Students INT(255),
	Year_of_Establishment YEAR,
	Country varchar(255) NOT NULL,
	Province varchar(255),
	City varchar(255),
	Postal_Code varchar(7)
);

CREATE TABLE Department (
	Department_Name varchar(255) NOT NULL PRIMARY KEY,
	Phone_Number varchar(255),
	Number_of_Faculty INT(255),
	Email varchar(255),
	Office_Building varchar(255),
	Office_Room varchar(255),
	University_Name varchar(255) NOT NULL,
    FOREIGN KEY(University_Name) REFERENCES University(University_Name) 
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE Admin (
	AdminID char(8) NOT NULL PRIMARY KEY,
	Email varchar(255),
	Role varchar(255),
	Phone_Number varchar(255),
	First_Name varchar(255),
	Last_Name varchar(255),
	Date_of_Birth DATE,
	Office_Building varchar(255),
	Office_Room varchar(255),
	Department_Name varchar(255) NOT NULL,
    FOREIGN KEY(Department_Name) REFERENCES Department(Department_Name) ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE Student (
	StudentID char(8) NOT NULL PRIMARY KEY,
	Email varchar(255),
	GPA FLOAT(8),
	Year_of_Study INT(8),
	Enrollment_Status BOOL NOT NULL,
	First_Name varchar(255) NOT NULL,
	Last_Name varchar(255) NOT NULL,
	Date_of_Birth DATE,
	Current_Address varchar(255),
	Permanent_Address varchar(255),
	Department_Name varchar(255) NOT NULL,
    FOREIGN KEY(Department_Name) REFERENCES Department(Department_Name) 
		 ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE StudentLogin (
	StudentID char(8) NOT NULL PRIMARY KEY,
	Password varchar(255) NOT NULL,
    FOREIGN KEY(StudentID) REFERENCES Student(StudentID)
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE ITLogin (
	ITID char(8) NOT NULL PRIMARY KEY,
	Password varchar(255) NOT NULL,
    FOREIGN KEY(ITID) REFERENCES IT(ITID)
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE Semester (
	Semester_Name varchar(10) NOT NULL PRIMARY KEY,
	Start_Date DATE NOT NULL,
	End_Date DATE NOT NULL,
	Registration_Deadline DATE NOT NULL,
	Withdrawal_Deadling DATE NOT NULL,
	Exams_Start_Date DATE,
	Exams_End_Date DATE,
	University_Name varchar(255) NOT NULL,
    FOREIGN KEY(University_Name) REFERENCES University(University_Name) 
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE Concentration (
	Concentration_Name varchar(255) NOT NULL PRIMARY KEY,
	Concentration_Type varchar(255),
	Concentration_Requirements LONGTEXT
);

CREATE TABLE Concentration_req (
	Concentration_Name varchar(255) NOT NULL,
	CourseID char(7) NOT NULL,
    FOREIGN KEY(CourseID) REFERENCES Course(CourseID)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	FOREIGN KEY(Concentration_Name) REFERENCES Concentration(Concentration_Name) 
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE Concentration_fulfillments (
	Concentration_Name varchar(255) NOT NULL,
    FOREIGN KEY(Concentration_Name) REFERENCES Concentration(Concentration_Name) 
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE Antirequisite (
	CourseID char(7) NOT NULL, 
    FOREIGN KEY(CourseID) REFERENCES Course(CourseID)
	ON DELETE CASCADE	ON UPDATE CASCADE,
	Conflicting_CourseID char(7) NOT NULL,
    FOREIGN KEY(CourseID) REFERENCES Course(CourseID) ON DELETE CASCADE	ON UPDATE CASCADE,
	Reason LONGTEXT
);

CREATE TABLE Teaching_Assistant (
	Name varchar(255) NOT NULL PRIMARY KEY,
	Email varchar(255)
);

CREATE TABLE Tutorial (
	PRIMARY KEY(TutorialNo, CourseID),
	TutorialNo INT(2) NOT NULL,
	CourseID char(7) NOT NULL,
    FOREIGN KEY(CourseID) REFERENCES Lecture(CourseID)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	TA_name varchar(255) NOT NULL,
    FOREIGN KEY(TA_name) REFERENCES Teaching_Assistant(Name) 
		ON DELETE CASCADE	ON UPDATE CASCADE,
	Enrollment_Limit INT(255),
	Enrollment_Current_Number INT(255),
	Building_Name varchar(255),
	Room_Location varchar(255),
	Days varchar(5),
	Start_time TIME,
	End_time TIME
);

CREATE TABLE Manages (
	PRIMARY KEY(ITID, CourseID),
	ITID varchar(255) NOT NULL,
    FOREIGN KEY(ITID) REFERENCES IT(ITID)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	CourseID char(7) NOT NULL,
    FOREIGN KEY(CourseID) REFERENCES Course(CourseID)
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE Prerequisite (
	CourseID char(7) NOT NULL,
    FOREIGN KEY(CourseID) REFERENCES Course(CourseID)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	Required_CourseID char(7) NOT NULL,
    FOREIGN KEY(Required_CourseID) REFERENCES Course(CourseID) 
		ON DELETE CASCADE	ON UPDATE CASCADE,
	Minimum_Grade varchar(2)
);

CREATE TABLE Major_Requirement (
	CourseID char(7) NOT NULL,
    FOREIGN KEY(CourseID) REFERENCES Course(CourseID)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	Major varchar(255) NOT NULL,
	Minimum_Grade varchar(2)
);

CREATE TABLE Minor_Requirement (
	CourseID char(7) NOT NULL,
    FOREIGN KEY(CourseID) REFERENCES Course(CourseID)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	Minor varchar(255) NOT NULL,
	Minimum_Grade varchar(2)
);

CREATE TABLE Administered_By (
	PRIMARY KEY(CourseID, AdminID),
	CourseID char(7) NOT NULL,
    FOREIGN KEY(CourseID) REFERENCES Lecture(CourseID)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	AdminID char(8) NOT NULL,
    FOREIGN KEY(AdminID) REFERENCES Admin(AdminID)
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE Taken_By (
	PRIMARY KEY(CourseID, TutorialNo, StudentID),
	CourseID char(7) NOT NULL,
    FOREIGN KEY(CourseID) REFERENCES Lecture(LectureID)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	TutorialNo INT(2) NOT NULL,
    FOREIGN KEY(TutorialNo) REFERENCES Tutorial(TutorialNo)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	StudentID char(8) NOT NULL,
    FOREIGN KEY(StudentID) REFERENCES Student(StudentID)
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE Assisted_By (
	PRIMARY KEY(CourseID, TAName),
	CourseID char(7) NOT NULL,
	FOREIGN KEY(CourseID) REFERENCES Lecture(LectureID)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	TAName varchar(255) NOT NULL,
    FOREIGN KEY(TAName) REFERENCES Teaching_Assistant(Name)
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE Teaches (
	PRIMARY KEY(CourseID, Professor_ID),
	Professor_ID char(8) NOT NULL,
    FOREIGN KEY(Professor_ID) REFERENCES Professor(Professor_ID) ON DELETE CASCADE	ON UPDATE CASCADE,
	CourseID char(8) NOT NULL,
    FOREIGN KEY(CourseID) REFERENCES Lecture(LectureID)
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE Is_Offered_In (
	PRIMARY KEY(CourseID, Semester_Name),
	CourseID char(7) NOT NULL,
    FOREIGN KEY(CourseID) REFERENCES Lecture(CourseID)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	Semester_Name varchar(10) NOT NULL,
    FOREIGN KEY(Semester_Name) REFERENCES Semester(Semester_Name) 
		ON DELETE CASCADE	ON UPDATE CASCADE
);

