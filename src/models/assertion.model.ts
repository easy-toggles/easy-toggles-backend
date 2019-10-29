interface Assertion {
    value: string;
}

abstract class Expect implements Assertion {
  not: boolean;
  value: string;

  constructor(not: boolean, value: string) { 
    this.not = not; 
    this.value = value;
  }
}

class ExpectToBeEqual extends Expect {
  toBeEqualTo: string;
  
  constructor(not: boolean, value: string, toBeEqualTo: string) { 
    super(not, value)
    this.toBeEqualTo = toBeEqualTo;
  }
}

class ExpectToIncludeAllMembers implements Assertion {
  value: string;
  toIncludeAllMembers: string[];
  
  constructor(not: boolean, value: string, toIncludeAllMembers: string[]) { 
    this.value = value;
    this.toIncludeAllMembers = toIncludeAllMembers;
  }
}

export { Assertion, ExpectToBeEqual, ExpectToIncludeAllMembers}