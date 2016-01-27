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
      var _this = this;

      ajax('logs')
      .then(function(data){
        _this.setState({
          items: data
        })
      });
    }

    doThis(e){
      e.preventDefault();
      console.log('hi');
    }

    render() {
      var listItems = this.state.items.map(function(item){
        return (
          <li key={item.id}>
            {item.msg} - {item.logdate}
          </li>
        );
      });

        return(
          <div className="">
            <h3>Testing</h3>
            <a id="t1" href="" onClick={this.doThis}>click here</a> to send an error to the server
            <br/><br/>

            <h1>Data print out</h1>
            {listItems}
          </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('App'));