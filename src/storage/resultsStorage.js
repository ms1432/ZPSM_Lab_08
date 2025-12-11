import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "daswawd";

export const getResults = async () => {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    return [];
  }
};

export const addResult = async (result) => {
  try {
    const results = await getResults(); 
    const updated = [...results, result]; 
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  } catch (e) {
    console.log("Błąd zapisu wyniku:", e);
  }
};
