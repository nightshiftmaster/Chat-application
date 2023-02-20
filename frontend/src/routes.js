const apiPath = "/api/v1";

export const routes = {
  loginPath: () => [apiPath, "login"].join("/"),
  signupPath: () => [apiPath, "signup"].join("/"),
  usersPath: () => [apiPath, "data"].join("/"),
};
