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
        console.error(err)
      });
    }

    /*=================================
    =            Functions            =
    =================================*/
    error(){
      // Generates error in the UI
      Batch.error(this.state.inputVal);
    };
    warn(){
      // Generates warning in the UI
      Batch.warn(this.state.inputVal);
    };

    log(){
      // Genereates log in the UI
      Batch.log(this.state.inputVal);
    };

    error4(){

    };
    error5(){
      
    };

    onChange(e){
      this.setState({inputVal: e.target.value})
    };

    /*==============================
    =            Render            =
    ==============================*/
    render() {
      // console.log(this.state);
      var listItems = this.state.items.map(function(item){
        return (
          <tr key={item.id}>
            <td>{item.msg}</td>
            <td>{item.type}</td>
            <td>{item.url}</td>
            <td>{item.logdate}</td>
          </tr>
        );
      });


      return(
        <div className="">

          <input value={this.state.inputVal} autoFocus ref="testInput" onChange={this.onChange} />
          <button id="btn-1" onClick={this.error}>Error</button>
          <button id="btn-2" onClick={this.warn}>Warn</button>
          <button id="btn-3" onClick={this.log}>Log</button>
          
          <p>&nbsp;</p><br/>
          <h2>Example Admin section</h2>
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
      );
    }
}



ReactDOM.render(<App />, document.getElementById('App'));