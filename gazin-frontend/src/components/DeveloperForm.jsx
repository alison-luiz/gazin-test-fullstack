import {
  Button,
  Flex,
  Text,
  Group,
  SegmentedControl,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext, useEffect, useState } from "react";
import ApplicationState from "../state/ApplicationState";
import { fetchFromApi } from "../services/apiRequests";

export default function DeveloperForm({
  buttonLabel,
  onSubmit,
  initialValues,
}) {
  const { levels, setLevels } = useContext(ApplicationState);

  useEffect(() => {
    const getLevels = async () => {
      try {
        const response = await fetchFromApi("/niveis?page=1&limit=1000");
        setLevels(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLevels();
  }, [setLevels]);

  useEffect(() => {
    if (initialValues) {
      const formattedDate = initialValues.datanascimento.split("T")[0];
      initialValues.datanascimento = formattedDate;
      initialValues.nivelId = initialValues.level.id;
      form.setValues(initialValues);
    }
  }, [initialValues]);

  const form = useForm({
    initialValues: {
      nivelId: "",
      nome: "",
      sexo: "Masculino",
      datanascimento: "",
      hobby: "",
    },
  });

  const handleSubmit = (values) => {
    const { id, level, nivel, idade, ...formData } = values;
    onSubmit(formData);
  };

  return (
    <Flex w={"50%"} justify={"center"}>
      <form style={{ width: "100%" }} onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Nível"
          placeholder="Qual o nível do desenvolvedor?"
          data={levels.map((level) => {
            return { value: level.id, label: level.nivel };
          })}
          {...form.getInputProps("nivelId")}
        />
        <TextInput
          label="Nome"
          placeholder="Nome do desenvolvedor"
          {...form.getInputProps("nome")}
        />
        <div style={{ marginBottom: "2px" }}>
          {" "}
          <label style={{ fontWeight: "600" }}>Sexo:</label>
        </div>
        <SegmentedControl
          data={[
            { label: "Masculino", value: "M" },
            { label: "Feminino", value: "F" },
          ]}
          {...form.getInputProps("sexo")}
        />
        <TextInput
          placeholder="Digite a data de nascimento (Ex: 1990-12-31)"
          label="Data de Nascimento"
          {...form.getInputProps("datanascimento")}
        />
        <TextInput
          placeholder="Qual o hobby do desenvolvedor?"
          label="Hobby"
          {...form.getInputProps("hobby")}
        />
        <Group position="center" mt="md">
          <Button type="submit">{buttonLabel}</Button>
        </Group>
      </form>
    </Flex>
  );
}
