import logo from './logo.svg';
import './App.css';
import Scheduler from './components/Schdeduler';
import moment from 'moment';

function App() {

  moment.updateLocale('en', {
    calendar : {
        lastDay : '[Yesterday]',
        sameDay : '[Today]',
        nextDay : '[Tomorrow]',
        lastWeek : 'dddd D',
        nextWeek : 'dddd D',
        sameElse : 'dddd D'
    }
});

  return (
    <div className="flex flex-1 flex-row justify-center bg-bgGray">
      <Scheduler/>
    </div>
  );
}

export default App;
