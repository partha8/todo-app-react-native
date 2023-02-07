import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";

import icon from "./assets/icon.png";
import SingleTodo from "./components/SingleTodo";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (!todo) return;
    setTodos([...todos, { id: Date.now().toString(), text: todo }]);
    setTodo("");
  };

  const fetchTodos = async () => {
    const data = await AsyncStorage.getItem("todos");
    if (data) setTodos(JSON.parse(data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <Text style={styles.heading}>Todo List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter a todo"
          value={todo}
          onChangeText={(text) => setTodo(text)}
          style={styles.input}
        />
        <TouchableOpacity>
          <Text onPress={handleAddTodo} style={styles.button}>
            Go
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ width: "100%", marginTop: 16 }}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SingleTodo todo={item} setTodos={setTodos} todos={todos} />
          )}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F7DAD9",
    padding: 8,
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  button: {
    padding: 13,
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 10,
  },
  input: {
    elevation: 10,
    shadowColor: "black",
    backgroundColor: "white",
    flex: 1,
    marginRight: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "700",
  },
});
