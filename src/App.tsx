import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Login} from "./components/layout/Login/Login";
import {AuthContext} from "./context/AuthContext";

export const App = () => {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState('');

  return (
      <AuthContext.Provider
          value={{
              accessToken,
              setAccessToken,
              refreshToken,
              setRefreshToken,
              userEmail,
              setUserEmail,
              userType,
              setUserType}}
      >
        <Login/>
      </AuthContext.Provider>
  )
};

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
