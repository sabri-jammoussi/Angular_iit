import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/Member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}
  getAllMembers(): Observable<Member[]> {
    var x = this.http.get<Member[]>('http://localhost:3000/member');
    console.log('ddddddd', x);
    return x;
  }

  // constructor() { }
}
