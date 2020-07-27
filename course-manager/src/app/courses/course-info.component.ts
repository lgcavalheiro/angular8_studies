import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
    templateUrl: './course-info.component.html'
})
export class CourseInfoComponent implements OnInit {

    course: Course;
    saveOk: boolean = false;

    constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService, private router: Router) {}

    ngOnInit(): void {
        this.courseService
            .retrieveById(
                +this.activatedRoute.snapshot
                .paramMap.get('id')
                ).subscribe({
                    next: course => this.course = course,
                    error: e => console.log(e)
                });
    }

    evalType(value: any): string {
        let typeSwitcher: object = {
            'string': () => { return 'text' },
            'number': () => { return 'number' }
        };
        value = +value >= 0 ? +value : value;
        return typeSwitcher[typeof value]();
    }
    
    trackByIndex(index: number): number {
        return index;
    }

    save(): void {
        this.courseService.save(this.course).subscribe({
            next: () => {
                this.saveOk = true;
                setTimeout(() => { 
                    this.saveOk = false;
                    this.router.navigate(['/courses']);
                }, 2000 );
            },
            error: e => console.log(e)
        });
    }
}