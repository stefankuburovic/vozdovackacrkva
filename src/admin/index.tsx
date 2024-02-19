import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from './App';
import { SidebarProvider } from './contexts/SidebarContext';

ReactDOM.render(
    <SidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SidebarProvider>,
  document.getElementById('root')
);

