class Course {
    constructor(id, time, date, classes){
        this.id = id;
        this.time = time;
        this.date = date;
        this.classes = classes;
    }
    toString () {
        return this.id;
    }
}

class Student {
    constructor(id, name, gpa, courses){
        this.id = id;
        this.name = name;
        this.gpa = gpa;
        this.courses = courses;
    }
    toString () {
        return this.name+'';
    }
}

/*class Database {
    constructor(){
        this.courses = new Map();
        this.students = new Map();
    }
    
}*/