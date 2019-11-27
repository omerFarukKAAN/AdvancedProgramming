class Course {
    constructor(id, time, date, classes) {
        this.id = id;
        this.time = time;
        this.date = date;
        this.classes = classes;
    }
    toString() {
        return this.id;
    }
}

class Student {
    constructor(id, name, gpa, courses) {
        this.id = id;
        this.name = name;
        this.gpa = gpa;
        this.courses = courses;
    }
    toString() {
        return this.name + '';
    }
}

class Database {
    constructor() {
        this.courses = new Map();
        this.students = new Map();
        this.readCourses();
        this.readStudents();
    }
    
    parseCourse(txt) {
        let elements = txt.split('\t');
        return new Course(elements[0], elements[1], elements[2], elements.slice(3));
    }

    parseStudent(txt) {
        let elements = txt.split('\t');
        return new Student(elements[0], elements[1], elements[2], elements.slice(3));
    }

    mapCourses(txt) {
        let lines = txt.split("\n");
        for (let line of lines) {
            let course = this.parseCourse(line);
            data.courses.set(course.id, course);
        }
    }

    readCourses() {
        fetch("https://maeyler.github.io/JS/data/Courses.txt")
            .then(res => res.text())
            .then(res => [
                this.mapCourses(res)
            ])
    }

    mapStudents(txt) {
        let lines = txt.split("\n");
        for (let line of lines) {
            let std = this.parseStudent(line);
            data.students.set(std.id, std);
        }
    }

    readStudents() {
        fetch("https://maeyler.github.io/JS/data/Students.txt")
            .then(res => res.text())
            .then(res => [
                this.mapStudents(res)
            ])
    }
}