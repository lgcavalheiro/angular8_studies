import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CourseListComponent } from './course-list.component';
import { CourseInfoComponent } from './course-info.component';
import { AppPipeModule } from '../shared/pipe/app-pipe.module';
import { StarModule } from '../shared/component/star/star.module';


@NgModule({
    declarations: [
        CourseListComponent,
        CourseInfoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        StarModule,
        AppPipeModule,
        RouterModule.forChild([
            {
                path: 'courses', component: CourseListComponent
            },
            {
                path: 'courses/info/:id', component: CourseInfoComponent
            },
        ])
    ]
})
export class CourseModule {

}