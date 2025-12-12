import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberService } from 'src/services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MemberFormComponent } from '../member-form/member-form.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'cin',
    'name',
    'type',
    'cv',
    'createdDate',
    'actions',
  ];
  //constuctor
  constructor(
    private memberService: MemberService,
    private dialog: MatDialog
  ) {}
  //table dataSource to injeect in the template
  dataSource: any[] = [];
  // this is the ngOnInit lifecycle hook to get all members when the component is mounted
  ngOnInit() {
    this.loadAllMembers();
  }
  // this function is used to load all members from the member service
  loadAllMembers() {
    this.memberService.getAllMembers().subscribe((data: any) => {
      this.dataSource = data;
      console.log('Members data:', data);
    });
  }

  edit(element: any) {
    const dialogRef = this.dialog.open(MemberFormComponent, {
      width: '500px',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Ensure we keep the id from the original element if not present
        if (!result.id) {
          result.id = element.id;
        }
        this.memberService.updateMember(result).subscribe({
          next: (updated) => {
            console.log('Member updated:', updated);
            this.loadAllMembers();
          },
          error: (err) => {
            console.error('Failed to update member', err);
          },
        });
      }
    });
  }

  deleteMember(id: string) {
    // Open a confirmation dialog before deleting
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Member',
        message:
          'Are you sure you want to delete this member? This action cannot be undone.',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        console.log('Delete confirmed for ID:', id);
        this.memberService.deleteMember(String(id)).subscribe({
          next: () => {
            console.log('Member deleted:', id);
            this.loadAllMembers();
          },
          error: (err) => {
            console.error('Failed to delete member', err);
          },
        });
      } else {
        console.log('Delete cancelled for ID:', id);
      }
    });
  }

  add() {
    const dialogRef = this.dialog.open(MemberFormComponent, {
      width: '500px',
      data: null, // or default values
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Omit the `id` property when creating a new member (backend assigns id)
        const { id, ...payload } = result as any;
        this.memberService.createMember(payload).subscribe({
          next: (created) => {
            console.log('Member created:', created);
            this.loadAllMembers(); // refresh table
          },
          error: (err) => {
            console.error('Failed to create member', err);
          },
        });
      }
    });
  }
}
