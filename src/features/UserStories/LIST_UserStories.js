import React, { Component } from "react";
import {
  Card,
  Icon,
  Avatar,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Menu,
  List,
  Spin,
  Dropdown
} from "antd";
import { listProjects } from "../../features/dashboard/actions/dashboardActions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link, Route, withRouter } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { addUserStories, listUserStories } from "./actions/userStoriesActions";
const FormItem = Form.Item;
const { Meta } = Card;
const { TextArea } = Input;

class LIST_Projects extends Component {
  state = {
    addUserStoryPickerVisible: false,
    addSubTasksPickerVisible: false,
    form: {
      title: "",
      description: "",
      points: 0,
      subTasks: []
    },
    currentUserStory: {}
  };

  componentDidMount() {
    const { listUserStories, addUserStories } = this.props;

    listUserStories();
  }

  updateForm = event => {
    const { value, name } = event.target;
    this.setState((state, props) => {
      return {
        form: {
          ...state.form,
          [name]: value
        }
      };
    });
  };

  getCurrentUserStory = currentUserStory => () => {
    this.setState({ currentUserStory: currentUserStory });
  };

  addUserStory = () => {
    const { listUserStories, addUserStories } = this.props;
    const { form: newUserStory } = this.state;

    addUserStories(newUserStory).then(response => {
      this.hideAddUserStoryPicker();
      listUserStories();
    });
  };

  render() {
    const { userStories } = this.props;

    console.log(this.state);
    if (!userStories) return <Spin className="demo-loading" />;

    return (
      <div>
        <PageHeader
          title="User stories"
          actionButton={
            <Button type="primary" ghost onClick={this.showAddUserStoryPicker}>
              + Ajouter une user story
            </Button>
          }
        />
        <div style={{ width: "100%" }}>
          <List
            dataSource={userStories}
            renderItem={userStory => (
              <Link to={`/user-story/${userStory._id}`}>
                <List.Item key={userStory._id}>
                  <List.Item.Meta
                    avatar={<Avatar>{userStory.points}</Avatar>}
                    title={userStory.title}
                    description={userStory.description}
                  />
                  <div>
                    <Dropdown
                      overlay={
                        <Menu onClick={this.getCurrentUserStory(userStory)}>
                          <Menu.Item key="1">Supprimer</Menu.Item>
                          <Menu.Item key="2">Modifier</Menu.Item>
                        </Menu>
                      }
                    >
                      <Button>
                        Actions <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </div>
                </List.Item>
              </Link>
            )}
          >
            {!userStories && <Spin className="demo-loading" />}
          </List>
        </div>
        {this.renderAddUserStoryPicker()}
      </div>
    );
  }

  renderAddUserStoryPicker() {
    const { addUserStoryPickerVisible, form: userStory } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <Modal
        title="Ajouter une user-story"
        visible={addUserStoryPickerVisible}
        onOk={this.addUserStory}
        onCancel={this.hideAddUserStoryPicker}
      >
        <FormItem {...formItemLayout} label="Titre">
          <Input
            value={userStory.title}
            name="title"
            onChange={e => this.updateForm(e)}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Description">
          <TextArea
            autosize
            value={userStory.description}
            name="description"
            onChange={e => this.updateForm(e)}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Points">
          <Input
            type="number"
            value={userStory.points}
            name="points"
            onChange={e => this.updateForm(e)}
          />
        </FormItem>
      </Modal>
    );
  }

  showAddUserStoryPicker = () => {
    this.setState({
      addUserStoryPickerVisible: true
    });
  };

  hideAddUserStoryPicker = () => {
    this.setState({
      addUserStoryPickerVisible: false
    });
  };
}

function mapStateToProps(state) {
  return {
    userStories: state.userStory.userStories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ listUserStories, addUserStories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LIST_Projects);
