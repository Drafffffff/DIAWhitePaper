import './App.css';
import CateYear from './charts/CateYear';
import CateYearBar from './charts/CateYearBar';
import ExpertMap from './charts/ExperMap';
import ExpertRect from './charts/ExpertRect';
import ExpertRectGen from './charts/ExpertRectGen';
import ExpertRegoinRect from './charts/ExpertRectRegion';
import RegoinExpert from './charts/RegoinExpert';
import WorksRegoinBar from './charts/WorksRegionBar';
import WorksRegionMap from './charts/WorksRegionMap';

function App() {
  return (
    <div class='App'>
      <RegoinExpert />
      <ExpertMap />
      <ExpertRegoinRect />
      <ExpertRectGen />
      <ExpertRect />
      <CateYear />
      <CateYearBar />
      <WorksRegoinBar />
      <WorksRegionMap />
    </div>
  );
}

export default App;
