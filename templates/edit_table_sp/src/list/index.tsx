import React, { useState, useEffect } from "react";
import { Button } from "antd";
import SearchTable from "@redchili/search-table";
import chiliReq from "../../../chili_req";
import getxxxList, {
  xxxRes
} from "../../../chili_req/apis/get_xxx_list";
import { getPathByName, routes } from "../../../router";

interface Props {
  history?: any;
}

export default function OperationList(props: Props) {
  const schema = {
    type: "object",
    properties: {
      xxx: {
        type: "string",
        title: "xxx"
      }
    }
  };

  const pageSize = 10;

  const [dataSource, setDataSource] = useState();
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState();

  useEffect(() => {
    chiliReq<xxxRes>(
      getxxxList({ page, limit: pageSize, ...searchKey })
    ).then(({ data }) => {
      setDataSource(data.list);
      setTotal(data.total);
    });
  }, [page, searchKey]);

  const onChange = (newPage: number, newSearchKey: any) => {
    setPage(newPage);
    setSearchKey(newSearchKey);
  };

  const pagination = {
    showQuickJumper: true,
    total,
    pageSize
  };

  const tableProps = {
    bordered: true
  };

  const onGoEdit = (item: Record<string, any>) => {
    localStorage.setItem("xxx", JSON.stringify(item));
    const { history } = props;
    history.push(getPathByName(routes.xxx));
  };

  const onGoDetail = (id: number) => {
    const { history } = props;
    history.push(`${getPathByName(routes.xxx)}?id=${id}`);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key"
    },
    {
      title: "xxx",
      dataIndex: "xxx",
      key: "xxx"
    },
    {
      title: "操作",
      key: "action",
      render: (v: string, item: any) => {
        return (
          <Button type="primary" onClick={() => onGoDetail(item.key)}>
            详情
          </Button>
        );
      }
    }
  ];

  return (
    <div className="operation_list">
      <div className="btn_box">
        <Button className="btn_add" type="primary" onClick={() => onGoEdit({})}>
          xxx
        </Button>
      </div>
      <div className="h20" />
      <SearchTable
        schema={schema}
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
        pagination={pagination}
        tableProps={tableProps}
      />
      <style jsx>{`
        .operation_list {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .btn_box {
          align-self: baseline;
        }
      `}</style>
    </div>
  );
}
