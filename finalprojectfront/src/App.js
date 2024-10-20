// import React, { Component } from "react";
// import Modal from "./FinalAssign/Modal";
// import axios from "axios";


// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       employeeList: [],
//       modal: false,
//       activeItem: {
//         name: "",
//         department: "",
//         salary: 0,
//       },
//     };
//   }

//   refreshList = () => {
//     fetch('http://127.0.0.1:8000/api/employees/')
//         .then(response => response.json())
//         .then(data => this.setState({ employeeList: data}))
//   };
  
//   componentDidMount() {
//     this.refreshList();
//   }

//   handleSubmit = (item) => {
//     if (item.id) {
//       fetch(`http://localhost:8000/api/employees/${item.id}/`, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(item)
//       })
//       // .then(response => response.json())
//       .then(data => {
//           this.refreshList();
//       })
//       .catch(error => console.error('Error:', error));
//     }else{
//       axios
//         .post("http://127.0.0.1:8000/api/employees/", item)
//         .then((res) => this.refreshList());
//     }
//   };

//   handleDelete = (item) => {
//     axios
//       .delete(`http://127.0.0.1:8000/api/employees/${item.id}/`)
//       .then((res) => this.refreshList());
//   };

//   createEmployee = () => {  
//     const item = { name: "", department: "", salary: 0 }; 
//     this.setState({ activeItem: item, modal: !this.state.modal });
//   };

//   editEmployee = (item) => {
//     this.setState({ activeItem: item, modal: !this.state.modal });
//   };


//   renderEmployee = () => {
//     const EMPLOYEES = this.state.employeeList;
//     console.log(EMPLOYEES)
//     return EMPLOYEES.map((employee) => (
//       <li
//         key={employee.id}
//         className="list-group-item d-flex justify-content-between align-items-center">
//         <span className={`todo-title mr-2 "completed-todo" : ""`}>
//           {employee.name} {employee.department} {employee.salary}
//         </span>
//         <span>
//           <button
//             className="btn btn-secondary mr-2"
//             onClick={() => this.editEmployee(employee)}
//           >
//             Edit
//           </button>
//           <button
//             className="btn btn-danger"
//             onClick={() => this.handleDelete(employee)}
//           >
//             Delete
//           </button>
//         </span>
//       </li>
//     ));
//   };

//   render() {
//     return (
//       <main className="container">
//         <h1 className="text-black text-uppercase text-center my-4">Employee Management</h1>
//         <div className="row">
//           <div className="col-md-6 col-sm-10 mx-auto p-0">
//             <div className="card p-3">
//               <div className="mb-4">
//                 <ul className="list-group list-group-flush border-top-0">
//                   {this.renderEmployee()}
//                 </ul>
//                 <button
//                   className="btn btn-primary"
//                   onClick={this.createEmployee}
//                 >
//                   Add Employee
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         {this.state.modal ? (
//           <Modal
//             activeItem={this.state.activeItem}
//             toggle={this.toggle}
//             onSave={this.handleSubmit}
//           />
//         ) : null}
//       </main>
//     );
//   }
// }

// export default App;

import React, { Component } from "react";
import Modal from "./FinalAssign/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeList: [],
      modal: false,
      activeItem: {
        name: "",
        department: "",
        salary: 0,
      },
    };
  }

  refreshList = () => {
    fetch('http://127.0.0.1:8000/api/employees/')
      .then(response => response.json())
      .then(data => this.setState({ employeeList: data }));
  };

  componentDidMount() {
    this.refreshList();
  }

  handleSubmit = (item) => {
    if (item.id) {
      // PUT request to update an existing employee
      fetch(`http://localhost:8000/api/employees/${item.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update employee');
          }
          return response.json();
        })
        .then((data) => {
          this.refreshList(); // Call your refresh function
        })
        .catch((error) => console.error('Error:', error)); // Handle errors
    } else {
      // POST request to create a new employee
      axios
        .post('http://127.0.0.1:8000/api/employees/', item)
        .then((res) => {
          this.refreshList(); // Call your refresh function
        })
        .catch((error) => {
          console.error('Error creating employee:', error); // Handle errors
        });
    }
  };
  

  handleDelete = (item) => {
    axios
      .delete(`http://127.0.0.1:8000/api/employees/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createEmployee = () => {
    const item = { name: "", department: "", salary: 0 };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editEmployee = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderEmployee = () => {
    const EMPLOYEES = this.state.employeeList;
    return EMPLOYEES.map((employee) => (
      <li
        key={employee.id}
        className="list-group-item d-flex justify-content-between align-items-center border-bottom py-3">
        <div>
          <h5 className="mb-1">{employee.name}</h5>
          <p className="mb-0 text-muted">{employee.department}</p>
        </div>
        <div>
          <span className="badge bg-success mx-3">Salary: ${employee.salary}</span>
          <button
            className="btn btn-outline-secondary btn-sm mx-1"
            onClick={() => this.editEmployee(employee)}
          >
            <i className="bi bi-pencil-fill"></i> Edit
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => this.handleDelete(employee)}
          >
            <i className="bi bi-trash-fill"></i> Delete
          </button>
        </div>
      </li>
    ));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-black text-uppercase text-center my-4">Employee Management</h1>
        <div className="row">
          <div className="col-md-8 col-sm-12 mx-auto">
            <div className="card shadow-lg p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="card-title">Employees</h4>
                <button
                  className="btn btn-primary"
                  onClick={this.createEmployee}
                >
                  <i className="bi bi-person-plus-fill"></i> Add Employee
                </button>
              </div>
              <ul className="list-group list-group-flush border-top-0">
                {this.renderEmployee()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;

