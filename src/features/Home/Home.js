import React, { Component } from 'react'
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {welcomeMessage} from "./homeActions";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message : null
        }
    }

    componentDidMount() {
        const { welcomeMessage } = this.props;
        welcomeMessage('test');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ message: nextProps });
    }

    render() {
        const { message } = this.props;
        return (
            <div>{ message || this.state.message }</div>
        )
    }
}
function mapStateToProps(state) {
    return { message : state.home.welcomeMessage }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({welcomeMessage}, dispatch)
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Home)

