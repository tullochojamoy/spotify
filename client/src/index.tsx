import React from 'react';
import ReactDOM from 'react-dom/client';

//Page Imports
import MainApp from './MainApp';

//Redux Imports
import store from './redux/store'
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<MainApp />
    </Provider>
);