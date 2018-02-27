import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {List} from "antd";
import {detailsUserStory} from "../UserStories/actions/userStoriesActions";

class DETAILS_UserStory extends Component {
  componentDidMount() {
      const { detailsUserStory, match } = this.props;
      const { userStoryId } = match.params;
      console.log(match, userStoryId);
      detailsUserStory(userStoryId)
  }

  renderAddSubTasksPicker() {
    const { addSubTasksPickerVisible } = this.state;
    return (
      <Modal
        title="Basic Modal"
        visible={addSubTasksPickerVisible}
        onOk={this.addUserStory}
        onCancel={this.hideAddUserStoryPicker}
      />
    );
  }
  showAddSubTasksPicker = () => {
    this.setState({
      addSubTasksPickerVisible: true
    });
  };

  hideAddSubTasksPicker = () => {
    this.setState({
      addSubTasksPickerVisible: false
    });
  };

  render() {
      const { userStory } = this.props;
    return (
      <List
        size="large"
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={userStory}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    userStory: state.userStory.userStory
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ detailsUserStory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DETAILS_UserStory);
