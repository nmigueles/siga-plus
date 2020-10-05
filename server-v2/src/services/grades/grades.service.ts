// Initializes the `grades` service on path `/grades`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Grades } from './grades.class';
import createModel from '../../models/grades.model';
import hooks from './grades.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'grades': Grades & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/grades', new Grades(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('grades');

  service.hooks(hooks);
}
