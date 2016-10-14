// var React = require('react');
// var ReactDOM = require('react-dom');

// module.exports = function(){

// 	console.log('this is detail1111')

// }
var reactMixin = require('react-mixin');

class Hello extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
    	var t = this;
        return(
            <div>
                this is detail~~
            </div>
        )
    }
}

// ReactDOM.render(
//   <Hello />, 
//   document.getElementById("app")
// );

module.exports = Hello;

reactMixin.onClass(Hello, ReactRouter.Navigation);
// reactMixin.onClass(Page, Reflux.connect(Store));