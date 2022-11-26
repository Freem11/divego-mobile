import { useWindowDimensions } from "react-native";
import React, { useState } from "react";
import SignInRoute from "./signIn";
import SignUpRoute from "./signUp";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

export default function AuthenticationPage() {
  const FirstRoute = React.memo(() => <SignInRoute />);

  const SecondRoute = () => <SignUpRoute />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Sign In" },
    { key: "second", title: "Sign Up" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={{ backgroundColor: "#355D71", paddingTop: 25 }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: "#33586A" }}
          indicatorStyle={{ backgroundColor: "darkgrey", height: 1 }}
          activeColor={"darkgrey"}
          inactiveColor={"grey"}
          labelStyle={{ fontFamily: "PermanentMarker_400Regular" }}
        />
      )}
    />
  );
}
