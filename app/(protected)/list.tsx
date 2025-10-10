import ListRow from "@/components/ListRow";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDBFunctions } from "@/lib/DBUSE";
import { Text, StyleSheet, ScrollView, View } from "react-native";

export default function List() {
  const { isFetching, listItems } = useDBFunctions().useFetchListItems();

  const main = listItems!.filter((e) => e.category === "main");
  const fv = listItems!.filter((e) => e.category === "f/v");
  const pet = listItems!.filter((e) => e.category === "pet");
  const other = listItems!.filter((e) => e.category === "other");
  const isMain = main.length >= 1 ? true : false;
  const isFV = fv.length >= 1 ? true : false;
  const isPet = pet.length >= 1 ? true : false;
  const isOther = other.length >= 1 ? true : false;

  if (isFetching)
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading list data...</Text>
      </SafeAreaView>
    );

  if (listItems?.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Shopping List:</Text>
        <View style={styles.line}></View>

        <Text style={styles.message}>Select items from your menu...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Shopping List:</Text>
      <View style={styles.line}></View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {isMain && (
          <View style={{ flex: 1, marginBottom: 20 }}>
            <Text style={styles.sectionText}>Main</Text>
            <View>
              {main.map((item) => (
                <ListRow
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  list={item.list}
                />
              ))}
            </View>
          </View>
        )}

        {isFV && (
          <View style={{ flex: 1, marginBottom: 20 }}>
            <Text style={styles.sectionText}>Fruit/Veges:</Text>
            <View>
              {fv.map((item) => (
                <ListRow
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  list={item.list}
                />
              ))}
            </View>
          </View>
        )}

        {isPet && (
          <View style={{ flex: 1, marginBottom: 20 }}>
            <Text style={styles.sectionText}>Pet Items:</Text>
            <View>
              {pet.map((item) => (
                <ListRow
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  list={item.list}
                />
              ))}
            </View>
          </View>
        )}

        {isOther && (
          <View style={{ flex: 1, marginBottom: 20 }}>
            <Text style={styles.sectionText}>General:</Text>
            <View>
              {other.map((item) => (
                <ListRow
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  list={item.list}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "#e3d9ec",
    backgroundColor: "#ddd",
  },
  heading: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 600,
    color: "darkred",
  },
  message: {
    fontSize: 18,
    fontWeight: 600,
  },
  line: {
    marginTop: 12,
    marginBottom: 20,
    borderBottomColor: "darkred",
    borderBottomWidth: 1,
    width: "88%",
  },
  sectionText: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: 700,
    color: "darkblue",
  },
});
