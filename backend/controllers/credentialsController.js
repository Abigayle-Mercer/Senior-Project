import bcrypt from "bcrypt";
import credentialModel from "../models/credentialsModel.js";
//import { Credential} from "ts-models";

export function verify(username, password) {
  return (
    new Promise()
    ((resolve, reject) => {
      credentialModel
        .find({ username })
        .then((found) => {
          if (found && found.length === 1) return found[0];
          else reject("Invalid username or password");
        })
        .then((credsOnFile) => {
          if (credsOnFile)
            bcrypt.compare(
              password,
              credsOnFile.hashedPassword,
              (_, result) => {
                console.log("Verified", result, credsOnFile.username);
                if (result) resolve(credsOnFile.username);
                else reject("Invalid username or password");
              }
            );
          else reject("Invalid username or password");
        });
    })
  );
}

export function checkExists(username) {
  return (
    new Promise() <
    boolean >
    ((resolve, reject) => {
      credentialModel
        .find({ username })
        .then((found) => resolve(found && found.length > 0));
    })
  );
}

export function create(username, password) {
  return (
    new Promise()
    ((resolve, reject) => {
      if (!username || !password) {
        reject("must provide username and password");
      }
      credentialModel
        .find({ username })
        .then((found) => {
          if (found.length) reject("username exists");
        })
        .then(() =>
          bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hashedPassword) => {
              const creds = new credentialModel({
                username,
                hashedPassword,
              });
              creds.save().then((created) => {
                if (created) resolve(created);
              });
            })
        );
    })
  );
}


