import test from "ava";
import {
  UserPhonePhoneCountryCodeType,
  validateUser
} from "../example/schema/User";

test("it should validate regular expression", (t) => {
  t.deepEqual(
    validateUser({
      phone: {
        countryCode: UserPhonePhoneCountryCodeType.US,
        nationalNumber: "5927386513"
      },
      email: "test@a.b",
      createdAt: new Date()
    }),
    {
      error:
        "Expected value.email to match /^[a-zA-Z0-9._%+-]+@(gmail.com|hotmail.com)$/, but it didn't"
    }
  );
});

test("it should allow gmail.com domain in email field", (t) => {
  t.assert(
    validateUser({
      phone: {
        countryCode: UserPhonePhoneCountryCodeType.US,
        nationalNumber: "5927386513"
      },
      email: "test@gmail.com",
      createdAt: new Date()
    }) === null
  );
});
