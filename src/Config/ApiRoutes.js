const ApiRoutes = {
  LOGIN: {
    service: "/user",
    url: "/login",
    method: "POST",
    authenticate: false,
  },
  GET_SETTINGS: {
    service: "/user",
    url: "/view",
    method: "GET",
    authenticate: true,
  },
  UPDATE_SETTINGS: {
    service: "/user",
    url: "/update",
    method: "POST",
    authenticate: true,
  },
};

export default ApiRoutes;
