import { Inject, Injectable } from "@nestjs/common";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdParty from "supertokens-node/recipe/thirdparty";

import { ConfigInjectionToken, AuthModuleConfig } from "../config.interface";

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey
      },
      recipeList: [
        ThirdParty.init({
          signInAndUpFeature: {
            providers: [
              ThirdParty.Google({
                clientId:
                  "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                clientSecret: "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"
              }),
              ThirdParty.Github({
                clientId: "467101b197249757c71f",
                clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd"
              }),
              ThirdParty.Apple({
                clientId: "4398792-io.supertokens.example.service",
                clientSecret: {
                  keyId: "7M48Y4RYDL",
                  privateKey:
                    "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                  teamId: "YWQCXGJRJL"
                }
              })
            ]
          }
        }),
        Session.init({
          override: {
            functions: (originalImplementation) => {
              return {
                ...originalImplementation,
                createNewSession: async function(input) {
                  const userId = input.userId;

                  let role = "DEFAULT";
                  const userInfo = await ThirdParty.getUserById(userId);
                  if (userInfo.email == "pvkvetkin@gmail.com") {
                    role = "AUTHOR";
                  }

                  const axios = require("axios").default;
                  axios
                    .get('https://web-sem6.herokuapp.com/users/' + userId)
                    // .get("http://localhost:12345/users/" + userId)
                    .then(function(response) {
                      role = response.data.role;
                    })
                    .catch(async function(error) {
                      const userInfo = await ThirdParty.getUserById(userId);
                      const email = userInfo.email;
                      axios
                        .post('https://web-sem6.herokuapp.com/users/create', {
                        // .post("http://localhost:12345/users/create", {
                          username: userId,
                          email: email,
                          role: role
                        })
                        .then(function(response) {
                        })
                        .catch(function(error) {
                        });
                    })
                    .then(function() {
                      // always executed
                    });

                  input.accessTokenPayload = {
                    ...input.accessTokenPayload,
                    role
                  };

                  return originalImplementation.createNewSession(input);
                }
              };
            }
          }
        })
      ]
    });
  }
}
