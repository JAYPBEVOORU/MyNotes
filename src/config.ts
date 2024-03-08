import config from "config";

interface Config {
  secrets: {
    jwt_key: string;
  };
  app: {
    port: number;
  };
}

const appConfig: Config = {
  secrets: config.get("secrets"),
  app: config.get("app"),
};

export default appConfig;
