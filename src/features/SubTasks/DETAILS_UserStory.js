import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { listSubTasks, addSubTask } from "../SubTasks/actions/subTasksActions";
import { PageHeader } from "../../components/PageHeader";
import { Icon, Button, Modal, Form, Input, List } from "antd";
const FormItem = Form.Item;
const { TextArea } = Input;

class DETAILS_UserStory extends Component {
  state = {
    addSubtasksPickerVisible: false,
    form: {
      title: "",
      description: ""
    }
  };

  componentDidMount() {
    const { listSubTasks, match } = this.props;
    const { userStoryId } = match.params;
    listSubTasks(userStoryId);
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

  showAddSubtasksPicker = () => {
    this.setState({
      addSubtasksPickerVisible: true
    });
  };

  hideAddSubtasksPicker = () => {
    this.setState({
      addSubtasksPickerVisible: false
    });
  };

  addSubTasks = () => {
    const { addSubTask, listSubTasks, match } = this.props;
    const { userStoryId } = match.params;
    const { form: newSubTasks } = this.state;
    const { status } = addSubTask(userStoryId, newSubTasks);

    if (status === 200) {
      listSubTasks(userStoryId);
      this.hideAddSubtasksPicker();
    }
  };

  renderAddSubtasksPicker() {
    const { addSubtasksPickerVisible, form: subTask } = this.state;
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
        title="Ajouter une sous-tâche"
        visible={addSubtasksPickerVisible}
        onOk={this.addSubTasks}
        onCancel={this.hideAddSubtasksPicker}
      >
        <FormItem {...formItemLayout} label="Titre">
          <Input
            value={subTask.title}
            name="title"
            onChange={e => this.updateForm(e)}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Description">
          <TextArea
            autosize
            value={subTask.description}
            name="description"
            onChange={e => this.updateForm(e)}
          />
        </FormItem>
      </Modal>
    );
  }
  renderDeleteUserStoryPicker() {
    const {
      deleteUserStoryPickerVisible,
      currentUserStory: userStory
    } = this.state;
    return (
      <Modal
        title="Supprimer une sous-tâche"
        visible={deleteUserStoryPickerVisible}
        onOk={this.deleteUserStory}
        onCancel={this.hideDeleteUserStoryPicker}
      >
        <p>
          Êtes-vous sûr de vouloir supprimer la sous-tâche{" "}
          <span style={{ fontWeight: 800 }}>{userStory.title}</span> ?{" "}
        </p>
      </Modal>
    );
  }
  render() {
    const { subTasks } = this.props;
    return (
      <div>
        <PageHeader
          title={subTasks.title}
          actionButton={
            <div>
              <Button
                type="primary"
                ghost
                onClick={this.showAddUserStoryPicker}
              >
                <Icon type="edit" />
                Modifier
              </Button>
            </div>
          }
        />
        <List
          size="large"
          header={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button type="primary" ghost onClick={this.showAddSubtasksPicker}>
                <Icon type="file-add" />
                Ajouter une sous-tâche
              </Button>
            </div>
          }
          bordered
          dataSource={subTasks}
          renderItem={subTask => (
            <List.Item
              key={subTask._id}
              style={{ borderBottom: "1px solid lightgray" }}
            >
              <List.Item.Meta
                title={subTask.title}
                description={subTask.description}
              />
              <div>
                <div >
                  <Button>
                    <Icon type="eye" style={{color: '#5726FB'}}/>
                  </Button>{' '}
                  <Button >
                    <Icon type="edit" style={{color: '#fba672'}}/>
                  </Button>{' '}
                  <Button style={{color: 'red'}}>
                    <Icon type="delete" />
                  </Button>
                </div>
              </div>
            </List.Item>
          )}
        />
        {this.renderAddSubtasksPicker()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    subTasks: state.subTask.subTasks
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ listSubTasks, addSubTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DETAILS_UserStory);
