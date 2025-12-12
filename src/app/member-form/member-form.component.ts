import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Member } from 'src/models/Member';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent {
  form: FormGroup;
  isEdit = false;
  constructor(
    formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MemberFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Member | null
  ) {
    this.form = formBuilder.group({
      id: [''],
      cin: [''],
      name: [''],
      type: [''],
      cv: [''],
      createdDate: [''],
    });

    // If dialog was opened with existing member data, prefill the form
    if (this.data) {
      this.isEdit = true;
      // If createdDate is a Date, convert to YYYY/MM/DD string, otherwise use as-is
      let createdVal: any = this.data.createdDate;
      if (createdVal && !(typeof createdVal === 'string')) {
        const d = new Date(createdVal);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        createdVal = `${yyyy}/${mm}/${dd}`;
      }
      this.form.patchValue({
        id: this.data.id,
        cin: this.data.cin,
        name: this.data.name,
        type: this.data.type,
        cv: this.data.cv,
        createdDate: createdVal,
      });
    }
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }
    // For new member set createdDate to today in YYYY/MM/DD format.
    if (!this.isEdit) {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const formatted = `${yyyy}/${mm}/${dd}`;
      this.form.get('createdDate')?.setValue(formatted);
    }
    console.log('Form Data:', this.form.value);
    // Close the dialog and return the filled member to the caller
    this.dialogRef.close(this.form.value);
  }

  onCancel() {
    console.log('Form cancelled');
    this.form.reset();
    this.dialogRef.close();
  }
}
