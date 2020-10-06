import { Application as ExpressFeathers } from '@feathersjs/express';

import { Service } from '@feathersjs/feathers';

import { User } from './models/users.model';
import { Grade } from './models/grades.model';
import { Course } from './models/courses.model';
import { Tracker } from './services/tracker/tracker.class';

// A mapping of service names to types. Will be extended in service files.
export interface ServiceTypes {
  courses: Service<Course>;
  grades: Service<Grade>;
  tracker: Service<Tracker>;
  users: Service<User>;
}
// The application instance type that will be used everywhere else
export type Application = ExpressFeathers<ServiceTypes>;
