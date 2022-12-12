import './App.css';
import CateYear from './charts/CateYear';
import CateYearBar from './charts/CateYearBar';
import ExpertMap from './charts/ExperMap';
import ExpertRect from './charts/ExpertRect';
import ExpertRectGen from './charts/ExpertRectGen';
import ExpertRegoinRect from './charts/ExpertRectRegion';
import RegoinExpert from './charts/RegoinExpert';
import StreamGraphCate from './charts/StreamGraphCate';
import StreamGraphCountry from './charts/StreamGraphCountry';
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
      <StreamGraphCountry />
      <WorksRegoinBar />
      <WorksRegionMap />
      <StreamGraphCate />
    </div>
  );
}

export default App;
