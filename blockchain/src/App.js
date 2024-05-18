import { Box, CircularProgress } from '@mui/material';
import './App.css';
import MainRoute from './routes/MainRoute';
import Test from './pages/Test1';

function App() {
  return (
    <div className="App">
       <MainRoute />
       {/* <Test/> */}
    </div>
  );
}

export default App;
