// -- Libraries
import React    from 'react';
import ReactDOM from 'react-dom';

// -- App
import BatchJS from './batch.js';

// Ajax call
var logs = [];

class App extends React.Component {
    // state = [msg: "testasdf"]
    constructor(props) {
      super(props);
      this.state = {
        items:[
          {id: 1, msg: 'hi'},
          {id: 2, msg: 'hi2'}
        ]
      };
    }
    render() {

      var listItems = this.state.items.map(function(item){
        return (
          <li key={item.id}>
            {item.msg}
          </li>
        );
      });

        return(
          <div className="">
            <h1>Data print out</h1>
            {listItems}
          </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('App'));