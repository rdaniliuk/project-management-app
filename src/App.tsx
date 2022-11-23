import React from 'react';
import './App.css';
import Layout from 'components/Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import StartScreen from 'components/StartScreen/StartScreen';
import NotFound from 'components/NotFound/NotFound';
import Main from 'components/Main/Main';
import Board from 'components/Board/Board';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="welcome" element={<StartScreen />} />
          <Route path="board" element={<Board />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
