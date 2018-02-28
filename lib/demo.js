"use strict";
exports.__esModule = true;
var monet_1 = require("monet");
function demo(p) {
    return monet_1.Maybe.fromNull(p);
}
var res = demo("demo")
    .map(function (cad) { return "cad " + cad; })
    .flatMap(function (_) { return monet_1.Maybe.None(); })
    .orSome("None");
var validateName = function (u) {
    return (u.name === "") ?
        monet_1.Validation.fail(["name should not be empty"])
        : monet_1.Validation.success(u);
};
var validateAt = function (u) {
    return (u.name === "@") ?
        monet_1.Validation.fail(["name should not be @"])
        : monet_1.Validation.success(u);
};
var val = function (u) {
    return function (age) {
        return (age < 0) ? monet_1.Validation.fail(["age < 0"]) : monet_1.Validation.success(u);
    };
};
var validateAge = function (u) {
    return u.age.toValidation()
        .failMap(function (_) { return ["Age not set"]; })
        .flatMap(val(u));
};
var validateUser = function (u) {
    return validateName(u)
        .ap(validateAt(u).acc())
        .ap(validateAge(u).acc());
};
var us = { name: "demo", age: monet_1.Maybe.Just(-19) };
var vali = validateUser(us);
console.log(vali.isSuccess());
