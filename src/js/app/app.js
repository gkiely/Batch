// -- Libraries
import React    from 'react';
import ReactDOM from 'react-dom';

// -- App
import Batch from './batch';
import ajax from './ajax';
// import Promise from 'es6-promise';


class App extends React.Component {

    static propTypes = {
    };

    static defaultProps = {
      btns: [1,2,3,4]
    };

    state = {
      items:[]
    };

    componentDidMount(){
      var _this = this;
      ajax.get('logs')
      .then(function(data){
        if(data.errno){

        }
        else if(!data.error && Array.isArray(data)){
           _this.setState({
            items: data
          });
        }
      });
    }

    sendUserData(e){
      e.preventDefault();
    }

    render() {
      // console.log(this.state);
      var listItems = this.state.items.map(function(item){
        return (
          <li key={item.id}>
            {item.msg} - {item.logdate}
          </li>
        );
      });

      // var btns = this.props.btns.map(item =>{
      //   return (
      //     <button key={item}>Error {item}</button>
      //   );
      // });


        return(
          <div className="">
            <button id="btn-1" onClick={this.doThis}>Error 1</button>
            <button id="btn-2" onClick={this.doThis}>Error 2</button>
            <button id="btn-3" onClick={this.doThis}>Error 3</button>
            <button id="btn-4" onClick={this.doThis}>Error 4</button>

            <h1>Data print out</h1>
            {listItems}
          </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('App'));