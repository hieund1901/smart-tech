import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/App/App';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();
ReactDOM.render(
  <Provider store={store}>
    <App />
    {/* <QueryClientProvider client={client}>
      <ShoppingCart />
    </QueryClientProvider>
    , */}
  </Provider>,

  document.getElementById('root')
);
