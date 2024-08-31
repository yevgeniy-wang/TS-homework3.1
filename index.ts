interface ILecturer {
    name: string;
    surname: string;
    position: string;
    expirience: string; //типа bio
    courses: string[];
    contacts: string[];
}

class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: Area[] = [];
  _lecturers: ILecturer[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Area[] {
    return this._areas;
  }

  addArea(area: Area) {
    this._areas.push(area);
  }

  removeArea(area: Area) {
    this._areas = this._areas.filter((ar) => ar.name !== area.name);
  } 

  get lecturers(): ILecturer[] {
    return this._lecturers;
  }

  addLecturer(lecturer: ILecturer) {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturer: ILecturer) {
    this._lecturers = this._lecturers.filter((lec) => lec.name !== lecturer.name);
  } 
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: Level[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  addLevel(level: Level) {
    this._levels.push(level);
  }

  removeLevel(level: Level) {
    this._levels = this._levels.filter((lv) => lv.name !== level.name);
  } 
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: Group[] = [];
  _name: string;
  _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get groups(): Group[] {
    return this._groups;
  }

  addGroup(group: Group) {
    this._groups.push(group);
  }

  removeGroup(group: Group) {
    this._groups = this._groups.filter((gr) => gr.directionName !== group.directionName);
  } 

}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: Area; //класс Area
  _status: 'active' | 'archieved' | 'not started';
  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
  _directionName: string;
  _levelName: string;

  constructor(directionName: string, levelName: string, area: Area) {
    this._directionName = directionName;
    this._levelName = levelName;
    this._area = area;
    this._status = 'not started';
  }

  get area(): Area {
    return this._area;
  }

  get directionName(): string {
    return this._directionName;
  }

  get levelName(): string {
    return this._levelName;
  }

  get status(): 'active' | 'archieved' | 'not started' {
    return this._status;
  }

  set status(status: 'active' | 'archieved') {
    this._status = status
  }

  get students(): Student[] {
    return this._students;
  }

  addStudent(student: Student) {
    this._students.push(student);
  }

  removeStudent(student: Student) {
    this._students = this._students.filter((std) => std.fullName !== student.fullName);
  } 

  showPerformance(): Student[] {
    const sortedStudents: Student[] = this._students.toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    return sortedStudents;
  }
}

interface IGrade {
    [key: string]: number;
}

class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: IGrade = {}; // workName: mark
  _visits: boolean[] = []; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  set grade(mark: IGrade) {
    this._grades = {
        ...this._grades,
        ...mark,
    }
  }

  set visit(vis: boolean) {
    this._visits.push(vis)
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade: number = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage: number = (this._visits.filter(present => present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
