// Import the Component
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BusBookComponent } from './popup/bus-book/bus-book.component';

// Add it to a named exported object components
export const components: any[] = [FooterComponent, HeaderComponent, BusBookComponent];

// Export the Component

export * from './header/header.component';
export * from './footer/footer.component';
export * from './popup/bus-book/bus-book.component';