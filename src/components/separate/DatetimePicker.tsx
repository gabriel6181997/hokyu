import React from "react";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ja from 'date-fns/locale/ja'
import { useState } from "react";


export const DatetimePicker = () => {
  const [selectedDate, handleDateChange] = useState(
    new Date("2018-01-01T00:00:00.000Z")
  );

  // const [datetime, setDatetime] = useState(new Date());

  // const inputDatetime: InputHTMLAttributes<HTMLInputElement>["onChange"] = (
  //   e
  // ) => {
  //   setDatetime(Number(e.target.value));
  // };

  //   const formatDatetime = (numberValue: number) => {
  //   const stringValue = numberValue.toString();
  //   if (stringValue.length < 12) {
  //     return;
  //   }
  //   const year = stringValue.slice(0, 4);
  //   const month = stringValue.slice(4, 6);
  //   const date = stringValue.slice(6, 8);
  //   const hour = stringValue.slice(8, 10);
  //   const minute = stringValue.slice(10, 12);
  //   const value = `${year}-${month}-${date} ${hour}:${minute}`;
  //   const formatedDatetime = format(new Date(value), "yyyy年M月d日 HH:mm");
  //   return formatedDatetime;
  // };

  return (
    <div>
        <MuiPickersUtilsProvider  locale={ja} utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            variant="inline"
            ampm={false}
            value={selectedDate}
            onChange={handleDateChange}
            onError={console.log}
            disablePast
            format="yyyy/MM/dd HH:mm"
          />
        </MuiPickersUtilsProvider>
    </div>
  );
};
