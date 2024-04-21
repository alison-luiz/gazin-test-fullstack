import { Button, Flex, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";

export default function LevelForm({ buttonLabel, onSubmit, initialValues }) {
  const form = useForm();

  useEffect(() => {
    form.setValues(initialValues);
  }, [initialValues]);

  const handleSubmit = (values) => {
    const { id, developers, ...formData } = values;
    onSubmit(formData);
  };

  return (
    <Flex w={"50%"} justify={"center"}>
      <form style={{ width: "100%" }} onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          placeholder="Qual o nome do nível?"
          label="Nome do Nível"
          {...form.getInputProps("nivel")}
        />
        <Group position="center" mt="md">
          <Button type="submit">{buttonLabel}</Button>
        </Group>
      </form>
    </Flex>
  );
}
