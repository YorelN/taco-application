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
  Dropdown,
  Divider
} from "antd";
import { listProjects } from "../../features/dashboard/actions/dashboardActions";
const { confirm } = Modal;
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link, Route, withRouter } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import {
  addUserStory,
  deleteUserStory,
  listUserStories
} from "./actions/userStoriesActions";
const FormItem = Form.Item;
const { Meta } = Card;
const { TextArea } = Input;

class LIST_Projects extends Component {
  state = {
    addUserStoryPickerVisible: false,
    deleteUserStoryPickerVisible: false,
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
    const { listUserStories,  addUserStory } = this.props;
    const { form: newUserStory } = this.state;

     addUserStory(newUserStory).then(response => {
      this.hideAddUserStoryPicker();
      listUserStories();
    });
  };
  deleteUserStory = () => {
    const { listUserStories, deleteUserStory } = this.props;
    const { currentUserStory } = this.state;

    deleteUserStory(currentUserStory._id).then(response => {
      this.hideDeleteUserStoryPicker();
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
              <div>
                <List.Item key={userStory._id}>
                  <List.Item.Meta
                    avatar={<Avatar>{userStory.points}</Avatar>}
                    title={userStory.title}
                    description={userStory.description}
                  />
                  <Button onClick={this.showDeleteUserStoryPicker(userStory)}>
                    <Icon type="delete" /> Supprimer
                  </Button>
                  <Button >
                    <Icon type="eye" /> Details
                  </Button>
                </List.Item>
                <Divider />
              </div>
            )}
          >
            {!userStories && <Spin className="demo-loading" />}
          </List>
          {this.renderDeleteUserStoryPicker()}
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

  renderDeleteUserStoryPicker() {
    const { deleteUserStoryPickerVisible } = this.state;
    return (
      <Modal
        title="Supprimer une user-story"
        visible={deleteUserStoryPickerVisible}
        onOk={this.deleteUserStory}
        onCancel={this.hideDeleteUserStoryPicker}
      >
        <p>Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
      </Modal>
    );
  }

  showDeleteUserStoryPicker = currentUserstory => () => {
    this.setState({
      deleteUserStoryPickerVisible: true,
      currentUserStory: currentUserstory
    });
  };

  hideDeleteUserStoryPicker = () => {
    this.setState({
      deleteUserStoryPickerVisible: false
    });
  };
}

function mapStateToProps(state) {
  return {
    userStories: state.userStory.userStories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ listUserStories, deleteUserStory, addUserStory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LIST_Projects);
