import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    // Handling salary to be a number
    if (name === "salary") {
      value = value.replace(/[^0-9]/g, "");  // Allow only numeric values
    }

    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {this.state.activeItem.id ? "Edit Employee" : "Add Employee"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="employee-name">Name</Label>
              <Input
                type="text"
                id="employee-name"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Enter employee name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="employee-department">Department</Label>
              <Input
                type="text"
                id="employee-department"
                name="department"
                value={this.state.activeItem.department}
                onChange={this.handleChange}
                placeholder="Enter employee department"
              />
            </FormGroup>
            <FormGroup>
              <Label for="employee-salary">Salary</Label>
              <Input
                type="text"
                id="employee-salary"
                name="salary"
                value={this.state.activeItem.salary}
                onChange={this.handleChange}
                placeholder="Enter employee salary"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
