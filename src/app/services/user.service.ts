import { Injectable } from "@angular/core";
import { v1 as uuid } from "uuid";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User } from "../interfaces/chat.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  users: User[] = [
    {
      type: "clinician",
      userId: `Matt-${uuid()}`,
      registered: true,
      username: "Matt",
      connected: true,
      name: "Peterson Matt",
      dob: "09/13/1987",
      conversations: [],
    },
    {
      type: "clinician",
      userId: `Kevin-${uuid()}`,
      registered: true,
      username: "Kevin",
      connected: true,
      name: "Jones Kevin",
      dob: "06/19/1991",
      conversations: [],
    },
    {
      type: "patient",
      userId: `Joel-${uuid()}`,
      registered: true,
      username: "Joel",
      connected: false,
      name: "Monroe Joel",
      dob: "03/04/1976",
      conversations: [],
    },
    {
      type: "patient",
      userId: `Daniel-${uuid()}`,
      registered: true,
      username: "Daniel",
      connected: true,
      name: "Lionel Daniel",
      dob: "10/15/1988",
      conversations: [],
    },
    {
      type: "patient",
      userId: `Steve-${uuid()}`,
      registered: true,
      username: "Steve",
      connected: true,
      name: "Job Steve",
      dob: "11/28/1976",
      conversations: [],
    },
    {
      type: "patient",
      userId: `Samuel-${uuid()}`,
      registered: true,
      username: "Samuel",
      connected: true,
      name: "Babatunde Samuel",
      dob: "12/28/1993",
      conversations: [],
    },
  ];

  currentUserId: string;
  constructor() {}

  // users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  // getUsersObservable(): Observable<User[]> {
  //   return this.users$;
  // }
  getCurrentUser() {
    // console.log(this.users$.value);
    // return this.users$.value;
    return this.getUserByUserId("Matt");
  }

  // updateUser(user: User[]) {
  //   return this.users$.next(user);
  // }

  getUserByUserId(id: string) {
    return this.users.find(({ userId }) => {
      const slicedId = userId.split("-")[0];
      return id === slicedId;
    });
  }

  addUser(user: User) {
    // const updatedUserData = [...this.users$.value, user];
    // this.users$.next(updatedUserData);
    this.users.push(user);
  }

  getAllUsers() {
    const users = [...this.users];
    return of(users);
  }
}
