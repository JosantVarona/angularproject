import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';

const uri = 'https://cults3d.com/graphql'; // URL de la API GraphQL

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri }), // Crea el enlace HTTP
    cache: new InMemoryCache(), // Usamos la caché de Apollo
  };
}

@NgModule({
  imports: [HttpClientModule, ApolloModule], // Asegúrate de importar los módulos necesarios
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => createApollo(httpLink),
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}