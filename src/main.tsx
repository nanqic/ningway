import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import DisableDevtool from 'disable-devtool';

DisableDevtool({
  url: 'about:blank',
  disableMenu: true, 
  md5: '202cb962ac59075b964b07152d234b70',
  tkName: 'tk',
  ignore: () => {
    return /(localhost|192.168.\d+.\d+)/.test(location.hostname);
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
