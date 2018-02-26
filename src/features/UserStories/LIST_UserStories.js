import React, { Component } from 'react';
import {Card, Icon, Avatar, Button, Row, Col} from 'antd'
import {listProjects} from "../../features/dashboard/actions/dashboardActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Route, withRouter} from "react-router-dom";
import {PageHeader} from "../../components/PageHeader";


const { Meta } = Card;

class LIST_Projects extends Component {


    componentDidMount() {
        const { listProjects } = this.props;

        listProjects()
    }

    render() {
        const { projects } = this.props;
        console.log(projects);
        return (

            <div>
                        <PageHeader title="User stories" actionButton={<Button type="primary" ghost>+ Ajouter une user story</Button>}/>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            {projects.map(project => (
                                <Card
                                    key={project.id}
                                    style={{ width: 300 }}
                                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title={project.name}
                                        description={project.id}
                                    />
                                </Card>
                            ))}
                        </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        projects: state.dashboard.projects
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({listProjects}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(LIST_Projects)