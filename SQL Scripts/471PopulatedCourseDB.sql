-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: coursedb
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `antirequisite`
--

USE `coursedb`;

DROP TABLE IF EXISTS `antirequisite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `antirequisite` (
  `CourseID` char(7) NOT NULL,
  `Conflicting_CourseID` char(7) NOT NULL,
  PRIMARY KEY (`CourseID`,`Conflicting_CourseID`),
  KEY `CourseID` (`CourseID`),
  CONSTRAINT `antirequisite_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `antirequisite_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `antirequisite`
--

LOCK TABLES `antirequisite` WRITE;
/*!40000 ALTER TABLE `antirequisite` DISABLE KEYS */;
INSERT INTO `antirequisite` VALUES ('CPSC418','MATH318'),('CPSC491','MATH391'),('CPSC491','MATH493'),('MATH318','CPSC418'),('MATH391','CPSC491'),('MATH493','CPSC491');
/*!40000 ALTER TABLE `antirequisite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `CourseID` char(7) NOT NULL,
  `Course_Name` tinytext NOT NULL,
  `Level` int NOT NULL,
  `Course_Description` longtext,
  `Credits` int NOT NULL,
  `Department_Name` varchar(255) NOT NULL,
  PRIMARY KEY (`CourseID`),
  KEY `Department_Name` (`Department_Name`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`Department_Name`) REFERENCES `department` (`Department_Name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `course_ibfk_2` FOREIGN KEY (`Department_Name`) REFERENCES `department` (`Department_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('CPSC231','Introduction to Computer Science I',200,'Introduction to problem solving, the analysis and design of small-scale computational systems, and implementation using a procedural programming language.',3,'CPSC'),('CPSC233','Introduction to Computer Science II',200,'Continuation of Introduction to Computer Science I. Emphasis on object-oriented analysis and design of small-scale computational systems and implementation using an object-oriented language. Issues of design, modularization, and programming style will be emphasized.',3,'CPSC'),('CPSC251','	Theoretical Foundations of Computer Science I',200,'Proof techniques. Recursion and iteration. Specification of algorithmic problems and fundamental proof techniques in Computer Science. Discrete structures such as graphs, trees, strings, functions, and their computer representation. Counting, permutations. Random events. Conditional events. Applications in Computer Science.',3,'CPSC'),('CPSC329','Explorations in Information Security and Privacy',300,'A broad survey of topics in information security and privacy, with the purpose of cultivating an appropriate mindset for approaching security and privacy issues. Topics will be motivated by recreational puzzles. Legal and ethical considerations will be introduced as necessary.',3,'CPSC'),('CPSC331','Data Structures, Algorithms, and Their Analysis',300,'Fundamental data structures, including arrays, lists, stacks, queues, trees, hash tables, and graphs. Algorithms for searching and sorting. Introduction to the correctness and analysis of algorithms. For computer science majors and those interested in algorithm design and analysis, information security, and other mathematically-intensive areas.',3,'CPSC'),('CPSC335','Intermediate Data Structures',300,'A continuation of Computer Science 331. Collision resolution in hash tables, search algorithms, advanced tree structures, strings. Advanced algorithmic tools for the storing and manipulation of information.',3,'CPSC'),('CPSC351','Theoretical Foundations of Computer Science II',300,'Probability spaces, random variables, expectation, independence, concentration bounds, conditional probability, repeated trials, error bounds. Turing machines and finite automata. Deterministic, nondeterministic and probabilistic models of computation. Languages, regular languages and regular expressions. Methods for classifying computational problems as decidable or undecidable.',3,'CPSC'),('CPSC355','Computing Machinery I',300,'An introduction to computing machinery establishing the connection between programs expressed in a compiled language, an assembly language, and machine code, and how such code is executed. Includes the detailed study of a modern CPU architecture, its assembly language and internal data representation, and the relationship between high-level program constructs and machine operations.',3,'CPSC'),('CPSC359','Computing Machinery II',300,'An introduction to hardware and microprocessor design, including the connection between gate-level digital logic circuits and sequential machines that can execute an algorithm and perform input and output.',3,'CPSC'),('CPSC365','C++ Programming',300,'Introduction to the C++ language, with an emphasis on its advanced language constructs and features. Techniques for writing time and space efficient code will be considered.',3,'CPSC'),('CPSC383','Explorations in Artificial Intelligence and Machine Learning',300,'A survey of artificial intelligence and machine learning tools to cultivate an understanding of their capability, utility, and societal/ethical/legal considerations. Popular APIs will be used to develop simple applied examples.',3,'CPSC'),('CPSC393','Metacognition in Self-Directed Learning Methodologies',300,'Remain current in computer science as this field evolves by developing a reflective life-long learning practice. Independent student work will include using a wide variety of sources and developing the ability to self-assess progress in learning and knowledge in topics related to computer science.',3,'CPSC'),('CPSC405','Software Entrepreneurship',400,'Development of business models, building software prototypes and creation of pitch presentations to create a software-based business.',3,'CPSC'),('CPSC409','History of Computation',400,'The history of computation from the earliest times to the modern era.',3,'CPSC'),('CPSC411','Compiler Construction',400,'Introduction to compilers, interpreters, and the tools for parsing and translation. Lexical analysis, context free grammars and software tools for their recognition. Attribute grammars and their applications in translation and compiling.',3,'CPSC'),('CPSC413','Design and Analysis of Algorithms I',400,'Techniques for the analysis of algorithms, including counting, summation, recurrences, and asymptotic relations; techniques for the design of efficient algorithms, including greedy methods, divide and conquer, and dynamic programming; examples of their application; an introduction to tractable and intractable problems.',3,'CPSC'),('CPSC418','Introduction to Cryptography',400,'The basics of cryptography, with emphasis on attaining well-defined and practical notations of security. Symmetric and public key cryptosystems; one-way and trapdoor functions; mechanisms for data integrity; digital signatures; key management; applications to the design of cryptographic systems. In addition to written homework, assessment will involve application programming; additional mathematical theory and proof-oriented exercises will be available for extra credit.',3,'CPSC'),('CPSC433','Artificial Intelligence',400,'An examination of the objectives, key techniques and achievements of work on artificial intelligence in Computer Science.',3,'CPSC'),('CPSC441','Computer Networks',400,'Principles and practice in modern telecommunications, computer communications and networks. Layered communication protocols and current physical, data link, network and Internet protocol layers. Circuit switching, packet switching, and an introduction to broadband multimedia networking.',3,'CPSC'),('CPSC449','Programming Paradigms',400,'Examination of the basic principles of the major programming language paradigms. Focus on declarative paradigms such as functional and logic programming. Data types, control expressions, loops, types of references, lazy evaluation, different interpretation principles, information hiding.',3,'CPSC'),('CPSC453','Introduction to Computer Graphics',400,'Introduction to computer graphics. Principles of raster image generation. Example of a graphics API. Graphics primitives. Co-ordinate systems, affine transformations and viewing of graphical objects. Introduction to rendering including shading models and ray tracing. Introduction to modelling including polygon meshes, subdivision, and parametric curves and surfaces.',3,'CPSC'),('CPSC457','Principles of Operating Systems',400,'An introduction to operating systems principles. Performance measurement; concurrent programs; the management of information, memory and processor resources.',3,'CPSC'),('CPSC461','Information Structures',400,'File architecture and manipulation techniques for various file types. Physical characteristics of current mass storage devices. Advanced data structures and algorithms for implementing various sequential and hierarchical file structures. File organization and design for various applications, file systems and other storage management techniques including website design.',3,'CPSC'),('CPSC471','Database Management Systems',400,'Conceptual, internal and external data bases. Relational data base systems and SQL. The normal forms, data base design, and the entity-relationship approach.',3,'CPSC'),('CPSC481','Human Computer Interaction I',400,'Fundamental theory and practice of the design, implementation, and evaluation of human-computer interfaces. Topics include: principles of design; methods for evaluating interfaces with or without user involvement; techniques for prototyping and implementing graphical user interfaces.',3,'CPSC'),('CPSC491','Techniques for Numerical Computation',400,'Elementary techniques for the numerical solution of mathematical problems on a computer, including methods for solving linear and non-linear equations, numerical integration, and interpolation.',3,'CPSC'),('CPSC501','Advanced Programming Techniques',500,'Theory and application of advanced programming methods and tools. Recent issues as well as those of an enduring nature will be discussed.',3,'CPSC'),('CPSC505','Foundations of Access Control',500,'Application of formal methods and mathematical logic to the modelling of access control systems and the design of policy languages. Topics include safety and resiliency analysis, proof of policy compliance, expressiveness of policy languages, policy analysis, as well as a survey of modern paradigms of access control.',3,'CPSC'),('CPSC511','Introduction to Complexity Theory',500,'Time and space complexity; the classes P, LOGSPACE, PSPACE and their nondeterministic counterparts; containments and separations between complexity classes; intractability and the theory of NP-completeness; complexity theories for probabilistic algorithms and for parallel algorithms.',3,'CPSC'),('CPSC513','Computability',500,'Computable functions; decidable and undecidable problems; Church\'s thesis and recursive functions.',3,'CPSC'),('CPSC517','Design and Analysis of Algorithms 2',500,'Advanced techniques for the design and analysis of deterministic and probabilistic algorithms; techniques for deriving lower bounds on the complexity of problems.',3,'CPSC'),('CPSC518','Introduction to Computer Algebra',500,'Fundamental problems, classical and modern algorithms, and algorithm design and analysis techniques of use in computer algebra. Integer and polynomial arithmetic. Additional problems in computer algebra, possibly including problems in computational linear algebra, factorization, and concerning systems of polynomial equations will be considered as time permits.',3,'CPSC'),('CPSC519','Introduction to Quantum Computation',500,'Introduction to quantum computing. Quantum algorithms, quantum search, quantum fourier transforms, quantum error correcting codes, quantum cryptography, nonlocality and quantum communication complexity, and quantum computational complexity.',3,'CPSC'),('CPSC521','Foundations of Functional Programming',500,'Theoretical foundations of functional programming: the lambda-calculus, beta-reduction, confluence, and reduction strategies. Programming syntax: solving recursive equations with the Y-combinator, let and letrec, types, datatypes, and patterns. Programming in a functional language: recursion patterns, useful combinators, maps, and folds, for datatypes. Example applications: recursive descent parsing, unification, combinatorial algorithms, theorem proving.',3,'CPSC'),('CPSC522','Introduction to Randomized Algorithms',500,'Techniques for the design and analysis of randomized algorithms; discrete probability theory; randomized data structures; lower bound techniques; randomized complexity classes; advanced algorithmic applications from various areas.',3,'CPSC'),('CPSC525','Principles of Computer Security',500,'Security policies and protection mechanisms for a computing system, including such topics as design principles of protection systems, authentication and authorization, reference monitors, security architecture of popular platforms, formal modelling of protection systems, discretionary access control, safety analysis, information flow control, integrity, role-based access control. Legal and ethical considerations will be introduced.',3,'CPSC'),('CPSC526','Network Systems Security',500,'Attacks on networked systems and Internet protocols. Tools and techniques for detection and protection against attacks including firewalls, authentication, and cryptographic protocols. Web security attacks and defenses including same-origin policy, cross site scripting, and UI redressing. Legal and ethical issues will be introduced.',3,'CPSC'),('CPSC530','Information Theory and Security',500,'Information theoretic concepts such as entropy and mutual information and their applications to defining and evaluating information security systems including encryption, authentication, secret sharing and secure message transmission.',3,'CPSC'),('CPSC531','Systems Modelling and Simulation',500,'An introduction to the modelling and simulation of stochastic systems; programming language issues; model and tool design; input data modelling; simulation experiments; and the interpretation of simulation results.',3,'CPSC'),('CPSC535','Introduction to Image Analysis and Computer Vision',500,'Standard methods used in the analysis of digital images. Image acquisition and display: visual perception; digital representation. Sampling and enhancement. Feature extraction and classification methods. Object recognition.',3,'CPSC'),('CPSC544','Machine Learning',500,'Presenting various techniques for learning various kinds of knowledge, including rules, parameters, trees and graphs, partitions of sets, sequences and behaviours, and cases. Pointing out the components that can be improved using knowledge about the application area of a system. Looking at various pre-processing and post-processing improvement techniques.',3,'CPSC'),('CPSC550','Systems Administration',500,'Topics and practices in systems administration and management. Required and optional administration duties and responsibilities. Moral and ethical conundrums, and legal responsibilities, in systems operation. Configuration and installation of operating systems and network and systems services.',3,'CPSC'),('CPSC556','Machine Learning in Biometric Security',500,'Principles of machine learning in biometric system design. Examine methods of expert decision making in multi-modal systems using rank, score, decision and fuzzy level fusion. Biometric classification using traditional machine learning methods and modern deep learning architectures. Application topics may include image processing, pattern recognition, data mining, medicine, defense and cybersecurity.',3,'CPSC'),('CPSC559','Introduction to Distributed Systems',500,'Designing and implementing distributed systems that overcome challenges due to concurrent computation, failure of components in the system and heterogeneity of processors and communication channels.',3,'CPSC'),('CPSC565','Emergent Computing',500,'An insight into a new mindset for programming as an emergent and evolutionary process of \"breeding,\" rather than constructing. Programs can evolve to perform specific tasks in a bottom-up fashion rather than being manually coded. Topics will include: decentralized agent-based programming, massive parallelism and interaction, evolution, swarm intelligence.',3,'CPSC'),('CPSC567','Foundations of Multi-Agent Systems',500,'Modelling of agents and properties of multi-agent systems. Communication issues, including interaction and co-ordination concepts, forming and maintaining organizations, and competitive agent environments. Example systems; the implementation of a multi-agent system will be performed as the assignment.',3,'CPSC'),('CPSC568','Agent Communications',500,'An examination of communication paradigms in multi-agent systems. A number of paradigms will be covered including simple protocols, BDI (Believe, Desire, Intension), and social commitments.',3,'CPSC'),('CPSC571','Design and Implementation of Database Systems',500,'Implementation and design of modern database systems including query modification/optimization, recovery, concurrency, integrity, and distribution.',3,'CPSC'),('CPSC572','Fundamentals of Network Analysis and Data Mining',500,'Introduction to data mining with emphasis on frequent pattern mining, clustering and classification, data collection, network construction, basic graph theory concepts and network analysis metrics, and case studies.',3,'CPSC'),('CPSC573','Visualization and Analytics',500,'The full data analysis lifecycle from collection to presentation. Practical application of exploratory statistical, analytical, and visualization techniques to real-world data with a focus on critical thinking, accuracy, and ethics.',3,'CPSC'),('CPSC577','Biometric Technologies',500,'Principles of biometric system design, technology and performance evaluation. Verification, identification and synthesis in biometrics. Traditional and emerging techniques for fingerprint matching, face recognition, iris modelling, signature authentication, and biometric pattern recognition. Multi-modal biometrics and information fusion. Privacy and ethics considerations in deployment of biometric systems.',3,'CPSC'),('CPSC581','Human Computer Interaction II',500,'Intermediate and advanced topics and applications in human-computer interaction, to further one\'s skills for designing highly interactive human-computer interfaces.',3,'CPSC'),('CPSC583','Introduction to Information Visualization',500,'Principles of information representation, presentation and interaction. Development of mappings from data to visual structures and exploration, navigation, cues, distortion and emphasis techniques.',3,'CPSC'),('CPSC584','Human Robot Interaction',500,'Introduction to the design, implementation and evaluation of human-robot interfaces. Topics include the evaluation of human-robot interaction (HRI), theoretical, philosophical and ethical issues, exploration of applications and tasks, prototyping HRI tools, and practical implementation and evaluation methods.',3,'CPSC'),('CPSC585','Games Programming',500,'Standard techniques for the implementation of computer games. Standard multimedia programming environments and high performance multimedia. Special purpose rendering engines. Interactive control and feedback; modelling.',3,'CPSC'),('CPSC587','Fundamentals of Computer Animation',500,'Principles of traditional animation, key framing, parametric and track animation, free form deformation, inverse kinematics, dynamics, spring mass systems, particle systems, numerical integration, Lagrangian constraints, space time constraints, collisions, human animation, behavioural animation, metamorphosis, implicit animation techniques, animating liquids, gases and cloth, motion capture.',3,'CPSC'),('CPSC589','Modelling for Computer Graphics',500,'Parametric Modelling. B-splines and NURBS. Subdivision schemes. Surface subdivision. Multiresolution. Wavelets. Implicit modelling. Blends. Polygonization. Blobtree. Precise contact modelling. Solid modelling. CSG. Procedural modelling. Special topics, e.g. Differential geometry. Graph-based modelling. Topology.',3,'CPSC'),('CPSC591','Rendering',500,'Physical foundations of illuminations techniques. Colour. Radiometry and photometry. Reflection models. The rendering equation. Ray tracing. Monte Carlo techniques. Sampling and antialiasing. Texturing. Radiosity. Photon tracing. Volume rendering. Image-based rendering. Real-time shading.',3,'CPSC'),('MATH205','Mathematical Explorations',200,'A mathematics appreciation course. Topics selected by the instructor to provide a contemporary mathematical perspective and experiences in mathematical thinking. May include historical material on the development of classical mathematical ideas as well as the evolution of recent mathematics.',3,'MATH'),('MATH211','Linear Methods I',200,'An introduction to systems of linear equations, vectors in Euclidean space and matrix algebra. Additional topics include linear transformations, determinants, complex numbers, eigenvalues, and applications.',3,'MATH'),('MATH212','Mathematical Ways of Thinking',200,'A mathematical exploration course focused on investigating fundamental mathematical concepts and their applications. The course is designed to prepare students for further study in mathematics and to meet the mathematical requirements for their program of study. Learners will build conceptual understanding together with technical skill in applying the ideas covered in the course to solve problems. This course pairs elements from high school mathematics and introductory university mathematics with Indigenous Ways of Knowing.',3,'MATH'),('MATH265','University Calculus I',200,'An introduction to single variable calculus intended for students with credit in high school calculus. Limits, derivatives, and integrals of algebraic, exponential, logarithmic and trigonometric functions play a central role. Additional topics include applications of differentiation; the fundamental theorem of calculus, improper integrals and applications of integration. Differential calculus in several variables will also be introduced. ',3,'MATH'),('MATH267','University Calculus II',200,'A concluding treatment of single variable calculus and an introduction to calculus in several variables. Single variable calculus: techniques of integration, sequences, series, convergence tests, and Taylor series. Calculus of several variables: partial differentiation, multiple integration, parametric equations, and applications',3,'MATH'),('MATH271','Discrete Mathematics',200,'An introduction to proof techniques and abstract mathematical reasoning: sets, relations and functions; mathematical induction; integers, primes, divisibility and modular arithmetic; counting and combinatorics; elements of probability, discrete random variables and Bayes’ theorem.',3,'MATH'),('MATH305','Inside Mathematics',300,'An exploration of the usually tacit elements of mathematical concepts and processes, the course focuses on strategies for unpacking concepts and for sustained engagement in inquiry.',3,'MATH'),('MATH307','Complex Analysis I',300,'An initial treatment of complex analytic functions in a single variable. Topics include differentiation, Cauchy-Riemann equations, line integration, Cauchy’s theorem and Cauchy’s integral formula, Taylor’s theorem, the residue theorem, and applications to definite integrals.',3,'MATH'),('MATH311','Linear Algebra II',300,'An introductory course in the theory of abstract vector spaces: linear independence, spanning sets, basis and dimension; linear transformations and the rank-nullity theorem; the Gram-Schmidt algorithm and orthogonal diagonalization; singular value decomposition and other applications.',3,'MATH'),('MATH315','Algebra I',300,'A broad overview of the elementary theory of groups, rings and fields. Group theory: cyclic, symmetric, alternating, dihedral and classical matrix groups, cosets and Lagrange’s theorem, group homomorphisms, normal subgroups, quotient groups and the isomorphism theorem. Rings and fields: the integers modulo n, polynomial rings, ring homomorphisms, ideals, quotient rings the isomorphism theorem, unique factorization domains, principal ideal domains, Euclidean domains and the construction of finite fields.',3,'MATH'),('MATH318','Introduction to Cryptography',300,'The basics of cryptography, with emphasis on attaining well-defined and practical notions of security. Symmetric and public-key cryptosystems; one-way and trapdoor functions; mechanisms for data integrity; digital signatures; key management; applications to the design of cryptographic systems. Assessment will primarily focus on mathematical theory and proof-oriented homework problems; additional application programming exercises will be available for extra credit.',3,'MATH'),('MATH319','Transformation Geometry',300,'Geometric transformations in the Euclidean plane: Symmetry, Frieze, and Wallpaper groups.',3,'MATH'),('MATH322','Curves and Surfaces',300,'The fundamentals of the theory of curves and surfaces in three dimensional space. The theory of curves studies global properties of curves such as the four vertex theorem. The theory of surfaces introduces the fundamental quadratic forms of a surface, intrinsic and extrinsic geometry of surfaces, and the Gauss-Bonnet theorem.',3,'MATH'),('MATH325','Introduction to Optimization',300,'An example driven overview of optimization problems: quadratic forms, minimum energy and distance, least squares, generalized inverses, location and classification of critical points, variational treatment of eigenvalues, Lagrange multipliers and linear programming.',3,'MATH'),('MATH327','Number Theory',300,'Divisibility and the Euclidean algorithm, modular arithmetic and congruences, quadratic reciprocity, arithmetic functions, distribution of primes.',3,'MATH'),('MATH335','Analysis I',300,'A rigorous treatment of the theory of functions of a single real variable: functions, countable and uncountable sets; the axioms and basic topology of the real numbers; convergence of sequences; limits of functions, continuity and uniform continuity; differentiability and the mean value theorem; the Riemann integral and the fundamental theorem of calculus; series and convergence tests.',3,'MATH'),('MATH361','Linear Methods III',300,'Canonical forms. Inner product spaces, invariant subspaces and spectral theory. Quadratic forms.',3,'MATH'),('MATH367','University Calculus III',300,'An overview of differential calculus in several variables and vector calculus. Functions of several variables; limits, continuity, differentiability, partial differentiation, applications including optimization and Lagrange multipliers. Vector calculus: vector functions, line integrals and surface integrals, Green’s theorem, Stokes’ theorem, and the Divergence theorem.',3,'MATH'),('MATH371','Combinatorics and Graph Theory',300,'Counting techniques, generating functions, inclusion-exclusion, introduction to graph theory.',3,'MATH'),('MATH376','Differential Equations I',300,'Classification of ordinary differential equations, first and second order equations with applications, series solutions about regular points and singular points, special functions, Laplace transform.',3,'MATH'),('MATH383','Introduction to Mathematical Finance',300,'An introduction to the fundamental concepts of mathematical finance in an elementary setting. Topics include: risk, return, no arbitrage principle; basic financial derivatives: options, forwards and future contracts; risk free assets, time value of money, zero coupon bonds; risky assets, binomial tree model, fundamental theorem of asset pricing; portfolio management and capital asset pricing model; no arbitrage pricing of financial derivatives; hedging.',3,'MATH'),('MATH391','Numerical Analysis I',300,'Interpolation and approximation, numerical integration and differentiation, numerical methods for the solution of non-linear equations, systems of linear equations and the eigenvalue problem, introduction to a scientific computing software.',3,'MATH'),('MATH413','Introduction to Partial Differential Equations',400,'First order partial differential equations, Sturm-Liouville systems, Fourier series, Double Fourier series, Fourier integrals, Applications to boundary value problems in bounded and unbounded domains, Bessel function with applications.',3,'MATH'),('MATH429','Design and Analysis of Cryptosystems',400,'Review of basic algorithms and complexity. Designing and attacking public key cryptosystems based on number theory. Basic techniques for primality testing, factoring and extracting discrete logarithms. Elliptic curve cryptography. Additional topics may include knapsack systems, zero knowledge, attacks on hash functions, identity-based cryptography, and quantum cryptography.',3,'MATH'),('MATH431','Algebra II',400,'An intermediate course in the theory of groups and fields. Group theory: group actions, Sylow theorems, solvable, nilpotent and p-groups, simplicity of alternating groups and PSL(n,q). Field theory: algebraic and transcendental extensions, separability and normality, Galois theory, insolvability of the general quintic equation, and computation of Galois groups over the rationals.',3,'MATH'),('MATH445','Analysis II',400,'An intermediate course in the theory of metric spaces and the continuous functions that act on them: metric spaces and normed vector spaces; complete metric spaces and the Baire category theorem; continuous functions on compact metric spaces and uniform convergence; the contraction mapping principle and applications; theorems of Stone-Weierstrass and Arzelà-Ascoli; differentiability on Euclidean spaces and the implicit function theorem.',3,'MATH'),('MATH476','Differential Equations II',400,'Existence and uniqueness theorems, comparison and oscillation theorems, Green\'s functions, Sturm-Liouville problems, systems of equations, phase portraits, stability.',3,'MATH'),('MATH493','Numerical Analysis II',400,'Numerical solution of ordinary differential equations, single and multi-step methods, numerical solution of boundary value problems, numerical solution of partial differential equations, stability analysis.',3,'MATH'),('MATH501','Measure and Integration',500,'Abstract measure theory, basic integration theorems, Fubini\'s theorem, Radon-Nikodym theorem, Lp Spaces, Riesz representation theorems.',3,'MATH'),('MATH503','Mathematics of Wavelets, Signal and Image Processing',500,'Continuous and discrete Fourier transforms, the Fast Fourier Transform, wavelet transforms, multiresolution analysis and orthogonal wavelet bases, and applications.',3,'MATH'),('MATH511','Algebra III',500,'A sophisticated introduction to modules over rings, especially commutative rings with identity. Major topics include: snake lemma; free modules; tensor product; hom-tensor duality; finitely presented modules; invariant factors; free resolutions; and the classification of finitely generated modules over principal ideal domains. Adjoint functors play a large role. The course includes applications to linear algebra, including rational forms.',3,'MATH'),('MATH515','Foundations',500,'Set theory, mathematical logic, and category theory. Topics covered will vary based on interests of students and instructor.',3,'MATH'),('MATH521','Complex Analysis II',500,'A rigorous study of function of a single complex variable. Holomorphic function, Cauchy integral formula and its applications. Conformal mappings. Fractional linear transformations. Argument principle. Schwarz lemma. Conformal self-maps of the unit disk.',3,'MATH'),('MATH525','Introduction to Algebraic Topology',500,'An introduction to the algebraic invariants that distinguish topological spaces. Specifically, the course focuses on the fundamental group and its applications, and homology. Students will be introduced to the basics of homological algebra.',3,'MATH'),('MATH527','Computational Number Theory',500,'An investigation of major problems in computational number theory, with emphasis on practical techniques and their computational complexity. Topics include basic integer arithmetic algorithms, finite fields, primality proving, factoring methods, algorithms in algebraic number fields.',3,'MATH'),('MATH545','Analysis III',500,'Sequences and series of functions; Lebesgue integration on the line, Fourier series and the Fourier transform, pointwise convergence theorems, distributions and generalized functions.',3,'MATH'),('MATH581','Stochastic Calculus for Finance',500,'Martingales in discrete and continuous time, risk-neutral valuations, discrete- and continuous-time (B,S)-security markets, Cox-Ross-Rubinstein formula, Wiener and Poisson processes, Ito formula, stochastic differential equations, Girsanov’s theorem, Black-Scholes and Merton formulas, stopping times and American options, stochastic interest rates and their derivatives, energy and commodity models and derivatives, value-at-risk and risk management.',3,'MATH'),('MATH583','Computational Finance',500,'Review of financial asset price and option valuation models; model calibration; tree-based methods; finite-difference methods; Monte Carlo simulation; Fourier methods.',3,'MATH'),('SENG300','Introduction to Software Engineering',300,'Introduction to the development and evolution of software. Covers key conceptual foundations as well as key methods and techniques used in the different phases of the software lifecycle. Emphasis on both technical and soft skills needed for high quality software and software-based products developed in teams.',3,'CPSC'),('SENG401','Software Architecture',400,'Software architectures and design for non-functional software properties. Introduction to program comprehension skills including analysis of existing architectures.',3,'CPSC'),('SENG438','Software Testing, Reliability, and Quality',400,'Concepts, methods, techniques, processes, and tools for software testing. The principles, processes, and applications of software reliability and software quality assurance.',3,'CPSC'),('SENG471','Software Requirements Engineering',400,'Introduction to elicitation, modelling, expression and validation of the requirements. Techniques and methodologies for requirements engineering. Applications of requirements engineering to the management of the software development lifecycle.',3,'CPSC'),('SENG511','Software Project Management',500,'Analysis of methods, tools, and techniques for software project management as an effort to achieve quality software products.',3,'CPSC'),('SENG513','Web-based Systems',500,'An overview of software engineering methods and technologies for developing web-based software systems.',3,'CPSC'),('SENG515','Agile Software Engineering',500,'Investigation and application of agile software development practices.',3,'CPSC'),('SENG523','Formal Methods',500,'Software specification, verification, and validation using a mathematically rigorous technique.',3,'CPSC'),('SENG533','Software Performance Evaluation',500,'Analyzing quality requirements of large-scale software. Performance analysis, testing, and tuning techniques. Evaluating software scalability. Capacity planning methodologies. Issues related to safety, security, and availability of software.',3,'CPSC'),('SENG541','Fundamentals of Software Evolution and Reuse',500,'Phenomena and approaches involved in the evolution and reuse of large-scale software, including design for modifiability and tool support. Strengths and weaknesses of industrially-current techniques as well as recent research results.',3,'CPSC'),('SENG550','Scalable Data Analytics',500,'Sources and characteristics of large scale data, i.e., \"big data\", large scale data analysis, benefits of large scale data analysis to various industry domains, programming paradigms and middleware technologies for scalable data analysis, algorithms that enable large scale data processing, application of large scale data algorithms in selected application domains, e.g., web user behaviour analysis and text processing, analytics frameworks.',3,'CPSC');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `Department_Name` varchar(255) NOT NULL,
  `Phone_Number` varchar(255) DEFAULT NULL,
  `Number_of_Faculty` int DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Office_Building` varchar(255) DEFAULT NULL,
  `Office_Room` varchar(255) DEFAULT NULL,
  `University_Name` varchar(255) NOT NULL,
  PRIMARY KEY (`Department_Name`),
  KEY `University_Name` (`University_Name`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`University_Name`) REFERENCES `university` (`University_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('CPSC','403-111-1111',100,'cpsc@ucalgary.ca','ICT','101','University of Calgary'),('MATH','403-222-2222',100,'math@ucalgary.ca','MS','101','University of Calgary');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `it`
--

DROP TABLE IF EXISTS `it`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `it` (
  `ITID` char(8) NOT NULL,
  `Email` varchar(255) NOT NULL,
  PRIMARY KEY (`ITID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `it`
--

LOCK TABLES `it` WRITE;
/*!40000 ALTER TABLE `it` DISABLE KEYS */;
INSERT INTO `it` VALUES ('12345678','test@gmail.com');
/*!40000 ALTER TABLE `it` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itlogin`
--

DROP TABLE IF EXISTS `itlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itlogin` (
  `userID` char(8) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`userID`),
  KEY `itlogin_fk_1_idx` (`userID`),
  CONSTRAINT `itlogin_fk_1` FOREIGN KEY (`userID`) REFERENCES `it` (`ITID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itlogin`
--

LOCK TABLES `itlogin` WRITE;
/*!40000 ALTER TABLE `itlogin` DISABLE KEYS */;
INSERT INTO `itlogin` VALUES ('12345678','$2a$10$22DzzdUDXL4shxUWjafgkOFLv9QA7mWzLmLsFSN9JCig9WQgEpGm2');
/*!40000 ALTER TABLE `itlogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecture`
--

DROP TABLE IF EXISTS `lecture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecture` (
  `LectureID` char(3) NOT NULL,
  `CourseID` char(7) NOT NULL,
  `Enrollment_Limit` int DEFAULT NULL,
  `Enrollment_Current_Number` int DEFAULT NULL,
  `Building_Name` varchar(255) DEFAULT NULL,
  `Room_Location` varchar(255) DEFAULT NULL,
  `Semester_Name` varchar(10) NOT NULL,
  `Days` varchar(5) DEFAULT NULL,
  `Start_time` time DEFAULT NULL,
  `End_time` time DEFAULT NULL,
  PRIMARY KEY (`LectureID`,`CourseID`,`Semester_Name`),
  KEY `CourseID` (`CourseID`),
  KEY `Semester_Name` (`Semester_Name`),
  CONSTRAINT `lecture_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lecture_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lecture_ibfk_3` FOREIGN KEY (`Semester_Name`) REFERENCES `semester` (`Semester_Name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lecture_ibfk_4` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lecture_ibfk_5` FOREIGN KEY (`Semester_Name`) REFERENCES `semester` (`Semester_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture`
--

LOCK TABLES `lecture` WRITE;
/*!40000 ALTER TABLE `lecture` DISABLE KEYS */;
/*!40000 ALTER TABLE `lecture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `major`
--

DROP TABLE IF EXISTS `major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `major` (
  `Major_Name` varchar(255) NOT NULL,
  `No_credits` int DEFAULT NULL,
  PRIMARY KEY (`Major_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `major`
--

LOCK TABLES `major` WRITE;
/*!40000 ALTER TABLE `major` DISABLE KEYS */;
INSERT INTO `major` VALUES ('Computer Science',NULL),('Mathematics',NULL);
/*!40000 ALTER TABLE `major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `major_requirement`
--

DROP TABLE IF EXISTS `major_requirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `major_requirement` (
  `CourseID` char(7) NOT NULL,
  `Major` varchar(255) NOT NULL,
  `Minimum_Grade` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`CourseID`,`Major`),
  KEY `CourseID` (`CourseID`),
  KEY `major_requirement_ibfk_2_idx` (`Major`),
  CONSTRAINT `major_requirement_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `major_requirement_ibfk_2` FOREIGN KEY (`Major`) REFERENCES `major` (`Major_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `major_requirement`
--

LOCK TABLES `major_requirement` WRITE;
/*!40000 ALTER TABLE `major_requirement` DISABLE KEYS */;
INSERT INTO `major_requirement` VALUES ('CPSC231','Computer Science',NULL),('CPSC233','Computer Science',NULL),('CPSC251','Computer Science',NULL),('CPSC331','Computer Science',NULL),('CPSC351','Computer Science',NULL),('CPSC355','Computer Science',NULL),('CPSC413','Computer Science',NULL),('CPSC449','Computer Science',NULL),('CPSC457','Computer Science',NULL),('MATH211','Computer Science',NULL),('MATH265','Computer Science',NULL),('SENG300','Computer Science',NULL);
/*!40000 ALTER TABLE `major_requirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `minor`
--

DROP TABLE IF EXISTS `minor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `minor` (
  `Minor_Name` varchar(255) NOT NULL,
  `No_credits` int DEFAULT NULL,
  PRIMARY KEY (`Minor_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `minor`
--

LOCK TABLES `minor` WRITE;
/*!40000 ALTER TABLE `minor` DISABLE KEYS */;
INSERT INTO `minor` VALUES ('Computer Science',NULL),('Mathematics',NULL);
/*!40000 ALTER TABLE `minor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `minor_requirement`
--

DROP TABLE IF EXISTS `minor_requirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `minor_requirement` (
  `CourseID` char(7) NOT NULL,
  `Minor` varchar(255) NOT NULL,
  `Minimum_Grade` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`CourseID`,`Minor`),
  KEY `CourseID` (`CourseID`),
  KEY `minor_requirement_ibfk_2_idx` (`Minor`),
  CONSTRAINT `minor_requirement_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `minor_requirement_ibfk_2` FOREIGN KEY (`Minor`) REFERENCES `minor` (`Minor_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `minor_requirement`
--

LOCK TABLES `minor_requirement` WRITE;
/*!40000 ALTER TABLE `minor_requirement` DISABLE KEYS */;
INSERT INTO `minor_requirement` VALUES ('CPSC231','Computer Science',NULL),('CPSC233','Computer Science',NULL),('CPSC331','Computer Science',NULL);
/*!40000 ALTER TABLE `minor_requirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prerequisite`
--

DROP TABLE IF EXISTS `prerequisite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prerequisite` (
  `CourseID` char(7) NOT NULL,
  `Required_CourseID` char(7) NOT NULL,
  `Minimum_Grade` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`CourseID`,`Required_CourseID`),
  KEY `CourseID` (`CourseID`),
  KEY `Required_CourseID` (`Required_CourseID`),
  CONSTRAINT `prerequisite_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `prerequisite_ibfk_2` FOREIGN KEY (`Required_CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prerequisite`
--

LOCK TABLES `prerequisite` WRITE;
/*!40000 ALTER TABLE `prerequisite` DISABLE KEYS */;
INSERT INTO `prerequisite` VALUES ('CPSC233','CPSC231',NULL),('CPSC251','CPSC231',NULL),('CPSC331','CPSC233',NULL),('CPSC331','CPSC251',NULL),('CPSC335','CPSC331',NULL),('CPSC351','CPSC233',NULL),('CPSC351','CPSC251',NULL),('CPSC351','MATH265',NULL),('CPSC355','CPSC233',NULL),('CPSC359','CPSC355',NULL),('CPSC365','CPSC331',NULL),('CPSC365','CPSC355',NULL),('CPSC393','CPSC233',NULL),('CPSC405','SENG300',NULL),('CPSC409','CPSC355',NULL),('CPSC411','CPSC331',NULL),('CPSC411','CPSC355',NULL),('CPSC413','CPSC331',NULL),('CPSC413','MATH211',NULL),('CPSC413','MATH265',NULL),('CPSC418','CPSC331',NULL),('CPSC418','CPSC351',NULL),('CPSC433','CPSC351',NULL),('CPSC441','CPSC331',NULL),('CPSC441','CPSC355',NULL),('CPSC449','CPSC331',NULL),('CPSC449','CPSC351',NULL),('CPSC453','CPSC331',NULL),('CPSC453','MATH211',NULL),('CPSC453','MATH267',NULL),('CPSC457','CPSC331',NULL),('CPSC457','CPSC355',NULL),('CPSC461','CPSC331',NULL),('CPSC461','CPSC355',NULL),('CPSC471','CPSC331',NULL),('CPSC481','SENG300',NULL),('CPSC491','CPSC331',NULL),('CPSC491','MATH211',NULL),('CPSC491','MATH265',NULL),('CPSC501','CPSC449',NULL),('CPSC505','CPSC413',NULL),('CPSC505','CPSC449',NULL),('CPSC511','CPSC413',NULL),('CPSC517','CPSC413',NULL),('CPSC518','CPSC413',NULL),('CPSC518','MATH211',NULL),('CPSC519','CPSC413',NULL),('CPSC519','MATH311',NULL),('CPSC521','CPSC351',NULL),('CPSC521','CPSC449',NULL),('CPSC522','CPSC413',NULL),('CPSC525','CPSC351',NULL),('CPSC525','CPSC457',NULL),('CPSC526','CPSC441',NULL),('CPSC530','CPSC351',NULL),('CPSC531','CPSC457',NULL),('CPSC535','MATH311',NULL),('CPSC544','CPSC433',NULL),('CPSC550','CPSC441',NULL),('CPSC550','CPSC457',NULL),('CPSC556','CPSC331',NULL),('CPSC559','CPSC441',NULL),('CPSC559','CPSC457',NULL),('CPSC561','CPSC413',NULL),('CPSC565','CPSC231',NULL),('CPSC567','CPSC433',NULL),('CPSC567','CPSC457',NULL),('CPSC568','CPSC433',NULL),('CPSC571','CPSC471',NULL),('CPSC572','CPSC471',NULL),('CPSC573','CPSC331',NULL),('CPSC577','CPSC331',NULL),('CPSC581','CPSC481',NULL),('CPSC583','CPSC331',NULL),('CPSC584','CPSC481',NULL),('CPSC585','CPSC453',NULL),('CPSC587','CPSC453',NULL),('CPSC589','CPSC453',NULL),('CPSC591','CPSC453',NULL),('MATH267','MATH265',NULL),('MATH271','MATH211',NULL),('MATH305','MATH211',NULL),('MATH305','MATH271',NULL),('MATH307','MATH211',NULL),('MATH307','MATH267',NULL),('MATH307','MATH271',NULL),('MATH311','MATH211',NULL),('MATH315','MATH271',NULL),('MATH318','MATH211',NULL),('MATH318','MATH271',NULL),('MATH319','MATH211',NULL),('MATH319','MATH271',NULL),('MATH322','MATH271',NULL),('MATH322','MATH367',NULL),('MATH322','MATH376',NULL),('MATH325','MATH311',NULL),('MATH325','MATH367',NULL),('MATH327','MATH271',NULL),('MATH335','MATH267',NULL),('MATH335','MATH271',NULL),('MATH361','MATH267',NULL),('MATH361','MATH311',NULL),('MATH367','MATH211',NULL),('MATH367','MATH267',NULL),('MATH371','MATH267',NULL),('MATH371','MATH271',NULL),('MATH376','MATH211',NULL),('MATH376','MATH267',NULL),('MATH391','CPSC231',NULL),('MATH391','MATH211',NULL),('MATH391','MATH267',NULL),('MATH413','MATH367',NULL),('MATH413','MATH376',NULL),('MATH429','MATH315',NULL),('MATH429','MATH318',NULL),('MATH431','MATH311',NULL),('MATH431','MATH315',NULL),('MATH445','MATH311',NULL),('MATH445','MATH335',NULL),('MATH445','MATH367',NULL),('MATH476','MATH335',NULL),('MATH476','MATH367',NULL),('MATH476','MATH376',NULL),('MATH493','MATH376',NULL),('MATH493','MATH391',NULL),('MATH493','MATH413',NULL),('MATH501','MATH445',NULL),('MATH503','MATH391',NULL),('MATH511','MATH361',NULL),('MATH511','MATH431',NULL),('MATH515','MATH335',NULL),('MATH515','MATH431',NULL),('MATH521','MATH307',NULL),('MATH521','MATH445',NULL),('MATH525','MATH431',NULL),('MATH525','MATH445',NULL),('MATH527','MATH327',NULL),('MATH527','MATH431',NULL),('MATH545','MATH445',NULL),('MATH581','MATH383',NULL),('MATH583','MATH383',NULL),('MATH583','MATH431',NULL),('MATH583','MATH493',NULL),('SENG300','CPSC233',NULL),('SENG401','CPSC331',NULL),('SENG401','SENG300',NULL),('SENG438','CPSC331',NULL),('SENG438','SENG300',NULL),('SENG471','CPSC331',NULL),('SENG511','SENG300',NULL),('SENG513','SENG300',NULL),('SENG515','SENG401',NULL),('SENG523','SENG300',NULL),('SENG533','CPSC457',NULL),('SENG533','SENG300',NULL),('SENG541','SENG300',NULL),('SENG550','CPSC331',NULL),('SENG550','SENG300',NULL);
/*!40000 ALTER TABLE `prerequisite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semester`
--

DROP TABLE IF EXISTS `semester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semester` (
  `Semester_Name` varchar(10) NOT NULL,
  `Start_Date` date NOT NULL,
  `End_Date` date NOT NULL,
  `Registration_Deadline` date NOT NULL,
  `Withdrawal_Deadling` date NOT NULL,
  `Exams_Start_Date` date DEFAULT NULL,
  `Exams_End_Date` date DEFAULT NULL,
  `University_Name` varchar(255) NOT NULL,
  PRIMARY KEY (`Semester_Name`),
  KEY `University_Name` (`University_Name`),
  CONSTRAINT `semester_ibfk_1` FOREIGN KEY (`University_Name`) REFERENCES `university` (`University_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semester`
--

LOCK TABLES `semester` WRITE;
/*!40000 ALTER TABLE `semester` DISABLE KEYS */;
INSERT INTO `semester` VALUES ('F24','0000-00-00','0000-00-00','0000-00-00','0000-00-00',NULL,NULL,'University of Calgary'),('W24','0000-00-00','0000-00-00','0000-00-00','0000-00-00',NULL,NULL,'University of Calgary');
/*!40000 ALTER TABLE `semester` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `StudentID` char(8) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `GPA` float DEFAULT NULL,
  `Year_of_Study` int DEFAULT NULL,
  `Enrollment_Status` tinyint(1) NOT NULL,
  `First_Name` varchar(255) NOT NULL,
  `Last_Name` varchar(255) NOT NULL,
  `Date_of_Birth` date DEFAULT NULL,
  `Current_Address` varchar(255) DEFAULT NULL,
  `Permanent_Address` varchar(255) DEFAULT NULL,
  `Department_Name` varchar(255) NOT NULL,
  PRIMARY KEY (`StudentID`),
  KEY `Department_Name` (`Department_Name`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`Department_Name`) REFERENCES `department` (`Department_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('12345678','test@ucalgary.ca',4,2,1,'Lebron','James','0000-00-00','123 Main Street','123 Main Street','CPSC');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentlogin`
--

DROP TABLE IF EXISTS `studentlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentlogin` (
  `userID` char(8) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentlogin`
--

LOCK TABLES `studentlogin` WRITE;
/*!40000 ALTER TABLE `studentlogin` DISABLE KEYS */;
INSERT INTO `studentlogin` VALUES ('12345678','$2a$10$xmu1eGgfv4R0dlp91js2K.bIiAIucCcrMsgNCitlCP88AdPQM8bwS');
/*!40000 ALTER TABLE `studentlogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `take_major`
--

DROP TABLE IF EXISTS `take_major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `take_major` (
  `StudentID` char(8) NOT NULL,
  `Major` varchar(255) NOT NULL,
  PRIMARY KEY (`StudentID`,`Major`),
  KEY `Major` (`Major`),
  CONSTRAINT `take_major_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`),
  CONSTRAINT `take_major_ibfk_2` FOREIGN KEY (`Major`) REFERENCES `major` (`Major_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `take_major`
--

LOCK TABLES `take_major` WRITE;
/*!40000 ALTER TABLE `take_major` DISABLE KEYS */;
INSERT INTO `take_major` VALUES ('12345678','Computer Science');
/*!40000 ALTER TABLE `take_major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `take_minor`
--

DROP TABLE IF EXISTS `take_minor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `take_minor` (
  `StudentID` char(8) NOT NULL,
  `Minor` varchar(255) NOT NULL,
  PRIMARY KEY (`StudentID`,`Minor`),
  KEY `Minor` (`Minor`),
  CONSTRAINT `take_minor_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`),
  CONSTRAINT `take_minor_ibfk_2` FOREIGN KEY (`Minor`) REFERENCES `minor` (`Minor_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `take_minor`
--

LOCK TABLES `take_minor` WRITE;
/*!40000 ALTER TABLE `take_minor` DISABLE KEYS */;
/*!40000 ALTER TABLE `take_minor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taken_by`
--

DROP TABLE IF EXISTS `taken_by`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taken_by` (
  `CourseID` char(7) NOT NULL,
  `StudentID` char(8) NOT NULL,
  PRIMARY KEY (`CourseID`,`StudentID`),
  KEY `StudentID` (`StudentID`),
  KEY `taken_by_ibfk_1_idx` (`CourseID`),
  CONSTRAINT `taken_by_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `taken_by_ibfk_3` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taken_by`
--

LOCK TABLES `taken_by` WRITE;
/*!40000 ALTER TABLE `taken_by` DISABLE KEYS */;
INSERT INTO `taken_by` VALUES ('CPSC231','12345678'),('CPSC233','12345678'),('CPSC251','12345678'),('CPSC331','12345678'),('MATH211','12345678'),('MATH265','12345678');
/*!40000 ALTER TABLE `taken_by` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutorial`
--

DROP TABLE IF EXISTS `tutorial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutorial` (
  `TutorialNo` char(3) NOT NULL,
  `CourseID` char(7) NOT NULL,
  `semester_name` varchar(10) NOT NULL,
  `TA_name` varchar(255) DEFAULT NULL,
  `Enrollment_Limit` int DEFAULT NULL,
  `Enrollment_Current_Number` int DEFAULT NULL,
  `Building_Name` varchar(255) DEFAULT NULL,
  `Room_Location` varchar(255) DEFAULT NULL,
  `Days` varchar(5) DEFAULT NULL,
  `Start_time` time DEFAULT NULL,
  `End_time` time DEFAULT NULL,
  PRIMARY KEY (`TutorialNo`,`CourseID`,`semester_name`),
  KEY `tutorial_fk_semester` (`semester_name`),
  KEY `tutorial_ibfk_1_idx` (`CourseID`),
  CONSTRAINT `tutorial_fk_semester` FOREIGN KEY (`semester_name`) REFERENCES `semester` (`Semester_Name`),
  CONSTRAINT `tutorial_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutorial`
--

LOCK TABLES `tutorial` WRITE;
/*!40000 ALTER TABLE `tutorial` DISABLE KEYS */;
/*!40000 ALTER TABLE `tutorial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `university`
--

DROP TABLE IF EXISTS `university`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `university` (
  `University_Name` varchar(255) NOT NULL,
  `Website` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Number_of_Faculty` int DEFAULT NULL,
  `Number_of_Students` int DEFAULT NULL,
  `Year_of_Establishment` year DEFAULT NULL,
  `Country` varchar(255) NOT NULL,
  `Province` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `Postal_Code` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`University_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university`
--

LOCK TABLES `university` WRITE;
/*!40000 ALTER TABLE `university` DISABLE KEYS */;
INSERT INTO `university` VALUES ('University of Calgary','ucalgary.ca','ucalgary@ucalgary.ca',1000,40000,1966,'Canada','AB','Calgary','T2N 1R4');
/*!40000 ALTER TABLE `university` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-07 22:59:31
