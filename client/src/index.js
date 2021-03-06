import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './store/reducers';

import App from './App.jsx';
import './index.css';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>

    <App />
  </Provider>,

  document.getElementById('root'),
);
