import React from 'react';
import './App.css';
import Layout from 'components/Layout/Layout';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import StartScreen from 'components/StartScreen/StartScreen';
import NotFound from 'components/NotFound/NotFound';
import Main from 'components/Main/Main';
import Board from 'components/Board/Board';
import Auth from 'components/Auth/Auth';
import RequireAuth from 'components/RequireAuth/RequireAuth';
import { Provider } from 'react-redux';
import store from 'store/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={
          <RequireAuth>
            <Main />
          </RequireAuth>
        }
      />
      <Route path="welcome" element={<StartScreen />} />
      <Route
        path="board"
        element={
          <RequireAuth>
            <Board />
          </RequireAuth>
        }
      />
      <Route path="auth" element={<Auth />} />
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
