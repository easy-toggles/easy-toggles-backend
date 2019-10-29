import { InterfaceType, ObjectType, Field } from "type-graphql";

@InterfaceType()
abstract class IAssertionSchema {
  @Field()
  value: string;
}

@ObjectType({ implements: IAssertionSchema })
abstract class ExpectSchema implements IAssertionSchema {
  @Field()
  not: boolean;
  value: string;

  constructor(not: boolean, value: string) { 
    this.not = not; 
    this.value = value;
  }
}

@ObjectType({ implements: IAssertionSchema })
class ExpectToBeEqualSchema extends ExpectSchema {
  @Field()
  toBeEqualTo: string;
  
  constructor(not: boolean, value: string, toBeEqualTo: string) { 
    super(not, value)
    this.toBeEqualTo = toBeEqualTo;
  }
}

@ObjectType({ implements: IAssertionSchema })
class ExpectToIncludeAllMembersSchema implements IAssertionSchema {
  value: string;

  @Field(type => [String])
  toIncludeAllMembers: string[];
  
  constructor(not: boolean, value: string, toIncludeAllMembers: string[]) { 
    this.value = value;
    this.toIncludeAllMembers = toIncludeAllMembers;
  }
}

export { IAssertionSchema, ExpectToBeEqualSchema, ExpectToIncludeAllMembersSchema}