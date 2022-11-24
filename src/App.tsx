import React from 'react';
import './App.css';
import Layout from 'components/Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import StartScreen from 'components/StartScreen/StartScreen';
import NotFound from 'components/NotFound/NotFound';
import Main from 'components/Main/Main';
import Board from 'components/Board/Board';
import Auth from 'components/Auth/Auth';
import RequireAuth from 'components/RequireAuth/RequireAuth';

function App() {
  return (
    <div className="App">
      <Routes>
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
      </Routes>
    </div>
  );
}

export default App;
