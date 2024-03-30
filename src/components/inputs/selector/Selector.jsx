import { Select } from "antd";
import PropTypes from "prop-types";
import { FaAngleDown } from "react-icons/fa6";
import "./selector.css";

const Selector = ({ onChange: setFormData, value }) => {
  return (
    <>
      <Select
        style={{
          width: "100%",
        }}
        suffixIcon={<FaAngleDown color="#7C5DFA" />}
        size="large"
        optionFilterProp="children"
        onChange={(value) => {
          setFormData((prev) => ({
            ...prev,
            paymentTerms: value,
          }));
        }}
        value={`Net ${value} ${value === 1 ? "Day" : "Days"}`}
        options={[
          {
            value: 1,
            label: "Net 1 Day",
          },
          {
            value: 7,
            label: "Net 7 Days",
          },
          {
            value: 14,
            label: "Net 14 Days",
          },
          {
            value: 30,
            label: "Net 30 Days",
          },
        ]}
      />
    </>
  );
};

Selector.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default Selector;
