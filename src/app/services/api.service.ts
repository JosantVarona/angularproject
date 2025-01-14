import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class Cults3DService {
  constructor(private apollo: Apollo) { }

  getModels() {

    return this.apollo.query({
      query: gql`
        query {
          creations(limit: 3) { 
            name
            url
            creator {
              nick
            }
          }
        }
      `,
    });

  }
}