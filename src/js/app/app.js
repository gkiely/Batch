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

    //== Initial State
    state = {
      items:    [],
      inputTxt: ""
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

    /*=================================
    =            Functions            =
    =================================*/
    error1 = () => {
      Batch.error('asdf');
    };

    error2 = () => {

    };

    error3 = () => {

    };

    error4 = () => {

    };
    error5 = () => {
      
    };

    onChange = (e) => {
      this.setState({inputTxt: e.target.value})
    };






    /*==============================
    =            Render            =
    ==============================*/
    render() {
      // console.log(this.state);
      var listItems = this.state.items.map(function(item){
        return (
          <tr key={item.id}>
            <td>
              {item.msg}
            </td>
            <td>
              {item.logdate}
            </td>
          </tr>
        );
      });


        return(
          <div className="">

            <input value={this.state.inputValue} onChange={this.onChange} />
            <button id="btn-1" onClick={this.error1}>Error</button>
            <button id="btn-2" onClick={this.error2}>Warn</button>
            <button id="btn-3" onClick={this.error3}>Log</button>
            

            <p>&nbsp;</p><br/>
            <h2>Example Admin section</h2>
            <table>
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Log Date</th>
                </tr>
              </thead>
              <tbody>
                  {listItems}
              </tbody>
            </table>
          </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('App'));