import MenuRow from "@/components/MenuRow";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDBFunctions } from "@/lib/DBUSE";

export default function MenuScreen() {
  const { isPending, items, error } = useDBFunctions().useFetchAll();

  const insets = useSafeAreaInsets();

  if (isPending) return <Text>Loading menu data...</Text>;
  if (error) return <Text>error</Text>;

  if (items?.length === 0) {
    return (
      <View
        style={[styles.container, { paddingTop: insets.top, paddingBottom: 6 }]}
      >
        <Text style={styles.message}>Add items to your menu...</Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { paddingTop: insets.top, paddingBottom: 6 }]}
    >
      <Text style={styles.title}>Menu Items:</Text>
      <View style={styles.line}></View>

      <FlatList
        contentContainerStyle={{
          marginTop: 10,
          paddingVertical: 6,
          flexGrow: 1,
          alignItems: "center",
          borderRadius: 6,
          backgroundColor: "#eee",
          paddingBottom: 20,
        }}
        data={items}
        renderItem={({ item: { id, label, list } }) => {
          return <MenuRow id={id} label={label} list={list} />;
        }}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  heading: {
    marginVertical: 20,
    fontSize: 18,
    fontWeight: 600,
    color: "blue",
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 600,
    color: "darkblue",
  },
  line: {
    marginTop: 12,
    borderBottomColor: "darkblue",
    borderBottomWidth: 1,
    width: "88%",
  },
  message: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 600,
  },
});
