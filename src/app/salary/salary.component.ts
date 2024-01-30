import {Component, Input} from '@angular/core';
import {EmployeeDto} from "../dto/employee-dto";
import {EmployeeService} from "../service/employee.service";
import {SalaryDto} from "../dto/salary-dto";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.scss'
})
export class SalaryComponent {

  salaryList: Array<SalaryDto> = [];

  constructor(private service:EmployeeService) {
    // this.employeeList;
    // this.salaryList = service.getAllSalariesByEmployeeAndYear();
  }

  @Input()
  employee?:EmployeeDto;

  onSubmit (f: NgForm){
    console.log(f.value)
    const idNum = f.value.idNumber.trim();
    const year = f.value.year.trim();

    if(!idNum){
      return;
    }

    if(!year){
      return;
    }

    //public  idNumber:string, public contactNumber:string, public address:string, public activeStatus:boolean

    this.salaryList = this.service.getAllSalariesByEmployeeAndYear(idNum, year);

    f.reset();

  }

  onSubmit2 (f: NgForm){
    console.log(f.value)
    const payYear = f.value.year.trim();
    const month = f.value.month.trim();
    const payment = f.value.payment.trim();
    const empNumber = f.value.empNumber.trim();

    if(!payYear){
      return;
    }

    if(!month){
      return;
    }

    if(!payment){
      return;
    }

    if(!empNumber){
      return;
    }

    this.service.payEmployee(new SalaryDto(  payYear, month, payment, empNumber ));

    f.reset();

  }

}
