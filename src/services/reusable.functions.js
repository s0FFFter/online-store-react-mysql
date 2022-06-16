export const handleResponse = (response) => {
  return response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      console.log(error);
      throw Error(error); // new Error ?
      // return Promise.reject(error);
    }
    return data;
  });
};
