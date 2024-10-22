import React, { useState, useEffect } from "react";
import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import { TextBox, NumberBox, TextArea } from "../../../components/textbox";
import { AutoComplate, SelectBox } from "../../../components/selectbox";
import { FaGenderless } from "react-icons/fa";
import { FileUpload, FileTypes } from "../../../components/fileupload";
import Form from "../../../components/form";
import { useDispatch } from "react-redux";
import { setPageHeader } from "../../../store/root/rootSlice";
import { DateTimePicker } from "../../../components/timepicker";
import {
  RadioGroup,
  SwitchGroup,
  CheckboxGroup,
} from "../../../components/selectioncontrol";

const MyForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageHeader("Form"));
  }, []);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    alert(JSON.stringify(values, null, 2));
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box bg={bgColor} color={textColor} p={4}>
      <Form onSubmit={handleSubmit} buttonPosition="left">
        <TextBox
          label="İsim"
          name="name"
          placeholder="İsminizi girin"
          isRequired={true}
          maxLength={20}
          helpText="Tam isminiz"
          showCharacterCount={true}
          leftAddon="#"
          defaultValue="onur"
        />
        <TextBox
          label="E-posta"
          name="email"
          placeholder="E-posta adresinizi girin"
          type="email"
          isRequired={true}
          helpText="E-posta adresiniz"
          rightAddon="@example.com"
          initialValue="onur"
        />
        <TextArea
          label="Açıklama"
          name="description"
          placeholder="Açıklamanızı girin"
          isRequired={true}
          maxLength={100}
          helpText="Açıklamanız"
          showCharacterCount={true}
        />
        <NumberBox
          label="Yaş"
          name="age"
          placeholder="Yaşınızı girin"
          isRequired={true}
          min={0}
          max={120}
          precision={2}
          step={0.2}
          helpText="Yaşınız"
        />
        <AutoComplate
          label="Cinsiyet"
          name="gender"
          placeholder="Cinsiyetinizi seçin"
          options={[
            { value: "male", label: "Erkek" },
            { value: "female", label: "Kadın" },
            { value: "other", label: "Diğer" },
          ]}
          isMulti={true}
          isSearchable={true}
          helpText="Cinsiyetiniz"
          isRequired={true}
        />
        <AutoComplate
          label="Ülke"
          name="country"
          placeholder="Ülkenizi seçin"
          options={[
            { value: "tr", label: "Türkiye" },
            { value: "us", label: "ABD" },
            { value: "de", label: "Almanya" },
          ]}
          isMulti={false}
          isSearchable={true}
          helpText="Ülkeniz"
        />
        <FileUpload
          label="Dosya Yükle"
          name="file"
          acceptedFileTypes={FileTypes.IMAGE}
          maxFileSize={2}
          isRequired={true}
          valueType="base64"
          helpText="Yüklemek istediğiniz dosyayı seçin."
        />
        <DateTimePicker
          label="Doğum Tarihi"
          name="birthDate"
          placeholder="Doğum tarihinizi seçin"
          isRequired={true}
          helpText="Doğum tarihiniz"
          leftAddon={"#"}
          setTodayAsDefault={true}
          includeTime={false}
        />
        <SelectBox
          label="Şehir"
          name="city"
          placeholder="Şehrinizi seçin"
          options={[
            { value: "ist", label: "İstanbul" },
            { value: "skr", label: "Sakarya" },
            { value: "kce", label: "Kocaeli" },
          ]}
          isRequired={false}
          helpText="Şehir"
          defaultValue="ist"
        />
        <RadioGroup
          label="Evli mi?"
          name="isMarried"
          options={[
            { value: "yes", label: "Evet" },
            { value: "no", label: "Hayır" },
          ]}
          isRequired={true}
          helpText="Evli misiniz?"
          defaultValue="no"
        />
        <SwitchGroup
          label="Aktif mi?"
          name="isActive"
          helpText="Aktif misiniz?"
          defaultValue={true}
        />
        <CheckboxGroup
          label="Hobiler"
          name="hobbies"
          options={[
            { value: "football", label: "Futbol" },
            { value: "basketball", label: "Basketbol" },
            { value: "swimming", label: "Yüzme" },
          ]}
          isRequired={true}
          helpText="Hobileriniz"
          defaultValue={["football"]}
        />
      </Form>
    </Box>
  );
};

export default MyForm;
