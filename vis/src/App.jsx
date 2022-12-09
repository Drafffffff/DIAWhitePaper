import './App.css';
import CateYear from './charts/CateYear';
import ExpertRect from './charts/ExpertRect';
import ExpertRectGen from './charts/ExpertRectGen';
import ExpertRegoinRect from './charts/ExpertRectRegion';
import RegoinExpert from './charts/RegoinExpert';

function App() {
  return (
    <div class='App'>
      <RegoinExpert />
      <ExpertRect />
      <ExpertRegoinRect />
      <ExpertRectGen />
      <CateYear />
    </div>
  );
}

export default App;
