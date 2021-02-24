const fetcher = (...args) => {
  const [url, payload = {}] = args;

  const defaultMeta = {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, { ...defaultMeta, ...payload }).then((res) => {
    if (res.status >= 400) throw new Error(res.json());

    return res.json();
  });
};

export default fetcher;
