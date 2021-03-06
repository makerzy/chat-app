import { Injectable } from "@angular/core";
import { v1 as uuid } from "uuid";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User } from "../interfaces/chat.model";
import { HttpClient } from "@angular/common/http";

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
      connected: false,
      name: "Peterson Matt",
      dob: "09/13/1987",
      conversations: [],
      savedMessages: [
        {
          id: "123",
          topic: "welcome",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, ipsum. Ex nesciunt accusamus odio libero dignissimos eum dolorem esse pariatur.",
        },
        {
          id: "124",
          topic: "Greetings",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, ipsum. Ex nesciunt accusamus odio libero dignissimos eum dolorem esse pariatur.",
        },
        {
          id: "125",
          topic: "diagnosis",
          content:
            "conLorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, ipsum. Ex nesciunt accusamus odio libero dignissimos eum dolorem esse pariatur.tent",
        },
      ],
    },
    {
      type: "clinician",
      userId: `Kevin-${uuid()}`,
      registered: true,
      username: "Kevin",
      connected: false,
      name: "Jones Kevin",
      dob: "06/19/1991",
      conversations: [],
      savedMessages: [],
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
      savedMessages: [],
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
      savedMessages: [],
    },
    {
      type: "patient",
      userId: `Steve-${uuid()}`,
      registered: true,
      username: "Steve",
      connected: false,
      name: "Job Steve",
      dob: "11/28/1976",
      conversations: [],
      savedMessages: [],
    },
    {
      type: "patient",
      userId: `Samuel-${uuid()}`,
      registered: true,
      username: "Samuel",
      connected: false,
      name: "Babatunde Samuel",
      dob: "12/28/1993",
      conversations: [],
      savedMessages: [],
    },
  ];

  currentUserId: string;
  constructor(private httpClient: HttpClient) {}

  getCurrentUser() {
    return this.getUserByUserId("Joel");
  }

  getUserByUserId(id: string) {
    return this.users.find(({ userId }) => userId.startsWith(id));
  }

  addUser(user: User) {
    this.users.push(user);
  }

  getAllUsers() {
    const users = [...this.users];
    return users;
  }
}
