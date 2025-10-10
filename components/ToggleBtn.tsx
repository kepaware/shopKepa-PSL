import { Pressable, Text, StyleSheet } from "react-native";
import { SetStateAction, useState } from "react";

type Props = {
  id: number;
  cat: string;
  label: string;
  activeBtn: number;
  setActiveBtn: React.Dispatch<SetStateAction<number>>;
  setCategory: React.Dispatch<SetStateAction<string>>;
};

export default function ToggleBtn({
  id,
  cat,
  label,
  activeBtn,
  setActiveBtn,
  setCategory,
}: Props) {
  const bgColor = activeBtn === id ? "#000" : "#fff";
  const color = activeBtn === id ? "#dad9e7" : "#000";
  const brLeft = id === 1 ? 6 : 0;
  const brRight = id === 4 ? 6 : 0;

  function handlePress() {
    setCategory(cat);
    setActiveBtn(id);
  }

  return (
    <Pressable
      style={[
        styles.btn,
        {
          backgroundColor: `${bgColor}`,
          borderTopRightRadius: brRight,
          borderBottomRightRadius: brRight,
          borderTopLeftRadius: brLeft,
          borderBottomLeftRadius: brLeft,
        },
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.label, { color: `${color}` }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: 600,
  },
});
