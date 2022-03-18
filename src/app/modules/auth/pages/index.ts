// Import the Component
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

// Add it to a named exported object components
export const components: any[] = [AuthComponent, LoginComponent];

// Export the Component
export * from './auth.component';
export * from './login/login.component';
