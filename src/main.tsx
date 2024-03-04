import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import DisableDevtool from 'disable-devtool';
import { getCachedSearch } from './utils/dbUtil';

DisableDevtool({
  url: 'about:blank',
  disableMenu: false, md5: '202cb962ac59075b964b07152d234b70',
  tkName: 'tk',
  ignore: () => {
    return location.port === '5173'; // Disable is ignored when port 5173
  }
});

if (!sessionStorage.getItem("isReload")) {
  sessionStorage.setItem("isReload", "true")
  getCachedSearch(true)
  console.info("页面首次加载，同步缓存数据");
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
