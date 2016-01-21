// -- Libraries
import React    from 'react';
import ReactDOM from 'react-dom';

// -- App
import BatchJS from './batch.js';
import ajax from './ajax.js';

// Ajax call
var logs = [];




class App extends React.Component {
    static propTypes = {
    };
    state = {
      items:[]
    };

    componentDidMount(){
      var that = this;

      ajax('logs')
      .then(function(data){
        that.setState({
          items: data
        })
      });
    }

    render() {
      var listItems = this.state.items.map(function(item){
        return (
          <li key={item.id}>
            {item.fname} - {item.company}
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