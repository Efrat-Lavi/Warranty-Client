import { Provider } from 'react-redux';
import store  from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import LoginPage from './components/login';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
