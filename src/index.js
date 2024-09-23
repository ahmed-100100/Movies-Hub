import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MainContextProvider } from './Pages/Store';
let root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MainContextProvider>
     <App />
    </MainContextProvider>
  </BrowserRouter>
);