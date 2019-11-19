## Easy Toggles Backend

GraphQL API that can manage toggles with complicated rules and its dependencies.

The purpose of this project is to provide a GraphQL interface to store, configure and resolve dependencies to any toggle.

## Concepts

This project uses concepts to better identify and name patterns. 

### Toggle

Toggle represents a feature or a pathway that resides inside any program. A toggle is represented by a name and 
resides inside a workspace. 
With easy-toggles it is possible to create dependencies between toggles so a toggle will only be evaluated if its dependencies are enabled. 
Besides dependencies, its possible to assign a list of criterias for a toggle to be enabled that are named assertions.

### Assertion

It's one of the criterias required for a toggle to be enabled. E.g It's possible to create a toggle with a "Contains" assertion which can delimit if a toggle is enabled when certain value or data structure contains the searched value.

The purpose of this is to provide a flexible interface so the client can work with complex toggle rules.

**The server only stores the given assertions, which are evaluated in the client**

### Workspace

Its a group of toggles.

## Contributing

### Running locally

```sh
$ npm install

$ npm run start:dev
```

### Running tests

```sh
$ npm test
```

## Techstack

- GraphQL
- Typescript