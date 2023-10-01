import { View, Text } from "@tarojs/components";
import NavCustomBar from "$/components/NavCustomBar/nav";
// import { AtSearchBar } from "taro-ui";
import "./s.scss";

export default function Search() {
  return (
    <>
      {/* nav */}
      <NavCustomBar mainTitle="Search" needBackIcon={true} />
      {/* main */}
      <View>
        {/* <AtSearchBar
            className="search-bar"
            fixed={true}
            value={this.state.searchContent}
            onChange={this.handleSearchChange}
            onConfirm={this.handleSearch}
            onActionClick={this.handleSearch}
          /> */}
        <Text>Search</Text>
      </View>
    </>
  );
}
