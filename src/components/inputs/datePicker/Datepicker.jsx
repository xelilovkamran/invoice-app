import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import PropTypes from "prop-types";
import "./datePicker.css";

const dateFormat = "DD MMM YYYY";
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

function Datepicker({ onChange: setFormData, value }) {
  const customFormat = (value) => `${value.format(dateFormat)}`;
  return (
    <Space className="flex-1">
      <DatePicker
        className="w-full px-5 py-3 text-base font-bold leading-4 border-[#DFE3FA] rounded-md"
        allowClear={false}
        format={customFormat}
        value={value}
        onChange={(value) => {
          setFormData((prev) => ({
            ...prev,
            paymentDue: value ? dayjs(value).format("YYYY-MM-DD") : "",
          }));
        }}
      />
    </Space>
  );
}

Datepicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
};

export default Datepicker;
