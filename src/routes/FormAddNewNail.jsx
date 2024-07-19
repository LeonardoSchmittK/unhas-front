import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { redirect, useNavigate } from "react-router";

function FormAddNewNail() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cadastroOk, setCadastroOk] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch("http://localhost:3000/upload/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setCadastroOk(true);
        actions.resetForm();
        console.log("File uploaded successfully:", data);
      } else {
        setCadastroOk(false);
        console.error("Error uploading file:", response.statusText);
      }
    } catch (error) {
      setCadastroOk(false);
      console.error("Error uploading file:", error);
    }

    try {
      values["image"] = selectedImage.name;
      console.log(values);
      const response = await fetch("http://localhost:3000/newNail/", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        console.log("New nail added succesfully:", data);
      } else {
        setCadastroOk(false);
        console.error("Error adding data to new nail:", response.statusText);
      }
    } catch (error) {
      setCadastroOk(false);
      console.error("Error creating new nail:", error);
    }

    actions.setSubmitting(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Preencha o campo nome"),
    description: Yup.string().required("Preencha o campo descrição"),
    color: Yup.string().required("Preencha o campo cor"),
  });

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  function goBack() {
    console.log("BACK");
    navigate("/");
  }

  return (
    <Formik
      initialValues={{ name: "", description: "", color: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="bg-slate-50 flex flex-col w-max md:w-1/4 gap-4 p-6 rounded-md m-auto mt-10">
          <div
            className="text-sm cursor-pointer hover:text-slate-400"
            onClick={() => goBack()}
          >
            Voltar
          </div>
          <header>
            <h1 className="text-2xl">Cadastre uma nova unha</h1>
          </header>
          <div className="flex flex-col w-1/2">
            <label htmlFor="name">Nome:</label>
            <Field
              type="text"
              name="name"
              placeholder=""
              className="border-2 p-2 rounded w-full mt-1 text-sm"
              onClick={() => setCadastroOk(false)}
            />
            <ErrorMessage
              name="name"
              component="div"
              className="error text-sm"
            />
          </div>
          <div>
            <label htmlFor="description">Descrição:</label>
            <Field
              as="textarea"
              name="description"
              placeholder="Descreva sua unha maravilhosa"
              className="border-2 p-2 rounded w-full mt-1"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="error text-sm"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="description">A cor da unha:</label>

            <Field type="color" name="color" className="rounded-md mt-1" />
            <ErrorMessage
              name="color"
              component="div"
              className="error text-sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="image">Foto:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className=" pl-0 p-3  "
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="pl-1 pr-1 pt-2 pb-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cadastrar
          </button>
          {cadastroOk && <h2>Unha cadastrada com sucesso!</h2>}
        </Form>
      )}
    </Formik>
  );
}

export default FormAddNewNail;
