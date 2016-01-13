// -- Libraries
import React    from 'react';
import ReactDOM from 'react-dom';

// -- App
import BatchJS from './batch.js';


class App extends React.Component {
    render() {
        return(
          <div className="">
            sup homey
          </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('App'));