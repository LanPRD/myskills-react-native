import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Platform, FlatList } from "react-native";

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState<string>("");
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState<string>("");

  function handleAddNewSkill() {
    if (newSkill.trim() === "") {
      return;
    }

    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    };

    setMySkills(prevState => [...prevState, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills(prevState => prevState.filter(skill => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGretting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGretting("Good afternoon");
    } else {
      setGretting("Good night");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Allan</Text>
      <Text style={styles.greetings}>{gretting}</Text>

      <TextInput style={styles.input} placeholder="New skill" placeholderTextColor="#555" onChangeText={setNewSkill} />

      <Button onPress={handleAddNewSkill} title="Add" />

      <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <SkillCard skill={item.name} onPress={() => handleRemoveSkill(item.id)} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121015",
    paddingHorizontal: 30,
    paddingVertical: 70
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold"
  },
  input: {
    backgroundColor: "#1F1E25",
    color: "#ffffff",
    fontSize: 18,
    padding: Platform.OS === "ios" ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  greetings: {
    color: "#ffffff"
  }
});
