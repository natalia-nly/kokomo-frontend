import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { themeKokomo } from './styles/themeKokomo'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/MainStyles'

//Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'
import './styles/App.css'

//Google Analytics
import ReactGA from 'react-ga'
ReactGA.initialize('UA-178427902-1')
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(
   <BrowserRouter>
      <ThemeProvider theme={themeKokomo}>
         <AuthContextProvider>
            <GlobalStyle />
            <App />
         </AuthContextProvider>
      </ThemeProvider>
   </BrowserRouter>,
   document.getElementById('root')
)
