import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import UserGrid from './UserGrid.jsx';
// import App from './App.jsx';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

import { AllEnterpriseModule } from 'ag-grid-enterprise';
// Register all Community and Enterprise features
ModuleRegistry.registerModules([AllEnterpriseModule]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <UserGrid />
  </StrictMode>,
);
