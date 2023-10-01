import { View, Text } from "@tarojs/components";
import NavCustomBar from "$/components/NavCustomBar/nav";
import "./s.scss";

export default function Search() {
  return (
    <>
      {/* nav */}
      <NavCustomBar mainTitle="Search" needBackIcon={true} />
      {/* main */}
      <View>
        <Text>Search</Text>
      </View>
    </>
  );
}
