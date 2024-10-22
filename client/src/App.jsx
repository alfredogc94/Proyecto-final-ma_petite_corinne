import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import './App.css'
import { AppRoutes } from './Routes/AppRoutes'
import { ContextProvider } from './Context/ContextProvider'


function App() {
  
 
  return (
    <Container-xxl>
      <ContextProvider>
        <AppRoutes/>
      </ContextProvider>
    </Container-xxl>
  )
}
 
export default App
