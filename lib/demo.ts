import { IValidationAcc, Maybe, Validation } from "monet"

function demo(p: string): Maybe<string> {
  return Maybe.fromNull(p)
}

const res =
  demo("demo")
    .map((cad) => `cad ${cad}`)
    .flatMap((_) => Maybe.None())
    .orSome("None")

interface IUser {
  name: string,
  age: Maybe<number>
}

const validateName = (u: IUser): Validation<string[], IUser> =>
  (u.name === "") ?
    Validation.fail(["name should not be empty"])
    : Validation.success(u)

const validateAt = (u: IUser): Validation<string[], IUser> =>
  (u.name === "@") ?
    Validation.fail(["name should not be @"])
    : Validation.success(u)

const val =
  (u: IUser) =>
    (age): Validation<string[], IUser> =>
      (age < 0) ? Validation.fail(["age < 0"]) : Validation.success(u)

const validateAge = (u: IUser): Validation<string[], IUser> =>
  u.age.toValidation()
    .failMap((_) => ["Age not set"])
    .flatMap(val(u))

const validateUser = (u: IUser): Validation<string[], IValidationAcc> =>
  validateName(u)
    .ap(validateAt(u).acc())
    .ap(validateAge(u).acc())

const us: IUser = { name: "demo", age: Maybe.Just(19) }
const vali = validateUser(us)
console.log(vali.isSuccess())
