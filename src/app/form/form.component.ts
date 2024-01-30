import {Component, inject} from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import {EmployeeDto} from "../dto/employee-dto";
import { NgForm } from '@angular/forms';
import {flush} from "@angular/core/testing";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  constructor(private service: EmployeeService) {

  }

  // service:EmployeeService = inject(EmployeeService);

  onSubmit (f: NgForm){
    const name = f.value.empName.trim();
    const idNum = f.value.idNumber.trim();
    const contact = f.value.phoneElm.trim();
    const address = f.value.addressElm.trim();
    // const status = f.value.activeStatus.trim() == "Active";
    const status = true;


    if(!idNum){
      // f.value.idNumber.value = "";
      // f.value.idNumber.focus();
      // f.value.idNumber.select();
      return;
    }

    if(!contact){
      // phoneElm.value = "";
      // phoneElm.focus();
      // phoneElm.select();
      return;
    }

    if(!address){
      // addressElm.value = "";
      // addressElm.focus();
      // addressElm.select();
      return;
    }

    //public  idNumber:string, public contactNumber:string, public address:string, public activeStatus:boolean

    this.service.addNewEmployee(new EmployeeDto( name,"", idNum, contact, address, status ));

    f.reset();

  }


}
