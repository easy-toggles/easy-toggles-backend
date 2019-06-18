import {
  equals,
  curry,
  mapObjIndexed,
  where,
  either,
  contains,
  isNil,
  any,
  map,
  reduce,
  toPairs,
  pathOr,
  Pred
} from 'ramda'

function reduceObjIndexed<T>(fn: ReduceObjIndexedFunction<T>, initialValue: T, obj: { [key: string]: any }) {
  return reduce(
    (acc: any, itemPairs: Array<any>) => {
      const key = itemPairs[0]
      const value = itemPairs[1]
      return fn(acc, value, key)
    },
    initialValue,
    toPairs(obj)
  )
}

interface ReduceObjIndexedFunction<T> {
  (acc: T, value: any, key: string): T
}

const anyValueIsTrue = (values: boolean[]): boolean => any(equals(true), values)

const isValidEntry = (value: any, rule: string[] | RuleCallback): Pred => {
  const clause = typeof rule === 'function' ? () => rule(value) : contains(value)
  return either(isNil, clause)
}

const createWhereClause = (params: Params, rule: Rule): { [key: string]: Pred } =>
  mapObjIndexed((value: any, key: string) => {
    return isValidEntry(value, rule[key])
  }, params)

const validateFeatureRule = curry((params: Params, rule: Rule) => {
  const whereClause = createWhereClause(params, rule)
  return where(whereClause, rule)
})

const validateDependencies = curry(
  (features: Features, config: Config): Features =>
    reduceObjIndexed(
      (acc: Features, config: ConfigEntry, key: string) => {
        let value
        if (config.dependsOn) {
          const isFeatureOff = (feature: string) => where({ [feature]: equals(false) }, features)
          value = !any(isFeatureOff, config.dependsOn)
        } else {
          value = features[key]
        }
        return { ...acc, [key]: value }
      },
      {},
      config
    )
)

const getFeaturesToTurnOff = curry(
  (features: Features, config: Config): Features =>
    reduceObjIndexed(
      (acc: Features, value: ConfigEntry, key: string) => {
        if (features[key] && value.turnsOff) {
          return {
            ...acc,
            ...reduce(
              (acc: Features, featureToTurnOff: string) => ({ ...acc, [featureToTurnOff]: false }),
              {},
              value.turnsOff
            )
          }
        }
        return acc
      },
      {},
      config
    )
)

const validateFeatures = curry(
  (params: Params, config: Config): Features =>
    reduceObjIndexed(
      (features: Features, feature: ConfigEntry, key: string) => {
        let value: boolean

        if (feature.enabled === false) {
          value = false
        } else if (isNil(feature.rules)) {
          value = pathOr(true, ['enabled'], feature)
        } else {
          const values = map((rule: Rule) => validateFeatureRule(params, rule))(feature.rules)
          value = anyValueIsTrue(values)
        }
        return { ...features, [key]: value }
      },
      {},
      config
    )
)

const parser = curry(
  (config: Config, params: Params): Features => {
    const features = validateFeatures(params, config)
    const updatedFeatures = {
      ...features,
      ...getFeaturesToTurnOff(features, config)
    }
    return validateDependencies(updatedFeatures, config)
  }
)

interface Params {
  [key: string]: any
}

interface Config {
  [key: string]: ConfigEntry
}
interface ConfigEntry {
  enabled?: boolean
  rules?: Rule[]
  turnsOff?: string[]
  dependsOn?: string[]
}

type RuleCallback = (value: any) => boolean
interface Rule {
  [key: string]: string[] | RuleCallback
}

interface Features {
  [key: string]: boolean
}

export { parser }
