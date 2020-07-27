import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
    templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {
    _courses: Course[];
    _filterBy: string;
    filteredCourses: Course[] = [];

    constructor(private courseService: CourseService) {}

    ngOnInit(): void {
        this.retrieveAll();
    }

    retrieveAll(): void {
        this.courseService.retrieveAll().subscribe({
            next: courses => { 
                this._courses = courses; 
                this.filteredCourses = this._courses;
            },
            error: e => {
                console.log(e);
            } 
        });
    }

    deleteById(id: number): void {
        this.courseService.deleteById(id).subscribe({
            next: () => { this.retrieveAll(); },
            error: e => console.log(e)
        })
    }

    set filter(value: string) {
        this._filterBy = value;
        this.filteredCourses = this._courses
            .filter((course: Course) => { 
                return course.name.toLowerCase().includes(this._filterBy.toLowerCase()) 
            });
    }

    get filter() {
        return this._filterBy;
    }
}