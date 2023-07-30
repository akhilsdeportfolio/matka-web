import React, { useEffect, useState } from "react";
import { useGetAllTransactionsMutation } from "../../features/api/apiSlice";
import { DotLoading, List, NavBar, SpinLoading } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import TransactionListItem from "./TransactionListItem";
import { data } from "autoprefixer";
import { useTranslation } from "react-i18next";

export default function TransactionsList() {
  const [callApi, { isLoading, ...rest }] = useGetAllTransactionsMutation();
  const {t}=useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    callApi().then((resp) => {      
      setData(resp.data.data);
    });
  }, []);

  return (
    <div>
      <NavBar
        className="bg-emerald-500 text-white"
        onBack={() => {
          navigate(-1);
        }}
      >
        {t('transactions')}
      </NavBar>
      {isLoading && <SpinLoading color="primary" className="text-center w-auto m-1/2" />}
      <div className="p-2 overflow-auto text-center" style={{maxHeight:'95vh',minHeight:'90vh'}}>        
        <List mode="card">
          {data?.length > 0 &&
            data?.map((el, index) => (
              <TransactionListItem key={index} {...el} />
            ))}
        </List>
      </div>
    </div>
  );
}
