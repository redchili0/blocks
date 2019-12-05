import React, { useState, useEffect } from "react";
import SearchTable from "@redchili/search-table";
import chiliReq from "../../chili_req";
import getxxxList, { xxxRes } from "../../chili_req/apis/get_xxx_list";

export default function User() {
  const schema = {
    type: "object",
    properties: {
      xxx: {
        type: "string",
        title: "xxx"
      }
    }
  };

  const columns = [
    {
      title: "xxx",
      dataIndex: "xxx",
      key: "xxx"
    }
  ];

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

  return (
    <SearchTable
      schema={schema}
      columns={columns}
      dataSource={dataSource}
      onChange={onChange}
      pagination={pagination}
      tableProps={tableProps}
    />
  );
}
