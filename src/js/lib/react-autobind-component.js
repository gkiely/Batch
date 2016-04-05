import _ from 'lodash';
import React from 'react';

class Component extends React.Component {

  constructor(props, autobind){
    super(props);
    if(autobind !== false){
      this.autoBind();
    }
  }

  autoBind() {
    let blacklist = ['constructor', 'render', 'componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount'];

    let methods = Object.getOwnPropertyNames(this.constructor.prototype)
    .filter(prop => typeof this[prop] === 'function')
    .filter(prop => !_.includes(blacklist, prop));

    if(methods.length > 0){
      _.bindAll(this, ...methods);
    }
  }
}

export default Component;