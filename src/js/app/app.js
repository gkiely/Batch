// -- Libraries
import React    from 'react';
import ReactDOM from 'react-dom';

// -- App
import Batch from './batch';
import ajax from './ajax';
// import "babel-polyfill";
// import Promise from 'es6-promise';


setTimeout(function(){
  // var user = ajax.post('user');
}, 2000);

class App extends React.Component {
    static propTypes = {
    };

    state = {
      items:[]
    };

    componentDidMount(){
      var _this = this;
      ajax.get('logs')
      .then(function(data){
        if(!data.error){

        }
        _this.setState({
          items: data
        })
      });
    }

    sendUserData(e){
      e.preventDefault();
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
            <button id="t1" onClick={this.doThis}>click here</button> to send user data
            <br/><br/>

            <h1>Data print out</h1>
            {listItems}
          </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('App'));