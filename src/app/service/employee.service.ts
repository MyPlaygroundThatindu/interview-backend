import { Injectable } from '@angular/core';
import {EmployeeDto} from '../dto/employee-dto'
import {EmployeeResDto} from '../dto/employeeRes-dto'
import {SalaryDto} from "../dto/salary-dto";
import {LoginDto} from "../dto/login-dto";

@Injectable()
export class EmployeeService {

  readonly API_BASE_URL=`http://localhost:8080/api/v1/employees`;

  private employeeList: Array<EmployeeResDto> = [];

  private salaryList: Array<SalaryDto> = [];

  addNewEmployee(employee: EmployeeDto) {
    fetch(`${this.API_BASE_URL}`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(employee)
    }).then(res => {
      if(res.ok){
        res.json().then(employee => {
          if(employee.activeStatus) this.employeeList.push(employee)
          alert("Employee added successfully")
        })
      } else {
        alert("Failed to add the employee");
      }

    }).catch(err => {
      alert("Something went wrong. Try again later");
    })
  }

  deleteEmployee(employee:EmployeeResDto){
    fetch(`${(this.API_BASE_URL)}/${employee.id}`, {method: "DELETE"})
      .then(res => {
        if(res.status === 204) {
          const index = this.employeeList.indexOf(employee);
          this.employeeList.splice(index, 1);
          this.getAllEmployees();
          alert("Employee deleted successfully")
        } else {
          alert("Failed to delete employee")
        }
      }).catch(err => {
      alert("Something went wrong please try again");
    });
  }

  getAllEmployees(){
    this.employeeList = [];
    fetch(`${(this.API_BASE_URL)}`)
      .then(res => {
        if(res.ok){
          res.json().then(data => data.forEach((employee:EmployeeResDto) => this.employeeList.push(employee)));

        }else{
          alert("Failed to load employee")
        }
      }).catch(err => {
      alert("Something went wrong please try again");
    });
    console.log(this.employeeList)
    return this.employeeList;
  }

  getAllSalariesByEmployeeAndYear(idNum: string, year: string){
    this.salaryList = [];
    fetch(`${(this.API_BASE_URL)}?query=${idNum}n${year}`)
      .then(res => {
        if(res.ok){
          res.json().then(data => data.forEach((salary:SalaryDto) => this.salaryList.push(salary)));
        }else{
          alert("Failed to load employee")
        }
      }).catch(err => {
      alert("Something went wrong please try again");
    });
    console.log(this.salaryList)
    return this.salaryList;
  }

  updateEmployeeStatus(employee:EmployeeResDto){
    fetch(`${(this.API_BASE_URL)}/status/${employee.id}`, {
      method : "UPDATE",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(employee)
    })
      .then(res => {
        if(res.status === 204) {
          this.employeeList = this.getAllEmployees();
          alert("Employee status updated successfully")
        } else {
          alert("Failed to update employee status")
        }
      }).catch(err => {
      alert("Something went wrong please try again");
    });
  }
  ///employees/status/6

  payEmployee(salary: SalaryDto) {
    fetch(`${this.API_BASE_URL}/payment`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(salary)
    }).then(res => {
      if(res.ok){
        res.json().then(salary => {
          alert("Salary paid added successfully")
        })
      } else {
        alert("Failed to pay salary");
      }

    }).catch(err => {
      alert("Something went wrong. Try again later");
    })
  }

  ///login
  loginAdminUser(login: LoginDto) {
    fetch(`${this.API_BASE_URL}/login`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(login)
    }).then(res => {
      if(res.ok){
        res.json().then(login => {
          alert("Admin user logged in successfully")
        })
      } else {
        alert("Failed to login");
      }
    }).catch(err => {
      alert("Something went wrong. Try again later");
    })
  }

}
