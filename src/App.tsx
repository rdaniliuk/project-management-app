import React from 'react';
import './App.css';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Screen from 'components/Screen/Screen';

function App() {
  return (
    <div className="App">
      <Header />
      <Screen />
      <Footer />
    </div>
  );
}

export default App;
