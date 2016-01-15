// -- Libraries
import React    from 'react';
import ReactDOM from 'react-dom';

// -- App
import BatchJS from './batch.js';
import ajax from './ajax.js';

// Ajax call
var logs = [];




class App extends React.Component {
    // state = [msg: "testasdf"]
    constructor(props) {
      super(props);
      this.state = {
        items:[]
      };
    }

    componentDidMount(){
      var that = this;

      ajax('read')
      .then(function(data){
        that.setState({
          items: data
        })
      });
    }

    render() {

      var listItems = this.state.items.map(function(item){
        return (
          <li key={item._id}>
            {item.name} - {item.msg}
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