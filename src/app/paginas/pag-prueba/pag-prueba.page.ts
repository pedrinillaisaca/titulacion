import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';


@Component({
  selector: 'app-pag-prueba',
  templateUrl: './pag-prueba.page.html',
  styleUrls: ['./pag-prueba.page.scss'],
})
export class PagPruebaPage implements OnInit {

  studentForm: FormGroup
  constructor(
    private fb: FormBuilder
  ) { }

ngOnInit() {    
    this.studentForm=this.fb.group({
      nombreEscuela:[''],
      infoStudent:this.fb.array([this.studentInfo()])
    });
}

studentInfo(){
  return this.fb.group({
    nombre:[''],
    edad:['']
  });
}

getStudentInfo(): FormArray{
  return this.studentForm.get('infoStudent') as FormArray;
}

addStudent(){
  this.getStudentInfo().push(this.studentInfo());
}

removeStudent(index){
  this.getStudentInfo().removeAt(index);
}


submit(){
  console.log(typeof(this.studentForm.getRawValue().infoStudent))
}

}
