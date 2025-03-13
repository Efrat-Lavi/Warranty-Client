import { Provider } from 'react-redux';
import store  from './redux/store';
import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom';
import { router } from './Router';


function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <Router>
        <Routes>
         
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
