import {createRoot} from 'react-dom/client'
import App from './App'
import 'react-loading-skeleton/dist/skeleton.css'
import './styles/rootStyles.css';

createRoot(document.getElementById('root')!).render(
  <App/>
)
