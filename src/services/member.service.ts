import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/Member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseUrl = 'http://localhost:3000/member';

  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<Member[]> {
    const obs = this.http.get<Member[]>(this.baseUrl);
    return obs;
  }

  createMember(member: Omit<Member, 'id'>): Observable<Member> {
    return this.http.post<Member>(this.baseUrl, member);
  }

  deleteMember(id: string): Observable<void> {
    console.log('Deleting member with ID:', id);
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateMember(member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.baseUrl}/${member.id}`, member);
  }
}
