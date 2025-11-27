import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { CategoryPillProps } from "@/types";

const CategoryPill = ({
  categories,
  onSelectCategory,
  selectedCategory,
}: CategoryPillProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[styles.pill, !selectedCategory && styles.selectedPill]}
        onPress={() => onSelectCategory && onSelectCategory("")}
      >
        <Text
          style={[
            styles.pillText,
            !selectedCategory && styles.selectedPillText,
          ]}
        >
          All
        </Text>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.pill,
              selectedCategory === category && styles.selectedPill,
            ]}
            onPress={() => onSelectCategory && onSelectCategory(category)}
          >
            <Text>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CategoryPill;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    maxHeight: 65,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  selectedPill: {
    backgroundColor: "#5b37b7",
  },
  pillText: {
    fontSize: 14,
    color: "#666",
  },
  selectedPillText: {
    color: "#fff",
    fontWeight: "500",
  },
});
