import React, { useEffect, useState } from "react";
import qs from "qs";
import DescriptionsPro from "../descriptions_pro";
import chiliReq from "../../chili_req";
import getxxxDetail from "../../chili_req/apis/get_xxx_detail";

export default function Detail() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const { search } = window.location;
    const { id } = qs.parse(search.slice(1, search.length));
    chiliReq(getxxxDetail({ id })).then((res: any) => {
      if (res.code === 0) {
        setData([
          {
            key: 0,
            label: "xxx",
            text: res.data.xxx
          },
          
        ]);
      }
    });
  }, []);

  return (
    <div className="detail content-box">
      <div className="reset-scoll">
        <DescriptionsPro title="xxx" items={data} />
      </div>
    </div>
  );
}
