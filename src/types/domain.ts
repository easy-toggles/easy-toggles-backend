interface Application {
  id: string
  name: string
  workspaces: Workspace[]
}

interface Workspace {
  id: string
  name: string
  features: Features
}

interface Features {
  [key: string]: Feature
}

interface Feature {
  enabled: boolean
  dependensOn: string[]
  turnsOff: string[]
  rules: Rule[]
}

interface Rule {
  name: string
  criteria: string[]
}