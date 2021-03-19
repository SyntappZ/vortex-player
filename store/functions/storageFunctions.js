import AsyncStorage from "@react-native-community/async-storage";
const zero = (num) => (num.toString().length === 1 ? `0${num}` : num);

const storeData = async (storageKey, value) => {
  try {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    // saving error
  }
};

const fetchData = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
  }
};

const removeArrayFromStorage = async (storageKey) => {
  try {
    await AsyncStorage.removeItem(storageKey);
  } catch (e) {
    // remove error
  }
};

const currentTime = () => {
  const d = new Date();
  const hours = d.getHours();
  const minutes = zero(d.getMinutes());
  const time = `${hours}:${minutes}`;
  return time;
};

const dateFormat = () => {
  const d = new Date();
  const day = zero(d.getDate());
  const month = zero(d.getMonth() + 1);
  const year = d.getFullYear().toString().slice(2);
  const date = `${day}/${month}/${year}`;
  return date;
};

export {
  storeData,
  fetchData,
  removeArrayFromStorage,
  dateFormat,
  currentTime,
};
