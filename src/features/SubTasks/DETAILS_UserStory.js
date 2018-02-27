import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { listSubTasks, addSubTask } from "../SubTasks/actions/subTasksActions";
import { PageHeader } from "../../components/PageHeader";
import { Icon, Button, Modal, Form, Input, List, Spin } from "antd";
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
    addSubTask(userStoryId, newSubTasks).then(response => {
      listSubTasks(userStoryId);
      this.hideAddSubtasksPicker();
    });
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
  render() {
    const { subTasks } = this.props;
    if (!subTasks) return <Spin className="demo-loading" />;
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
                <div>
                  <Button>
                    <Icon type="edit" style={{ color: "#fba672" }} />
                  </Button>{" "}
                  <Button style={{ color: "red" }}>
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

function mapStateToProps(state, ownProps) {
  const taskId = ownProps.match.params.userStoryId;
  if (state.subTask.subTasks[taskId]) {
    return {
      subTasks: state.subTask.subTasks[taskId].subtasks,
    };
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ listSubTasks, addSubTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DETAILS_UserStory);
