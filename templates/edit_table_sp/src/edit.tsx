import React, { useState, useEffect } from "react";
import {
  SchemaForm,
  Submit,
  createFormActions,
  FormButtonGroup
} from "@uform/antd";
import { PageHeader } from "antd";
import { getPathByName, routes } from "../../router";

const actions = createFormActions();

interface Props {
  history?: any;
}
export default function EditOperation(props: Props) {
  const schema = {
    type: "object",
    properties: {
      xxx: {
        title: "xxx",
        type: "string",
        required: true
      },
    }
  };

  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const item = localStorage.getItem("xxx");
    if (item && item !== "{}") {
      const vals = JSON.parse(item);

      setInitialValues(vals);
    }
  }, []);

  const onSubmit = () => {};

  const onBack = () => {
    props.history.push(getPathByName(routes.xxx));
  };

  return (
    <div className="edit_operation content--box">
      <PageHeader onBack={onBack} title="xxx" subTitle="新增/编辑" />
      <div className="rest_scroll">
        <SchemaForm
          actions={actions}
          schema={schema}
          initialValues={initialValues}
          onSubmit={onSubmit}
          labelCol={6}
          wrapperCol={14}
        >
          <FormButtonGroup offset={6}>
            <Submit />
          </FormButtonGroup>
        </SchemaForm>
      </div>
    </div>
  );
}
