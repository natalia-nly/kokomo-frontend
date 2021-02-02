import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { themeKokomo } from './components/styled-components/themeKokomo'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './components/styled-components/MainStyles'

//Styles
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

//Google Analytics
import ReactGA from 'react-ga'
ReactGA.initialize('UA-178427902-1')
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(
   <BrowserRouter>
      <AuthContextProvider>
         <ThemeProvider theme={themeKokomo}>
            <GlobalStyle />
            <App />
         </ThemeProvider>
      </AuthContextProvider>
   </BrowserRouter>,
   document.getElementById('root')
)
