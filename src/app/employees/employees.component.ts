import {Component, inject, Input} from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import {EmployeeDto} from "../dto/employee-dto";
import {EmployeeResDto} from "../dto/employeeRes-dto";



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {

  employeeList: Array<EmployeeResDto>;

  constructor(private service:EmployeeService) {
    // this.employeeList;
    this.employeeList = service.getAllEmployees();
  }

  @Input()
  employee?:EmployeeDto;

  onEmployeeDelete(emp:EmployeeResDto){
    console.log(emp)
    this.service.deleteEmployee(emp);
  }

  onEmployeeStatusUpdate(emp:EmployeeResDto){
    emp.activeStatus == true ? false:true;
    this.service.updateEmployeeStatus(emp);
  }



}
