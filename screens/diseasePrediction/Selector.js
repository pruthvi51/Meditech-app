import { symptoms } from "./data";

import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import { getDiseases } from "../../util/https";

// Options data must contain 'item' & 'id' keys

const K_OPTIONS = symptoms;

function App({ setSymptoms }) {
  const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([]);
  return (
    // <View collapsable={false} style={{}}>
    <View style={{ margin: 30, width: "90%" }}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={{ fontSize: 30, paddingBottom: 20 }}>
          Disease Predictor
        </Text>
      </View>
      {/* <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Demo</Text>
      <SelectBox
        label="Select single"
        options={K_OPTIONS}
        value={selectedTeam}
        onChange={onChange()}
        hideInputFilter={false}
      />
      <View style={{ height: 40 }} /> */}
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select symptoms</Text>
      <SelectBox
        label="Select symptoms"
        options={K_OPTIONS}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
      <Button
        title="Submit"
        onPress={() => {
          setSymptoms(selectedTeams);
          setSelectedTeams([]);
          setSelectedTeam({});
        }}
      />
    </View>
    // </View>
  );

  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], "id"));
  }

  function onChange() {
    return (val) => setSelectedTeam(val);
  }
}

export default App;
