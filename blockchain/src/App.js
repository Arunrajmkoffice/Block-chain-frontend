import './App.css';
import MainRoute from './routes/MainRoute';
import Test from './pages/Test1';



function App() {
  const token = localStorage.getItem('bcToken');
  return (
    <div className="App">
      
       <MainRoute token={token} />
     
       {/* <Test/> */}
    </div>
  );
}

export default App;
