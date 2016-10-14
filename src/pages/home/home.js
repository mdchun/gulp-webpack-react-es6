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
        	isshow:false
        }
    }

    handleClick(e) {
    	console.log(e)
    	console.log(this.state)

    	this.setState({
    		isshow: !this.state.isshow
    	})
    }

    render(){
    	var t = this;
        return(
            <div>
                <h1 onClick={t.handleClick.bind(t)}>Hello,boy!</h1>
                {t.state.isshow ? '1111' : '222'}
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