import { View, Text } from "@tarojs/components";
import UnitList from "./UnitList";
import { UnitData } from "./personalCenter";
import "./menuList.scss";

const MenuList = (props: { list: UnitData[] }) => {
  const menuList = props.list;
  return (
    <View className="menu-list">
      {menuList.map((item) => {
        return (
          <UnitList
            content={item.content}
            icon={item.icon}
            path={item.path}
          ></UnitList>
        );
      })}
    </View>
  );
};

export default MenuList;
