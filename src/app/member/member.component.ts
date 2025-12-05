import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/services/member.service';

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
  ];
  constructor(private memberService: MemberService) {}

  dataSource: any[] = [];
  ngOnInit() {
    this.loadAllMembers();
  }
  loadAllMembers() {
    this.memberService.getAllMembers().subscribe((data: any) => {
      this.dataSource = data;
      console.log('Members data:', data);
    });
  }
}
