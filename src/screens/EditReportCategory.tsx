import React from "react";
import { Button, Divider, Heading, Image, Text } from "native-base";
import SymptomCategories from '../conf/SymptomCategories';
import { EditReportCategoryProps } from './types';
import SymptomsInputs from "../components/SymptomInput";
import { blankReport } from "../types";
import ScrollScreenView from "../components/ScrollScreenView";

function EditReportCategoryScreen({ route, navigation } : EditReportCategoryProps) {
  const category = SymptomCategories.find(category =>
    category.name === route.params.categoryName
  )

  if (!category) {
    return null
  }
  return (
    <ScrollScreenView>
      <Heading fontSize={30}>
        { category.name }
      </Heading>
      <Image
        width={200}
        height={200}
        source={category.image}
        alt={category.name}
      />
      <Text fontSize={18}>
        { category.inputIndicator }
      </Text>
      <Divider marginY={4}/>
      <SymptomsInputs
        report={blankReport}
        setReport={() => console.log("hey")}
        field={category.field}
        symptoms={category.symptoms}
      />
      <Button size="lg" width="100%" mt={4} onPress={() => navigation.goBack()}>
        Valider
      </Button>
    </ScrollScreenView>
  )
}

export default EditReportCategoryScreen