import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getCashierList } from "../Redux/Features/userSlice";
import { Button, Table } from "flowbite-react";
import { changeStatusCashier } from "../Redux/Features/userSlice";

export default function ComListCashier() {
  const dispatch = useDispatch();

  const listCashier = useSelector((state) => state.user.cashier);
  console.log(listCashier)

  useEffect(() => {
    dispatch(getCashierList());
  }, []);
  return (
    <>
      <div className="md:-z-50 w-full">
        <Table hoverable className="">
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone Number</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span></span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body class="divide-y">
            {listCashier.data?.map((value, index) => {
              // console.log(value);
              return (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell
                    className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                    key={index}
                  >
                    {value.name}
                  </Table.Cell>
                  <Table.Cell key={index}>{value.email}</Table.Cell>
                  <Table.Cell key={index}>{value.phoneNumber}</Table.Cell>
                  <Table.Cell key={index}>
                    {value.isCashier ? "ON" : "OFF"}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() =>
                        dispatch(changeStatusCashier(value.id, value.isCashier))
                      }
                      gradientDuoTone="tealToLime"
                      outline
                    >
                      Change Status
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
