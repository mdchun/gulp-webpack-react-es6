require('./error.less');

let a = '111'

class Error extends React.Component {

    constructor(props) {
        super(props);
    }
    
    handleGoBack() {
        if (this.props.handleGoBack) {
            this.props.handleGoBack();
        } else {
            history.go(-1);
        }
    }

    render() {
        var t = this;
        let text = t.props.reminderText || '对不起，该访问的页面不存在';
        return (
            <div className="error-page">
                <div className="error-info">
                    <p>(●-●)</p>
                    <p>{text}</p>
                    <button type="button" className="borderButton go-back-btn" size="m" onClick={t.handleGoBack.bind(t)}>返回</button>
                </div>
            </div>
        );
    }
}

module.exports = Error;
