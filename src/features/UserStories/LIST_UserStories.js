import React, { Component } from "react";
import axios from "axios";
import {
  Card,
  Icon,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  List,
  Spin
} from "antd";
import { listProjects } from "../../features/dashboard/actions/dashboardActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { PageHeader } from "../../components/PageHeader";
import {
    addUserStory,
    deleteUserStory,
    listUserStories, updateUserStory
} from "./actions/userStoriesActions";
const FormItem = Form.Item;
const { TextArea } = Input;

class LIST_Projects extends Component {
  state = {
    addUserStoryPickerVisible: false,
    deleteUserStoryPickerVisible: false,
    updateUserStoryPickerVisible: false,
    editMode: false,
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

  redirectToDetailedUserStory = userStoryId => () => {
    const { history } = this.props;

    history.push(`/user-story/${userStoryId}`);
  };

  addUserStory = () => {
    const { listUserStories, addUserStory } = this.props;
    const { form: newUserStory } = this.state;

    addUserStory(newUserStory).then(response => {
      this.hideAddUserStoryPicker();
      listUserStories();
    });
  };

  updateUserStory = () => {
    const { listUserStories, updateUserStory } = this.props;
    const { form: updatedUserStory } = this.state;

    updateUserStory(updatedUserStory._id, updatedUserStory).then(response => {
      this.hideUpdateUserStoryPicker();
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

  setEditMode = userStoryId => () => {
    axios.get(`/api/boards/1/tasks/${userStoryId}`).then(({ data }) => {
      this.setState({
        form: data,
        updateUserStoryPickerVisible: true
      });
    });
  };

  render() {
    const { userStories } = this.props;

    console.log(this.state.form._id);
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
        <div style={{ width: "100%", padding: 5, margin: 5 }}>
          <List
            dataSource={userStories}
            renderItem={userStory => (
              <div>
                <List.Item
                  key={userStory._id}
                  style={{ borderBottom: "1px solid lightgray" }}
                >
                  <List.Item.Meta
                    avatar={<Avatar>{userStory.points}</Avatar>}
                    title={userStory.title}
                    description={userStory.description}
                  />
                  <div>
                    <Button
                      onClick={this.redirectToDetailedUserStory(userStory._id)}
                    >
                      <Icon type="eye" style={{ color: "#5726FB" }} />
                    </Button>{" "}
                    <Button onClick={this.setEditMode(userStory._id)}>
                      <Icon type="edit" style={{ color: "#fba672" }} />
                    </Button>{" "}
                    <Button
                      onClick={this.showDeleteUserStoryPicker(userStory)}
                      style={{ color: "red" }}
                    >
                      <Icon type="delete" />
                    </Button>
                  </div>
                </List.Item>
              </div>
            )}
          >
            {!userStories && <Spin className="demo-loading" />}
          </List>
          {this.renderDeleteUserStoryPicker()}
        </div>
        {this.renderAddUserStoryPicker()}
        {this.renderUpdateUserStoryPicker()}
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
  renderUpdateUserStoryPicker() {
    const { updateUserStoryPickerVisible, form: userStory } = this.state;
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
        title="Modifer une user-story"
        visible={updateUserStoryPickerVisible}
        onOk={this.updateUserStory}
        onCancel={this.hideUpdateUserStoryPicker}
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
  hideUpdateUserStoryPicker = () => {
    this.setState({
      updateUserStoryPickerVisible: false
    });
  };

  renderDeleteUserStoryPicker() {
    const {
      deleteUserStoryPickerVisible,
      currentUserStory: userStory
    } = this.state;
    return (
      <Modal
        title="Supprimer une user-story"
        visible={deleteUserStoryPickerVisible}
        onOk={this.deleteUserStory}
        onCancel={this.hideDeleteUserStoryPicker}
      >
        <p>
          Êtes-vous sûr de vouloir supprimer la tâche{" "}
          <span style={{ fontWeight: 800 }}>{userStory.title}</span> ?{" "}
        </p>
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
  return bindActionCreators(
    { listUserStories, deleteUserStory, addUserStory, updateUserStory },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LIST_Projects);
