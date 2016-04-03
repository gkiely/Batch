// == Libraries
import Component from './react-autobind-component';
import store from 'store';

// == App
import Batch from './batch';
import ajax from './ajax';
import clog from './clog';


class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        items:    [],
        inputVal: ""
      };
    }

    static propTypes = {

    };

    static defaultProps = {
      btns: [1,2,3,4]
    };

    componentDidMount(){
      var _this = this;

      ajax.get('logs')
      .then(data => {
        if(data){
           _this.setState({
            items: data
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
    }

    /*=================================
    =            Functions            =
    =================================*/
    error(){
      // Generates error in the UI
      Batch.error(this.state.inputVal);
    }

    warn(){
      // Generates warning in the UI
      Batch.warn(this.state.inputVal);
    }

    log(){
      // Genereates log in the UI
      Batch.log(this.state.inputVal);
    }

    deleteLog(){
    }

    error4(){

    }

    error5(){
      
    }

    onChange(e){
      this.setState({inputVal: e.target.value});
    }

    /*==============================
    =            Render            =
    ==============================*/
    render() {
      // console.log(this.state);
      let listItems = this.state.items.map(item => {
        return (
          <tr key={item.id}>
            <td>{item.msg}</td>
            <td>{item.type}</td>
            <td>{item.url}</td>
            <td>{item.logdate}</td>
            <td className="hide"><button onClick={this.deleteLog}>X</button></td>
          </tr>
        );
      });


      return(
        <div className="">
          <div>
            <h1>Client Section</h1>
            <input value={this.state.inputVal} autoFocus ref="testInput" onChange={this.onChange} />
            <button id="btn-1" onClick={this.error}>Error</button>
            <button id="btn-2" onClick={this.warn}>Warn</button>
            <button id="btn-3" onClick={this.log}>Log</button>

            <a className="Client__sign-in" href="#">Sign in</a>
          </div>


          <br/>
          <hr style={{opacity: 0.3}} />


          <h1>Admin section</h1>
          

          <h3>Card Components</h3>

          <div className="component">
            Errors this week: 52
          </div>

          <div className="component">
            Errors per page view: 0.79
          </div>

          <div className="component">
            New errors this week: 25
          </div>

          <h3>Graph component</h3>
          <div className="component">
            Errors/Page views
            >> Graph data
          </div>


          <h3>Table Component - top 5 errors</h3>
          <div className="component">
            <table style={{width: '100%'}}>
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Error type</th>
                  <th>URL</th>
                  <th>Log Date</th>
                </tr>
              </thead>
              <tbody>
                  {listItems}
              </tbody>
            </table>
          </div>

        </div>
      );
    }
}



ReactDOM.render(<App />, document.getElementById('App'));