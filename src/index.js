import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import App from "./components/app";
import ErrorBoundry from "./components/error-boundry"; //ловит ошибки при помощи ComponentDidCatch
import BookstoreService from "./services/bookstore-services";
import {BookstoreServiceProvider} from "./components/bookstore-service-context"; // HOC с контекстом, передаёт методы работы с "сервером"
import store from "./store";

const booksStoreService = new BookstoreService();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ErrorBoundry>
              <BookstoreServiceProvider value={booksStoreService}>
                  <BrowserRouter>
                      <App/>
                  </BrowserRouter>
              </BookstoreServiceProvider>
          </ErrorBoundry>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
