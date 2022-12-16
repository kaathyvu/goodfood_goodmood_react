import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Home, About, Browse, SignIn, SignUp, Dashboard, Recipe, SavedRecipe } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css'
import { theme } from './Theme/themes';
import { ThemeProvider } from '@mui/material/styles';
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store = {store}>
        <ThemeProvider theme = {theme}>
          <Router>
            <Routes>
              <Route path='/' element={<Home title={'Good Food Good Mood'}/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/browse' element={<Browse/>}/>
              <Route path='/signin' element={<SignIn/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/recipe' element={<Recipe/>}/>
              <Route path='/savedrecipe' element={<SavedRecipe/>}/>
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
