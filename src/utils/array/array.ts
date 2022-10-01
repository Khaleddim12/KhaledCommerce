// transfer any data to array

const arrify = (data: any) => {
  if (!Array.isArray(data)) {
    data = new Array(data);
  }
  return data;
};

export {arrify};