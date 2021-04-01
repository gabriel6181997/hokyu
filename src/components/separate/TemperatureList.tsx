import format from "date-fns/format";
import React, { InputHTMLAttributes, useState } from "react";
import { BiMinusCircle } from "react-icons/bi";
import { Input } from "src/components/shared/Input";
import { DateTimePicker,   MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { setDate } from "date-fns";

// type Props = {
//   value: number;
// }

export const TemperatureList = () => {
  const [datetime, setDatetime] = useState(new Date());
  // const [selectedDate, handleDateChange] = useState(new Date());

  const inputDatetime: InputHTMLAttributes<HTMLInputElement>["onChange"] = (
    e
  ) => {
    setDatetime(Number(e.target.value));
  };

  const onClickDelete = () => {
    alert("Delete Temperature");
  };

  const formatDatetime = (numberValue: number) => {
    const stringValue = numberValue.toString();
    if (stringValue.length < 12) {
      return;
    }
    const year = stringValue.slice(0, 4);
    const month = stringValue.slice(4, 6);
    const date = stringValue.slice(6, 8);
    const hour = stringValue.slice(8, 10);
    const minute = stringValue.slice(10, 12);
    const value = `${year}-${month}-${date} ${hour}:${minute}`;
    const formatedDatetime = format(new Date(value), "yyyy年M月d日 HH:mm");
    console.log(formatedDatetime);
    return formatedDatetime;
  };

  return (
    <ul>
      <div className="flex items-center">
        <div className="flex-1">
          <Input
            type="text"
            id="datetime"
            placeholder="例：11:15"
            onChange={inputDatetime}
            variant="underlined"
            value={datetime}
          />
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker value={selectedDate} onChange={handleDateChange} />
          </MuiPickersUtilsProvider> */}
        </div>
        <div className="flex-1 ml-2">
          <Input
            id="temperature"
            placeholder="例：37°C"
            variant="underlined"
            className="text-sm"
          />
        </div>
        <button
          className="text-gray-600 dark:text-white ml-1"
          onClick={onClickDelete}
        >
          <BiMinusCircle />
        </button>
      </div>
    </ul>
  );
};
