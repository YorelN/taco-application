import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {listProjects} from "../features/dashboard/actions/dashboardActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Route, withRouter} from "react-router-dom";
import LIST_Projects from "../features/dashboard/LIST_Projects";
import LIST_UserStories from "../features/UserStories/LIST_UserStories";
const { Header, Content, Sider } = Layout;

const style = {
    topBar: {
        height: 64,
    },
    sideBar: {
        height: `calc(100vh - 64px)`
    }
};

class DashboardLayout extends Component {



    render() {
        const { match } = this.props;
        return (
            <Layout>
                <Header className="header" style={style.topBar}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px', display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            style={style.sideBar}
                        >
                            <Menu.Item key="1">
                                <Link to={`/projects`}>
                                    <Icon type="appstore" />
                                    <span>Projets</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to={`/user-stories`}>
                                    <Icon type="folder" />
                                    <span>User stories</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '24px 24px' }}>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            <Route path="/projects" component={LIST_Projects}/>
                            <Route path="/user-stories" component={LIST_UserStories}/>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardLayout))