import { Component } from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import {NgForm} from "@angular/forms";
import {EmployeeDto} from "../dto/employee-dto";
import {LoginDto} from "../dto/login-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-banner',
  template: `
    <section id="banner" class="bg-gray-900 dark:bg-white py-4 overflow-y-scroll overflow-hidden h-[calc(60vh)]">
      <div class="py-2 px-4 mx-auto max-w-screen-xl text-center lg:py-8">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-gray-900">Please log-in to view employee details</h1>
        <p class="mb-8 text-lg font-normal text-gray-400 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-500">Enter your username and password</p>
      </div>

      <div class="py-8 px-4 mx-auto max-w-screen-sm text-center lg:py-12">
        <form (ngSubmit)="onSubmit(frmNgForm)" #frmNgForm="ngForm" class="space-y-4" action="#">
          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-white dark:text-gray-900">Username</label>
            <input #username ngModel pattern="^[A-Za-z ]{2,}$" type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required>
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-white dark:text-gray-900">Password</label>
            <input #password ngModel pattern="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{4,}$" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
          </div>
          <div class="flex justify-between">

            <a href="https://www.hirdaramani.com/contact/" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password? Contact Us</a>
          </div>
          <button  [disabled]="frmNgForm.invalid" type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 active:ring-4 active:outline-none active:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login as Administrator</button>
        </form>
      </div>
      <div class="py-8 px-4 mx-auto max-w-screen-sm text-center lg:py-12 hidden" role="status">
        <svg aria-hidden="true" class="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </section>
  `,
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

  constructor(private service:EmployeeService, private router:Router) {

  }

  onSubmit (f: NgForm){
    console.log(f.value)
    const username = f.value.username.trim();
    const password = f.value.password.trim();

    if(!username){

      return;
    }

    if(!password){

      return;
    }

    this.service.loginAdminUser(new LoginDto( username, password ));
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("password", password);
    f.reset();

  }

}
