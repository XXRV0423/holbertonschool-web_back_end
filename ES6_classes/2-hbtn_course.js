export default class HolbertonCourse {
    constructor(name, lenght, students) {
        this.name = name;
        this.lenght = lenght;
        this.students = students;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        if (typeof newName !== 'string') {
            throw new TypeError('Name must be a string');
        }
        this._name = newName;
    }
    get lenght() {
        return this._lenght;
    }

    set lenght(newLenght) {
        if (typeof newLenght !== 'number') {
            throw new TypeError('Lenght must be a number');
        }
        this._lenght = newLenght;
    }

    get students() {
        return this._students;
    }

    set students(newStudents) {
        if (!Array.isArray(newStudents)) {
            throw new TypeError('Students must be an array');
        }

        this._students = newStudents;
    }
}