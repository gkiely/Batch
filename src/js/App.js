// == Libraries
import Component from './lib/react-autobind-component';
// import store from 'store';
import moment from 'moment';

// == Admin
import Batch from './batch';
import ajax from './lib/ajax';
import toFixed from './lib/toFixed';
// import clog from './lib/clog';


class Admin extends Component {
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

      var startDate = moment().subtract(7, 'days').format();

      ajax.post('logs/date', {startDate})
      .then(data => {
        if(data){
          _this.setState({
            errorsThisWeek: data.length
          });
        }
      })

      ajax.post('logs/perPage', {startDate})
      .then(data => {
        if(data){
          _this.setState({
            errorsPerPage: data.length
          });
        }
      });

      ajax.post('logs/newErrors', {startDate})
      .then(data =>{
        if(data){
          _this.setState({
            newErrors: data.length
          })
        }
      });

      ajax.get('pageviews', {startDate, count: true})
      .then(data => {
        if(data){
          _this.setState({
            pageViews: data
          })
        }
      })
      .catch(function(e){
        console.error('error GET request page views', e);
      })
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

          <h1>Admin section</h1>
          <h3>Card Components</h3>
          <div className="component">
            Total Errors last week: {this.state.errorsThisWeek}
          </div>

          <div className="component">
            Errors per pageview: {toFixed(this.state.errorsThisWeek / this.state.pageViews)}
          </div>

          <div className="component">
            New errors: {this.state.newErrors}
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



ReactDOM.render(<Admin />, document.getElementById('Admin'));