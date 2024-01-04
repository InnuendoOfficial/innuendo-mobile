import React from "react";
import { Heading, Text } from "native-base";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import moment from "moment"
import { APIEndoscore } from "../api/endoscore";

function EndoscoreCircularProgress({ endoscore } : { endoscore: APIEndoscore }) {
  return (
    <AnimatedCircularProgress
      size={200}
      width={20}
      fill={endoscore.score * 10}
      tintColor="#00ff00"
      tintColorSecondary="#ff0000"
      backgroundColor="#D9D9D9"
      arcSweepAngle={240}
      rotation={240}
      lineCap="round"
    >
      {(fill) => (
        <>
          <Heading bold fontSize={40}>
            {Math.round(endoscore.score)}
          </Heading>
          <Text fontSize="sm" textAlign="center" color="#67647D">
            {moment(endoscore.created_at).format("Do MMMM")}
            {"\n"}
            {moment(endoscore.created_at).startOf("day").fromNow()}
          </Text>
        </>
      )}
    </AnimatedCircularProgress>
  );
}

export default EndoscoreCircularProgress
