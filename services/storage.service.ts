import AsyncStorage from "@react-native-async-storage/async-storage";

/** Function to set data in the Local Storage */
export const setDataStorage = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error setting item:", error);
  }
}

/** Fetch the Data from Local Storage */
export const getDataStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error("Error fetching item:", error);
  }
};