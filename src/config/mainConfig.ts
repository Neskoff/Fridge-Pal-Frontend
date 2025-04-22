interface MainConfig {
  apiUrl: string;
}

export const mainConfig: MainConfig = {
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1",
};

export default mainConfig;
