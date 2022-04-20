import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup ;
   employeeModelObj : EmployeeModel =new EmployeeModel();  
   employeeData :any;
   showAdd !: boolean;
   showUpdate !:boolean;
   constructor(private formbuilder: FormBuilder,
   private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName :'',
      image : '',
      email :'',
      dob : '',
      country : ''
    })
    this.getAllEmployee();
  }
  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd= true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.image = this.formValue.value.image;
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.dob = this.formValue.value.dob;
    this.employeeModelObj.country = this.formValue.value.country;

    this.api.postEmploye(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully")
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
     
    
    },
    err=>{
      alert("Something Went wrong");
    });
   
  }

  getAllEmployee(){
    this.api.getEmployee( )
    .subscribe(res=>{
      this.employeeData = res;
    })
  }
  deleteemployee(row :any){
    this.api.deleteEmploye(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }
   onEdit(row:any){
     this.showAdd = false;
     this.showUpdate = true;
     this.employeeModelObj.id= row.id;
     this.formValue.controls['image'].setValue(row.image);
     this.formValue.controls['firstName'].setValue(row.firstName);
     this.formValue.controls['email'].setValue(row.email);
     this.formValue.controls['dob'].setValue(row.dob);
      this.formValue.controls['country'].setValue(row.country);

   }
   updateEmployeeDetails(){
    this.employeeModelObj.image = this.formValue.value.image;
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.dob = this.formValue.value.dob;
    this.employeeModelObj.country = this.formValue.value.country;
    

    this.api.updateEmploye(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
     
    })
   }
  }










